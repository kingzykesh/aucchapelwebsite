import HeroSection from "@/components/HeroSection";
import ChaplainMessage from "@/components/ChaplainMessage";
import Calendar from "@/components/Calendar";
import RecentSermon from "@/components/RecentSermon";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
       <ChaplainMessage />
          <Calendar />
          <RecentSermon />
          <Testimonials />
    </main>
  );
}
