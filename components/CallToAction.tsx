import Image from "next/image";
import Link from "next/link";

const CallToAction = () => {
    return (
        <section className="cta-section">
            <Link href="/all-community-tutors/new">
                <div className="cta-badge">Start learning your way.</div>
            </Link>

            <h2 className="text-3xl font-bold">
                Build a personalized learning tutor
            </h2>
            <p>
                Pick a name, subject, voice, & personality, and start learning
                through voice conversations that feel natural and fun.
            </p>
            <Image
                src="/images/cta.svg"
                alt="CTA Image"
                width={362}
                height={232}
            />
            <button className="btn-primary">
                <Image
                    src="/icons/plus.svg"
                    alt="Plus Icon"
                    width={12}
                    height={12}
                />
                <Link href="/all-community-tutors/new">
                    <p>Build a New Tutor</p>
                </Link>
            </button>
        </section>
    );
};

export default CallToAction;
