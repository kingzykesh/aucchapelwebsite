"use client";
import { Heart, Users, Mail } from "lucide-react";

export default function JoinCommunity() {
  return (
    <section className="w-full bg-white py-20 px-6">
      {/* TITLE */}
      <div className="max-w-5xl mx-auto text-left mb-12">
        <h2 className="text-3xl text-black md:text-4xl font-bold mb-2">
          Join Our Community
        </h2>
        <p className="text-gray-600 text-lg">
          Take the next step in your spiritual journey. We’re here to support
          you every step of the way.
        </p>
      </div>

      {/* TOP 3 CARDS */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* GIVE ONLINE */}
        <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition">
          <Heart size={32} className="text-blue-600 mb-4" />
          <h3 className="text-xl text-black font-semibold mb-2">Give Online</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Support our chapel’s mission and help us serve students better.
            Your generosity makes a difference.
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Start Giving
          </a>
        </div>

        {/* JOIN A UNIT */}
        <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition">
          <Users size={32} className="text-blue-600 mb-4" />
          <h3 className="text-xl text-black font-semibold mb-2">Join a Unit</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Get connected with our various ministry units: music, ushering,
            evangelism, outreach, and more.
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Learn More
          </a>
        </div>

        {/* PRAYER REQUEST */}
        <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition">
          <Mail size={32} className="text-blue-600 mb-4" />
          <h3 className="text-xl  text-black font-semibold mb-2">Submit a Prayer Request</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Share your prayer needs with our community. We believe in the power
            of intercessory prayer.
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Submit Anonymously
          </a>
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="max-w-5xl mx-auto bg-blue-50 border border-blue-100 rounded-xl p-10 mt-16">
        <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter to stay updated with sermons, events, and
          community news.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
