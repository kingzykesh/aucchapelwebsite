import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-10 lg:mt-20 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h1 className="text-2xl font-bold mb-3">
            <Link href="/">
              AU <span className="text-blue-500">Chapel</span>
            </Link>
          </h1>
          <p className="text-gray-400 text-sm leading-6">
            A place of worship, transformation, scripture, and spiritual growth.
            Anchoring the next generation in Christ.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link
                href="/about"
                className="hover:text-blue-400 duration-300 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/sermons"
                className="hover:text-blue-400 duration-300 transition-colors"
              >
                Sermons
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="hover:text-blue-400 duration-300 transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/give"
                className="hover:text-blue-400 duration-300 transition-colors"
              >
                Giving
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-3">
              <Mail size={18} />
              <Link
                href="mailto:dlcf@aul.edu.ng"
                rel="noopener noreferrer"
                className="hover:text-blue-400 duration-300 transition-colors"
              >
                dlcf@aul.edu.ng
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} />
              <Link
                href="tel:+2347012257469"
                rel="noopener noreferrer"
                className="hover:text-blue-400 duration-300 transition-colors"
              >
                +234 701 225 7469
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} />
              <Link
                href="https://maps.app.goo.gl/Nx1N6QmUAyiyziDT7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 duration-300 transition-colors"
              >
                Anchor University, Lagos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <Link
              target="_blank"
              href="https://web.facebook.com/anchoruniversitychapel"
              className="hover:text-blue-400 duration-300 transition hover:translate-y-1"
            >
              <Facebook />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/au_chapel/"
              className="hover:text-blue-400 duration-300 transition hover:translate-y-1"
            >
              <Instagram />
            </Link>
            <Link
              target="_blank"
              href="https://www.youtube.com/@aul_chapel"
              className="hover:text-blue-400 duration-300 transition hover:translate-y-1"
            >
              <Youtube />
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} AU Chapel. All rights reserved.
      </p>
    </footer>
  );
}

