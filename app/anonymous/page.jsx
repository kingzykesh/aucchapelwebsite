"use client";

import { useState } from "react";

export default function AnonymousPage() {
  const API = process.env.NEXT_PUBLIC_API_BASE;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    const formData = new FormData();
    formData.append("message", message);

    try {
      const res = await fetch(`${API}/anonymous/submit.php`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("RESULT:", result);

      if (result.status === "success") {
        setStatusMsg("Your message has been submitted anonymously.");
        setMessage("");
      } else {
        setStatusMsg(result.msg || "Unable to submit message.");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="px-6 md:px-16 py-20 bg-white min-h-screen">
      <h1 className="text-3xl text-black font-bold text-center mb-3">
        Send an Anonymous Message
      </h1>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-48 border rounded-lg p-4 text-black"
            placeholder="Type your anonymous message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {statusMsg && (
            <p className="mt-4 p-3 rounded-lg text-white bg-red-500">
              {statusMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Submitting..." : "Submit Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
