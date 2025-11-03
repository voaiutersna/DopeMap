export default async function AboutPage() {
    return (
        <>
            <div className="bg-[#2f3131] flex flex-col items-center justify-items-center h-[calc(100vh-104px)] font-mono text-zinc-200">
                <div className="container flex flex-col justify-center items-center h-full space-y-5">
                    <div className="rounded-lg p-4">
                        <h1 className="text-3xl font-bold mb-6">About DopeMap</h1>
                        <p className="mb-4 leading-relaxed">
                            <strong>DopeMap</strong> is a Learning Roadmap platform designed to help users plan and define their own skill development paths — clearly, freely, and purposefully.
                        </p>
                        <p className="mb-4 leading-relaxed">
                            We aim to solve the limitations of static roadmap platforms such as <strong>NeetCode</strong>, which cannot be customized or shared with others.
                            DopeMap is built to be more flexible — allowing users to create, edit, and share their own roadmaps based on their personal goals,
                            whether it’s preparing for exams, pursuing a specific career, or learning new technologies.
                        </p>
                        <p className="mb-4 leading-relaxed">
                            In addition, DopeMap includes a <strong>Roadmap Search</strong> feature, enabling users to easily discover learning paths that match their interests.
                            For example, one can search for roadmaps in fields like “Data Engineer” or “Web Developer” to start learning faster and more effectively.
                        </p>
                        <p className="mb-4 leading-relaxed">
                            DopeMap also promotes an open learning community where users can share their roadmaps for others to follow or even collaborate on them together —
                            fostering a culture of collective learning within the tech community.
                        </p>
                        <p className="leading-relaxed">
                            Finally, the platform provides a <strong>Progress Tracking</strong> system, helping users visualize their learning journey and assess their growth
                            step by step throughout the process.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
