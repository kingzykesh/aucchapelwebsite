"use client";

import GiveHero from "@/components/GiveHero";
import GivingForm from "@/components/GivingForm";
import GoogleAd from "@/components/GoogleAd";

export default function GivePage() {
  return (
    <main className="bg-white min-h-screen">
      <GiveHero />
         <GivingForm />
    </main>
  );
}
