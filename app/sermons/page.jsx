"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SermonsPage() {
  const API = process.env.NEXT_PUBLIC_API_BASE;

  const [sermons, setSermons] = useState([]);
  const [filtered, setFiltered] = useState([]);

 
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 9;

  
  const [showNotes, setShowNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState("");

  
  const [ministerFilter, setMinisterFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API}/sermons/fetch_all.php`)
      .then((res) => res.json())
      .then((data) => {
        setSermons(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Sermon fetch error:", err));
  }, []);

  const applyFilters = () => {
    let list = [...sermons];

    if (searchTerm.trim() !== "") {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.minister.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ministerFilter !== "All") {
      list = list.filter((s) => s.minister === ministerFilter);
    }

    if (topicFilter !== "All") {
      list = list.filter((s) => s.tag === topicFilter);
    }

    setFiltered(list);
    setCurrentPage(1); 
  };

  const clearFilters = () => {
    setSearchTerm("");
    setMinisterFilter("All");
    setTopicFilter("All");
    setFiltered(sermons);
    setCurrentPage(1);
  };

  const ministers = ["All", ...new Set(sermons.map((s) => s.minister))];
  const topics = ["All", ...new Set(sermons.map((s) => s.tag || "Other"))];

 
  const startIndex = (currentPage - 1) * PER_PAGE;
  const paginatedSermons = filtered.slice(startIndex, startIndex + PER_PAGE);

  if (!sermons.length) return <div className="p-10">Loading sermons...</div>;

  return (
    <div className="px-6 md:px-16 py-16 bg-white flex flex-col lg:flex-row gap-10">

     
      <div className="flex-1">

        <h1 className="text-3xl text-blue-700 font-bold mb-10">Sermons</h1>

       
        {filtered.length > 0 && (
          <div className="mb-16 bg-white shadow rounded-xl p-6">
            <iframe
              width="100%"
              height="420"
              className="rounded-lg"
              src={filtered[0].youtube_url}
              allowFullScreen
            ></iframe>

            <h2 className="mt-4 text-2xl font-semibold">{filtered[0].title}</h2>
            <p className="text-gray-600 mt-1">
              By <strong>{filtered[0].minister}</strong> •{" "}
              {new Date(filtered[0].date).toDateString()}
            </p>

            <div className="flex items-center gap-3 mt-5">
              <Link
                href={`/sermons/${filtered[0].id}`}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Watch
              </Link>

              <button className="px-5 py-2 bg-black text-white rounded-lg">
                Listen
              </button>

             
              <button
                className="px-5 py-2 bg-black text-white rounded-lg"
                onClick={() => {
                  setCurrentNotes(filtered[0].notes || "");
                  setShowNotes(true);
                }}
              >
                Sermon Notes
              </button>
            </div>
          </div>
        )}


        <h2 className="text-xl text-black font-bold mb-6">
          Sermon Archive ({filtered.length})
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paginatedSermons.map((s, index) =>
            index === 0 ? null : (
              <Link
                key={s.id}
                href={`/sermons/${s.id}`}
                className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-44 bg-gray-200">
                  <img
                    src={
                      s.thumbnail
                        ? s.thumbnail
                        : `https://img.youtube.com/vi/${extractYouTubeID(
                            s.youtube_url
                          )}/hqdefault.jpg`
                    }
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/default-thumbnail.jpg")}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold line-clamp-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(s.date).toDateString()}
                  </p>
                  <p className="text-blue-700 text-sm mt-1">{s.minister}</p>

                  <span className="inline-block mt-3 text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                    {s.tag || "Sermon"}
                  </span>
                </div>
              </Link>
            )
          )}
        </div>

       
        <div className="flex justify-center gap-4 mt-10">
          {currentPage > 1 && (
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          )}

          {startIndex + PER_PAGE < filtered.length && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>

     
      <div className="w-full lg:w-80 bg-white shadow-md rounded-xl p-6 h-fit">

        <h2 className="text-lg text-black font-semibold mb-5">Filter Sermons</h2>

       
        <div className="mb-4">
          <label className="text-sm text-gray-600">Search</label>
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              applyFilters();
            }}
            placeholder="Search by title or preacher..."
            className="w-full mt-1 border text-black border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

       
        <div className="mb-4">
          <label className="text-sm text-gray-600">Preacher</label>
          <select
            value={ministerFilter}
            onChange={(e) => {
              setMinisterFilter(e.target.value);
              applyFilters();
            }}
            className="w-full mt-1 border text-black border-gray-300 rounded-lg px-3 py-2"
          >
            {ministers.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

       
        <div className="mb-4">
          <label className="text-sm text-gray-600">Topic</label>
          <select
            value={topicFilter}
            onChange={(e) => {
              setTopicFilter(e.target.value);
              applyFilters();
            }}
            className="w-full mt-1 border text-black border-gray-300 rounded-lg px-3 py-2"
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="w-full bg-black hover:bg-gray-700 text-white py-2 rounded-lg mt-2"
        >
          Clear Filters
        </button>
      </div>

    
      {showNotes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-xl p-6 shadow-xl relative">

            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowNotes(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-3">Sermon Notes</h2>

            <div className="text-gray-800 whitespace-pre-line">
              {currentNotes ? currentNotes : "No sermon notes available."}
            </div>

            <button
              className="mt-6 w-full bg-black text-white py-2 rounded-lg"
              onClick={() => setShowNotes(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function extractYouTubeID(url) {
  if (!url) return "";
  try {
    return url.split("embed/")[1]?.split("?")[0] || "";
  } catch {
    return "";
  }
}
