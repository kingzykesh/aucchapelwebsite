"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];


function getEventCategory(title = "") {
  const t = title.toLowerCase();

  if (t.includes("bible study")) return "Bible Study";
  if (t.includes("revival")) return "Revival Hour";
  if (t.includes("worship") || t.includes("service")) return "Worship Service";
  if (t.includes("prayer")) return "Prayer Meeting";

  return "Other";
}


function getCategoryStyles(category) {
  switch (category) {
    case "Bible Study":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "Revival Hour":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "Worship Service":
      return "bg-green-100 text-green-800 border-green-300";
    case "Prayer Meeting":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
  }
}


function getEventDescription(ev) {
  const title = (ev.title || "").toLowerCase();

  if (title.includes("monday bible study")) {
    return "Join us for the Deeper Life Monday Bible Study — a weekly time of teaching, spiritual growth, and deeper understanding of the Scriptures.";
  }
  if (title.includes("thursday revival")) {
    return "A refreshing revival hour filled with worship, prayer, and spiritual renewal. Come experience God's presence in a deeper way.";
  }
  if (title.includes("sunday worship")) {
    return "Our weekly Sunday Worship Service — a time of praise, worship, the Word, and fellowship. You belong here.";
  }
  if (title.includes("student prayer")) {
    return "The monthly student prayer meeting — a moment of collective intercession for spiritual growth, revival, and divine strength.";
  }

  
  return ev.description || "No additional description provided for this event.";
}


function formatTime(time) {
  if (!time) return "";
  const [h, m] = time.split(":");
  let hour = parseInt(h, 10);
  const suffix = hour >= 12 ? "pm" : "am";
  if (hour === 0) hour = 12;
  if (hour > 12) hour -= 12;
  return `${hour}:${m} ${suffix}`;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const month = monthIndex + 1; 

 
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/events/fetch.php?year=${year}&month=${month}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []))
      .catch((err) => console.error("Error fetching events:", err));
  }, [year, month]);

 
  const daysInMonth = new Date(year, month, 0).getDate();

  
  const firstDay = new Date(year, monthIndex, 1).getDay();
  
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  
  const calendar = [];
  for (let i = 0; i < offset; i++) calendar.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendar.push(d);

 
  const goToPrevMonth = () => {
    const prev = new Date(year, monthIndex - 1, 1);
    setCurrentDate(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(year, monthIndex + 1, 1);
    setCurrentDate(next);
  };


  const filters = [
    "All",
    "Bible Study",
    "Revival Hour",
    "Worship Service",
    "Prayer Meeting",
    "Other",
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
       
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevMonth}
              className="p-2 bg-black hover:bg-red-500 rounded-full"
            >
              <ChevronLeft />
            </button>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={goToNextMonth}
              className="p-2 bg-black hover:bg-red-500 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>

          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

       
        <div className="grid grid-cols-7 bg-blue-600 text-white font-semibold rounded-t-lg text-center">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-3 text-sm md:text-base">
              {day}
            </div>
          ))}
        </div>

     
        <div className="grid grid-cols-7 border border-gray-300">
          {calendar.map((day, idx) => {
            const dayEvents =
              day === null
                ? []
                : events.filter((ev) => {
                    const eventDay = parseInt(ev.event_date?.split("-")[2], 10);
                    if (eventDay !== day) return false;

                    const category = getEventCategory(ev.title);
                    if (activeFilter === "All") return true;
                    return category === activeFilter;
                  });

            return (
              <div
                key={idx}
                className="h-36 border border-gray-200 p-2 relative align-top text-xs md:text-sm hover:bg-gray-50 transition"
              >
                {day && (
                  <div className="font-semibold text-gray-700 mb-1 text-sm">
                    {day}
                  </div>
                )}

             
                {dayEvents.map((ev, i) => {
                  const category = getEventCategory(ev.title);
                  const badgeStyle = getCategoryStyles(category);

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedEvent(ev)}
                      className={`w-full text-left mt-1 px-2 py-1 rounded border ${badgeStyle} hover:brightness-95 transition`}
                    >
                      <p className="font-semibold truncate">{ev.title}</p>
                      <p className="text-[11px]">
                        {formatTime(ev.start_time)} • {category}
                      </p>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

     
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedEvent.title}
            </h3>

            <p className="text-gray-600 text-sm mb-1">
              {new Date(selectedEvent.event_date).toLocaleDateString("en-NG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {selectedEvent.start_time && (
              <p className="text-gray-700 text-sm mb-4 font-medium">
                Time: {formatTime(selectedEvent.start_time)}
              </p>
            )}

            <p className="text-gray-700 leading-7 text-sm md:text-base">
              {getEventDescription(selectedEvent)}
            </p>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
