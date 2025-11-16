import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://auchapel.com/"),

  title: {
    default: "Anchor University Chapel | BECOMING RAPTURABLE SAINTS",
    template: "%s | Anchor University Chapel",
  },

  description:
    "Welcome to the Anchor University Lagos Chapel — a Christ-centered community committed to building transformed students who celebrate endless life in Christ through worship, discipleship, service, and spiritual growth.",

  keywords: [
    "Anchor University",
    "Anchor University Lagos",
    "AUL",
    "AUL Chapel",
    "Deeper Life",
    "Deeper Life Campus Fellowship",
    "Christian students",
    "Chapel Service",
    "Spiritual growth",
    "Campus church",
    "Chapel Sermons",
    "Worship Service",
    "Bible Study",
    "Revival Hour",
    "Student Ministry",
  ],

  authors: [{ name: "Anchor University Chapel" }],
  creator: "Anchor University Chapel",
  publisher: "Anchor University Lagos",

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://auchapel.com/",
    siteName: "Anchor University Chapel",
    title: "Anchor University Chapel | BECOMING RAPTURABLE SAINTS",
    description:
      "The official chapel website of Anchor University Lagos. Join us for worship, sermons, livestreams, events, and campus ministry resources.",
    images: [
      {
        url: "/opengraph/auc-og.jpg", 
        width: 1200,
        height: 630,
        alt: "Anchor University Chapel - Lagos",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Anchor University Chapel",
    description:
      "Encounter God. Discover purpose. Grow spiritually. Welcome to the chapel of Anchor University Lagos.",
    images: ["/opengraph/auc-og.jpg"],
    creator: "@anchoruniversitylagos",
  },

  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.png",
    apple: "/favicon/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://auchapel.com/",
  },

  themeColor: "#003B99", 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <Navbar />

        {/* Page content */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>

        <Footer />

        {/* Paystack Script */}
        <script src="https://js.paystack.co/v1/inline.js"></script>

        {/* Structured Data (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Anchor University Chapel",
              url: "https://auchapel.com/",
              logo: "https://auchapel.com/favicon/favicon.png",
              sameAs: [
                "https://web.facebook.com/anchoruniversitychapel",
                "https://www.instagram.com/au_chapel/",
                "https://www.youtube.com/@aul_chapel",
                "https://x.com/",
              ],
              description:
                "The official chapel of Anchor University Lagos — a Christ-centered community raising spiritually transformed students.",
            }),
          }}
        />
      </body>
    </html>
  );
}
