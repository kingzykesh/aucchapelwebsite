import HeroSection from "@/components/HeroSection";
import ChaplainMessage from "@/components/ChaplainMessage";
import Calendar from "@/components/Calendar";
import RecentSermon from "@/components/RecentSermon";
import Testimonials from "@/components/Testimonials";
import JoinCommunity from "@/components/JoinCommunity";

export default function Home() {
  return (
    <main>
      <HeroSection />
       <ChaplainMessage />
          <Calendar />
          <RecentSermon />
          <Testimonials />
           <JoinCommunity />
    </main>
  );
}
