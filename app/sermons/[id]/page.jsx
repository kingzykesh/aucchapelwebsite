"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function extractYouTubeId(url) {
  if (!url) return null;

  // Support for ?v=ID, youtu.be/ID, embed/ID
  const patterns = [
    /[?&]v=([^&]+)/,                   
    /youtu\.be\/([^?&]+)/,             
    /youtube\.com\/embed\/([^?&]+)/,  
  ];

  for (let pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export default function SingleSermonPage() {
  const { id } = useParams();       // ✅ FIX HERE
  const [sermon, setSermon] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sermons/get.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setSermon(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!sermon) return <div className="p-10">Loading...</div>;

  const videoId = extractYouTubeId(sermon.youtube_url);

  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {sermon.title}
        </h1>

        {/* MINISTER + DATE */}
        <p className="text-gray-600 text-lg mb-6">
          {sermon.minister} ·{" "}
          {new Date(sermon.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        {/* YOUTUBE PLAYER */}
        <div className="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden shadow mb-10">
          {videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            ></iframe>
          ) : (
            <p className="p-6">No video available.</p>
          )}
        </div>

        {/* NOTES */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Sermon Notes
        </h2>

        <div className="prose max-w-none text-gray-800 leading-7">
          {sermon.notes ? (
            <div
              dangerouslySetInnerHTML={{
                __html: sermon.notes.replace(/\n/g, "<br/>"),
              }}
            />
          ) : (
            <p>No notes available for this sermon.</p>
          )}
        </div>

      </div>
    </div>
  );
}
