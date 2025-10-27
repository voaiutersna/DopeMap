import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#2f3131] flex flex-col items-center justify-items-center h-[calc(100vh-104px)] font-mono text-zinc-200">
      <div className="container flex flex-col justify-center items-center h-full space-y-5">
        <div className="text-center space-y-3">
          <h1 className="text-4xl">DopeMap</h1>
          <p>
            Roadmap builder for sharing and helping others succeed in learning.
          </p>
        </div>
        <div className=" px-10 py-5 border  border-[#4b4f51] rounded-2xl text-5xl">
          <div className="filter sepia">🥀 ➡️ ✨🌷✨</div>
        </div>
      </div>
    </div>
  );
}
