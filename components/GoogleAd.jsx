"use client";

import { useEffect, useRef } from "react";

export default function GoogleAd({ slot }) {
  const adInitialized = useRef(false);

  useEffect(() => {
    // Prevent double-initialization in Strict Mode
    if (adInitialized.current) return;

    try {
      const pushAd = () => {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adInitialized.current = true;
        }
      };

      // Give the browser 200ms to calculate the container width
      const timer = setTimeout(pushAd, 200);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div style={{ width: "100%", overflow: "hidden", minHeight: "100px" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4409650443631239"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}