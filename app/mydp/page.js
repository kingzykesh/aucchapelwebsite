import PersonalDp from "@/components/PersonalDp";

export const metadata = {
  title: "December Retreat – Anchor University Chapel",
  description:
    "Generate your personalized DP for the December Retreat: Great Redemption Power and share it with your friends and family.",
  openGraph: {
    title: "December Retreat – Anchor University Chapel",
    description:
      "Join us for a life-transforming December Retreat: Great Redemption Power. Create your personalized DP and invite others!",
    url: "https://auchapel.com/mydp",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <PersonalDp />
    </main>
  );
}
