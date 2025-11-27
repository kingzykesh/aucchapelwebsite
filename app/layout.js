import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* -----------------------------
   SITE-WIDE SEO METADATA
----------------------------- */
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

  /* GOOGLE ADSENSE VERIFICATION */
  other: {
    "google-adsense-account": "ca-pub-4409650443631239",
  },

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
        url: "/auc-og.png",
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
    images: ["/auc-og.png"],
    creator: "@anchoruniversitylagos",
  },

  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://auchapel.com/",
  },
};

/* -----------------------------
   FIXED THEME COLOR (NEW API)
----------------------------- */
export const viewport = {
  themeColor: "#003B99",
};

/* -----------------------------
   ROOT LAYOUT
----------------------------- */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4409650443631239"
          crossOrigin="anonymous"
        ></script>

        {/* CMP (optional, we’ll add later if needed) */}
      </head>

      <body className="bg-black text-white antialiased">
        <Navbar />

        <main className="pt-20 min-h-screen">{children}</main>

        <Footer />

        {/* Paystack */}
        <script src="https://js.paystack.co/v1/inline.js"></script>

        {/* Chapel Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Anchor University Chapel",
              url: "https://auchapel.com/",
              logo: "https://auchapel.com/favicon.png",
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
