import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ShowToast({ toast, message }) {
  const [show, setShow] = useState(toast);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast) {
      setShow(true);
      setProgress(100);

      // Animate progress bar over 4 seconds
      const interval = setInterval(() => {
        setProgress((prev) => (prev > 0 ? prev - 1 : 0));
      }, 40); // 100 steps * 40ms = 4000ms

      // Auto-hide after 4 seconds
      const timer = setTimeout(() => setShow(false), 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer)
      };
    }
  }, [toast]);
if(!show)
    return null
  return (
    <div
      className={`toast position-fixed top-0 start-0 m-3 ${show ? "show" : "hide"}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        backgroundColor: "#1e3a8a",
        color: "white",
        minWidth: "300px",
        minHeight: "70px",   // ⬆️ Increased height
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "center",
        fontSize: "18px"
      }}
    >
      <div className="toast-body" style={{ textAlign: "left" }}>{message}</div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "6px",
          backgroundColor: "#4ade80",
          width: `${progress}%`,
          transition: "width 0.04s linear",
          marginLeft: "auto"   // shrinks right → left
        }}
      ></div>
    </div>
  );
}

export default ShowToast;
