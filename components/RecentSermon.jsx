"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";

// Extract YouTube ID from any standard YouTube link
function extractYouTubeId(url) {
  if (!url) return null;
  const pattern =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
}

export default function RecentSermons() {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sermons/fetch_recent.php`)
      .then((res) => res.json())
      .then((data) => setSermons(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Recent Sermons
          </h2>

          <a
            href="/sermons"
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            View All Sermons
          </a>
        </div>

        {/* SERMON GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sermons.map((sermon) => {
            const id = extractYouTubeId(sermon.youtube_url);
            const thumbnail = id
              ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
              : "/placeholder-sermon.jpg";

            return (
              <a
                key={sermon.id}
                href={`/sermons/${sermon.id}`}
                className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group"
              >
                {/* THUMBNAIL */}
                <div className="relative bg-gray-100 h-44">
                  <img
                    src={thumbnail}
                    alt={sermon.title}
                    className="object-cover w-full h-full"
                  />

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <Play size={40} className="text-white" />
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
                    {sermon.title}
                  </h3>

                  <p className="text-sm text-gray-600">{sermon.minister}</p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(sermon.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
