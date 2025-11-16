"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

/* -----------------------------
 Extract YT Video ID (Robust)
----------------------------- */
function extractYouTubeId(url) {
  if (!url) return null;

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

/* --------------------------------
  MAIN PAGE COMPONENT
--------------------------------- */
export default function SingleSermonPage() {
  const { id } = useParams();
  const [sermon, setSermon] = useState(null);

  // Fetch sermon
  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sermons/get.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setSermon(data))
      .catch((err) => console.error("SERMON ERROR:", err));
  }, [id]);

 if (!sermon)
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] w-full bg-white">
      <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>

      <p className="text-gray-600 mt-4 text-lg font-medium animate-pulse">
        Loading sermon...
      </p>
    </div>
  );


  const videoId = extractYouTubeId(sermon.youtube_url);

  /* ----------------------------------------------------
      JSON-LD STRUCTURED DATA (Google SERMON Schema)
  ---------------------------------------------------- */
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Sermon",
    "name": sermon.title,
    "about": sermon.tag || "Christian sermon",
    "datePublished": sermon.date,
    "author": {
      "@type": "Person",
      "name": sermon.minister,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Anchor University Chapel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aucchapel.vercel.app/logo.png"
      }
    },
    "video": videoId
      ? {
          "@type": "VideoObject",
          "name": sermon.title,
          "description": sermon.notes || sermon.title,
          "thumbnailUrl": `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          "embedUrl": `https://www.youtube.com/embed/${videoId}`,
          "uploadDate": sermon.date,
        }
      : undefined,
  };

  return (
    <>
      {/* SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* PAGE CONTENT */}
      <div className="bg-white min-h-screen py-16 px-6 text-gray-900">
        <div className="max-w-5xl mx-auto">

          {/* TITLE */}
          <h1 className="text-4xl font-bold mb-2">{sermon.title}</h1>

          {/* MINISTER + DATE */}
          <p className="text-gray-600 text-lg mb-6">
            {sermon.minister} ·{" "}
            {new Date(sermon.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          {/* VIDEO */}
          <div className="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden shadow mb-10">
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="p-6">No video available.</p>
            )}
          </div>

          {/* SERMON NOTES */}
          <h2 className="text-2xl font-semibold mb-4">Sermon Notes</h2>

          <div className="prose max-w-none leading-7 text-gray-800">
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
    </>
  );
}
