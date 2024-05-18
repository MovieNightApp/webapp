import AppTitle from "@/components/app-title";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const blobRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.onpointermove = (event) => {
      const { clientX, clientY } = event;

      if (!blobRef.current) {
        return;
      }
      blobRef.current.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[radial-gradient(circle_363px_at_49.1%_0.8%,#1e293b_0%,#0f172a_100.2%)] text-white">
      <div
        ref={blobRef}
        className="bg-[linear-gradient(to_right,aquamarine,mediumpurple)] opacity-80 h-[34vmax] aspect-square absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] z-0"
      />
      <div
        id="blur"
        className="h-screen w-screen absolute z-10 backdrop-blur-[12vmax]"
      />
      <div className="relative z-20">
        <main className="h-screen w-screen text-white flex flex-col justify-center items-center m-auto p-4 max-w-[60ch]">
          <img
            src="/logo.webp"
            width="250px"
            height="250px"
            alt="MovieNight App Logo"
          />
          <h1 className="text-5xl font-extrabold m-0 text-center flex gap-3">
            Make <AppTitle /> simple
          </h1>
          <p className="text-xl text-center m-0 mt-6">
            Unleash Your Cinema Spirit! Swipe, match, and share your way to the
            ultimate movie night with friends and family. Get ready for a
            blockbuster experience!
          </p>
          <p className="text-xl text-center m-0 mt-8">
            Coming to iOS and Android soon!
          </p>
        </main>
      </div>
      <section className="fixed bottom-0 left-0 right-0 p-8 text-center z-30">
        <a href="privacy-policy.txt">Privacy Policy</a>
      </section>
    </div>
  );
}
