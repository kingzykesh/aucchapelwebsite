import AboutHero from "@/components/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import WhatWeDo from "@/components/about/WhatWeDo";
import OurStory from "@/components/about/OurStory";
import Leadership from "@/components/about/Leadership";

export default function Home() {
  return (
    <main>
      <AboutHero />
       <MissionVision />
      <WhatWeDo />
      <OurStory />
      <Leadership />
    </main>
  );
}
