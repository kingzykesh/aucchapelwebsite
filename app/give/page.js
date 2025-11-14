"use client";

import GiveHero from "@/components/GiveHero";
import GivingForm from "@/components/GivingForm";

export default function GivePage() {
  return (
    <main className="bg-white min-h-screen">
      <GiveHero />
         <GivingForm />
    </main>
  );
}
