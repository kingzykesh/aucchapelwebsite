import { BookOpen, Users, HeartHandshake, Sparkles } from "lucide-react";

export default function WhatWeDo() {
  return (
    <section className="py-20 bg-blue-50 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
          What We Do
        </h2>
        <p className="text-gray-600 mt-3">
          Our ministries help students grow spiritually, emotionally, and academically.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">


        <div className="bg-white rounded-2xl shadow p-8 hover:shadow-lg transition">
          <BookOpen className="h-10 w-10 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Worship & Bible Study</h3>
          <p className="text-gray-600 text-sm">
            Weekly worship services and bible studies for all students.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8 hover:shadow-lg transition">
          <Users className="h-10 w-10 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Leadership & Units</h3>
          <p className="text-gray-600 text-sm">
            Student leadership opportunities and ministry units.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8 hover:shadow-lg transition">
          <HeartHandshake className="h-10 w-10 text-red-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Community Outreach</h3>
          <p className="text-gray-600 text-sm">
            Outreach projects and service initiatives within and beyond campus.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8 hover:shadow-lg transition">
          <Sparkles className="h-10 w-10 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Spiritual Care</h3>
          <p className="text-gray-600 text-sm">
            Prayer, counseling, and spiritual guidance for students.
          </p>
        </div>

      </div>
    </section>
  );
}
