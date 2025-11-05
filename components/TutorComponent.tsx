"use client";

import {
    cn,
    configureAssistant,
    getSubjectColor,
    checkCallDuration,
} from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import soundWaves from "@/constants/soundwaves.json";
import {
    addToSessionHistory,
    updateSessionDuration,
    canStartVapiCall,
} from "@/lib/actions/tutor.actions";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
    LIMIT_REACHED = "LIMIT_REACHED",
}

const TutorComponent = ({
    tutorId,
    subject,
    topic,
    name,
    userName,
    userImage,
    style,
    voice,
}: TutorComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(
        CallStatus.INACTIVE
    );
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [limitMessage, setLimitMessage] = useState<string>("");
    const [sessionHistoryId, setSessionHistoryId] = useState<string | null>(
        null
    );
    const [usageWarning, setUsageWarning] = useState<string>("");

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const callStartTimeRef = useRef<number | null>(null);
    const usageCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Check usage on component mount to show warnings
    useEffect(() => {
        const checkInitialUsage = async () => {
            try {
                const limitCheck = await canStartVapiCall();
                if (limitCheck.usage) {
                    const dailyRemaining =
                        limitCheck.usage.dailyLimit -
                        limitCheck.usage.dailyMinutes;
                    const monthlyRemaining =
                        limitCheck.usage.monthlyLimit -
                        limitCheck.usage.monthlyMinutes;

                    if (dailyRemaining <= 5 && dailyRemaining > 0) {
                        setUsageWarning(
                            `⏰ Only ${dailyRemaining} minutes remaining today`
                        );
                    } else if (monthlyRemaining <= 20 && monthlyRemaining > 0) {
                        setUsageWarning(
                            `⏰ Only ${monthlyRemaining} minutes remaining this month`
                        );
                    }
                }
            } catch (error) {
                console.error("Failed to check initial usage:", error);
            }
        };
        checkInitialUsage();
    }, []);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.stop();
            }
        }
    }, [isSpeaking, lottieRef]);

    // Monitor usage during active call and auto-disconnect if limit reached
    useEffect(() => {
        if (callStatus === CallStatus.ACTIVE) {
            // Check usage every 30 seconds during active call
            usageCheckIntervalRef.current = setInterval(async () => {
                try {
                    // Check if call duration exceeded max limit
                    if (callStartTimeRef.current) {
                        const durationCheck = checkCallDuration(
                            callStartTimeRef.current
                        );

                        if (durationCheck.shouldEnd) {
                            console.log(
                                "Max call duration reached, terminating..."
                            );
                            vapi.stop();
                            setCallStatus(CallStatus.LIMIT_REACHED);
                            setLimitMessage(
                                `Your call was automatically ended after ${durationCheck.durationMinutes} minutes (maximum call duration).`
                            );

                            if (usageCheckIntervalRef.current) {
                                clearInterval(usageCheckIntervalRef.current);
                                usageCheckIntervalRef.current = null;
                            }
                            return;
                        }
                    }

                    // Check if usage limits reached
                    const limitCheck = await canStartVapiCall();

                    if (!limitCheck.canStart) {
                        // Limit reached during call - terminate it
                        console.log(
                            "Usage limit reached during call, terminating..."
                        );

                        // Stop the VAPI call
                        vapi.stop();

                        // Update UI
                        setCallStatus(CallStatus.LIMIT_REACHED);

                        if (limitCheck.reason === "daily") {
                            setLimitMessage(
                                `Your call was ended because you reached your daily limit of ${limitCheck.usage?.dailyLimit} minutes.`
                            );
                        } else if (limitCheck.reason === "monthly") {
                            setLimitMessage(
                                `Your call was ended because you reached your monthly limit of ${limitCheck.usage?.monthlyLimit} minutes.`
                            );
                        }

                        // Clear the interval
                        if (usageCheckIntervalRef.current) {
                            clearInterval(usageCheckIntervalRef.current);
                            usageCheckIntervalRef.current = null;
                        }
                    }
                } catch (error) {
                    console.error("Failed to check usage during call:", error);
                }
            }, 30000); // Check every 30 seconds
        } else {
            // Clear interval when call is not active
            if (usageCheckIntervalRef.current) {
                clearInterval(usageCheckIntervalRef.current);
                usageCheckIntervalRef.current = null;
            }
        }

        // Cleanup on unmount
        return () => {
            if (usageCheckIntervalRef.current) {
                clearInterval(usageCheckIntervalRef.current);
            }
        };
    }, [callStatus]);

    // const handleCallStart = () => {
    //     setCallStatus(CallStatus.CONNECTING);
    // };
    useEffect(() => {
        const onCallStart = async () => {
            setCallStatus(CallStatus.ACTIVE);
            callStartTimeRef.current = Date.now();

            // Add to session history and get the ID
            try {
                const session = await addToSessionHistory(tutorId);
                if (session && session[0]?.id) {
                    setSessionHistoryId(session[0].id);
                }
            } catch (error) {
                console.error("Failed to create session history:", error);
            }
        };
        const onCallEnd = async () => {
            setCallStatus(CallStatus.FINISHED);

            // Calculate call duration and update session
            if (callStartTimeRef.current && sessionHistoryId) {
                const durationSeconds = Math.round(
                    (Date.now() - callStartTimeRef.current) / 1000
                );
                try {
                    await updateSessionDuration(
                        sessionHistoryId,
                        durationSeconds
                    );
                } catch (error) {
                    console.error("Failed to update session duration:", error);
                }
            }

            callStartTimeRef.current = null;
        };
        const onMessage = (message: Message) => {
            if (
                message.type === "transcript" &&
                message.transcriptType === "final"
            ) {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                };
                setMessages((prevMessages) => [newMessage, ...prevMessages]);
            }
        };

        const onSpeechStart = () => {
            setIsSpeaking(true);
        };
        const onSpeechEnd = () => {
            setIsSpeaking(false);
        };
        const onError = (error: Error) => {
            console.error("Call error:", error);
        };

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("error", onError);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("error", onError);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
        };
    }, [tutorId, sessionHistoryId]);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    };

    const handleCall = async () => {
        // Check usage limits before starting the call
        try {
            const limitCheck = await canStartVapiCall();

            if (!limitCheck.canStart) {
                setCallStatus(CallStatus.LIMIT_REACHED);

                if (limitCheck.reason === "daily") {
                    setLimitMessage(
                        `You've reached your daily limit of ${limitCheck.usage?.dailyLimit} minutes. Resets tomorrow!`
                    );
                } else if (limitCheck.reason === "monthly") {
                    setLimitMessage(
                        `You've reached your monthly limit of ${limitCheck.usage?.monthlyLimit} minutes. Upgrade to Pro for unlimited usage!`
                    );
                }
                return;
            }
        } catch (error) {
            console.error("Failed to check usage limits:", error);
            // Allow the call to proceed if check fails
        }

        setCallStatus(CallStatus.CONNECTING);

        const assistantOverrides = {
            variableValues: {
                subject,
                topic,
                style,
            },
            clientMessages: ["transcript"],
            serverMessages: [],
        };

        // FIXME:
        // TS error.
        // GPT thinks: VAPI type definitions are incomplete for assistantOverrides parameter
        // @ts-expect-error - This is a workaround for the TS error in VAPI SDK
        vapi.start(configureAssistant(voice, style), assistantOverrides);
    };

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };

    // TODO: Add the ability to make changes to the tutor once it is created.
    // e.g. Fix a spelling error

    return (
        <section className="flex flex-col h-[70vh]">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="tutor-section">
                    <div
                        className="tutor-avatar"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                        <div
                            className={cn(
                                "absolute transition-opacity duration-1000",
                                callStatus === CallStatus.FINISHED ||
                                    callStatus === CallStatus.INACTIVE
                                    ? "opacity-100"
                                    : "opacity-0",
                                callStatus === CallStatus.CONNECTING &&
                                    "opacity-100 animate-pulse"
                            )}
                        >
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={150}
                                height={150}
                                className="max-sm:w-fit"
                            />
                        </div>
                        <div
                            className={cn(
                                "absolute transition-opacity duration-1000",
                                callStatus === CallStatus.ACTIVE
                                    ? "opacity-100"
                                    : "opacity-0"
                            )}
                        >
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundWaves}
                                autoplay
                                className="tutor-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">{name}</p>
                </div>
                <div className="user-section">
                    <div className="user-avatar">
                        <Image
                            src={userImage}
                            alt={userName}
                            width={130}
                            height={130}
                            className="rounded-lg"
                        />
                        <p className="font-bold text-2xl">{userName}</p>
                    </div>
                    <button
                        className="btn-mic"
                        onClick={toggleMicrophone}
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        <Image
                            src={
                                isMuted
                                    ? "/icons/mic-off.svg"
                                    : "/icons/mic-on.svg"
                            }
                            alt={"Microphone"}
                            width={36}
                            height={36}
                        />
                        <p className="max-sm:hidden">
                            {isMuted ? "Unmute Microphone" : "Mute Microphone"}
                        </p>
                    </button>
                    {usageWarning && callStatus === CallStatus.INACTIVE && (
                        <div className="bg-blue-50 border border-blue-300 text-blue-800 px-4 py-2 rounded-lg text-sm mb-3">
                            {usageWarning}
                        </div>
                    )}
                    {callStatus === CallStatus.LIMIT_REACHED && (
                        <div className="bg-red-50 border-2 border-red-400 px-4 py-4 rounded-lg mb-3">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-red-800 mb-1">
                                        Usage Limit Reached
                                    </h3>
                                    <p className="text-sm text-red-700 mb-2">
                                        {limitMessage}
                                    </p>
                                    {limitMessage.includes("daily limit") && (
                                        <p className="text-xs text-red-600">
                                            💡 Your limit resets tomorrow, or{" "}
                                            <a
                                                href="/subscription"
                                                className="underline font-semibold hover:text-red-800"
                                            >
                                                upgrade to Pro
                                            </a>{" "}
                                            for unlimited usage.
                                        </p>
                                    )}
                                    {limitMessage.includes("monthly limit") && (
                                        <p className="text-xs text-red-600">
                                            💡{" "}
                                            <a
                                                href="/subscription"
                                                className="underline font-semibold hover:text-red-800"
                                            >
                                                Upgrade to Pro
                                            </a>{" "}
                                            for unlimited voice tutoring
                                            sessions.
                                        </p>
                                    )}
                                    {limitMessage.includes(
                                        "maximum call duration"
                                    ) && (
                                        <p className="text-xs text-red-600">
                                            💡 You can start a new session
                                            immediately.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        className={cn(
                            "rounded-lg py-2 cursor-pointer transition-colors w-full text-white font-medium",
                            callStatus === CallStatus.ACTIVE
                                ? "bg-red-700 hover:bg-red-800"
                                : "bg-primary hover:bg-primary/90",
                            callStatus === CallStatus.CONNECTING &&
                                "animate-pulse",
                            callStatus === CallStatus.LIMIT_REACHED &&
                                limitMessage.includes("maximum call duration")
                                ? "bg-primary hover:bg-primary/90"
                                : callStatus === CallStatus.LIMIT_REACHED
                                ? "bg-gray-400 cursor-not-allowed"
                                : ""
                        )}
                        onClick={
                            callStatus === CallStatus.ACTIVE
                                ? handleDisconnect
                                : callStatus === CallStatus.LIMIT_REACHED &&
                                  limitMessage.includes("maximum call duration")
                                ? () => {
                                      setCallStatus(CallStatus.INACTIVE);
                                      setLimitMessage("");
                                  }
                                : handleCall
                        }
                        disabled={
                            callStatus === CallStatus.LIMIT_REACHED &&
                            !limitMessage.includes("maximum call duration")
                        }
                    >
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                            ? "Connecting..."
                            : callStatus === CallStatus.LIMIT_REACHED
                            ? limitMessage.includes("maximum call duration")
                                ? "Start New Session"
                                : "Limit Reached"
                            : "Start Session"}
                    </button>
                </div>
            </section>
            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if (message.role === "assistant") {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {name.split(" ")[0].replace(/[.,]/g, "")}:{" "}
                                    {message.content}
                                </p>
                            );
                        } else {
                            return (
                                <p
                                    key={index}
                                    className=" text-primary max-sm:text-sm"
                                >
                                    {userName}: {message.content}
                                </p>
                            );
                        }
                    })}
                </div>

                <div className="transcript-fade" />
            </section>
        </section>
    );
};

export default TutorComponent;
