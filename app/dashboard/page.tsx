import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
    // Get the current user's authentication status
    const { userId } = await auth();

    // If user is not authenticated, redirect to sign-in
    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <UserButton />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-green-600">
                        ✅ Authentication Successful!
                    </h2>
                    <p className="text-gray-700 mb-4">
                        You are now signed in and can access protected content.
                        This page is only accessible to authenticated users.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <p className="text-blue-700">
                            <strong>User ID:</strong> {userId}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-3">
                            Your Tutors
                        </h3>
                        <p className="text-gray-600">
                            Access your personalized AI tutors and learning
                            materials.
                        </p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            View Tutors
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-3">
                            Learning Progress
                        </h3>
                        <p className="text-gray-600">
                            Track your learning journey and achievements.
                        </p>
                        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            View Progress
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
