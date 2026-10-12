import React from "react";
import { useUser } from "@clerk/react";

const WelcomeHeader: React.FC = () => {
  const { user } = useUser();
  const name = user?.firstName ?? "there";
  return (
    <section className="relative overflow-hidden rounded-[28px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-10 -top-16 h-48 w-48 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-0 h-40 w-40 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative z-10">
        <p className="mb-2 text-sm font-medium tracking-wide text-[#8d7162] animate-fade-up">
          YOUR PERSONAL SPACE
        </p>

        <h1 className="font-serif text-4xl font-semibold leading-tight text-[#3a241c] sm:text-5xl lg:text-6xl animate-fade-up animation-delay-100">
          Good evening, {name}{" "}
          <span className="inline-block animate-wave">👋</span>
        </h1>

        <p className="mt-2 text-base text-[#604c42] sm:text-lg animate-fade-up animation-delay-200">
          How was your day?
        </p>
      </div>
    </section>
  );
};

export default WelcomeHeader;