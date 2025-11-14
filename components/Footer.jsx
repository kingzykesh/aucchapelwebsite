import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-20 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

       
        <div>
          <h1 className="text-2xl font-bold mb-3">
            AUC <span className="text-blue-500">Chapel</span>
          </h1>
          <p className="text-gray-400 text-sm leading-6">
            A place of worship, transformation, scripture, and spiritual growth.  
            Anchoring the next generation in Christ.
          </p>
        </div>

        
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link href="/sermons" className="hover:text-blue-400">Sermons</Link></li>
            <li><Link href="/events" className="hover:text-blue-400">Events</Link></li>
            <li><Link href="/giving" className="hover:text-blue-400">Giving</Link></li>
          </ul>
        </div>

    
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-3">
              <Mail size={18} /> chapel@auniversity.edu
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} /> +234 810 000 0000
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} /> Anchor University, Lagos
            </li>
          </ul>
        </div>


        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-400"><Facebook /></Link>
            <Link href="#" className="hover:text-blue-400"><Instagram /></Link>
            <Link href="#" className="hover:text-blue-400"><Youtube /></Link>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} AUC Chapel. All rights reserved.
      </p>
    </footer>
  );
}
