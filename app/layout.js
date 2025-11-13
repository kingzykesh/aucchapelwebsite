import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "AUC Chapel",
  description: "Official Chapel Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <div className="pt-20">  {/* push content below navbar */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
