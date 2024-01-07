import React, { useEffect, useState } from "react";
import Styles from "./OnlineStatus.module.css";
import toast from "react-hot-toast";

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Event listeners for online and offline events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup: Remove event listeners when component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      {isOnline === null
        ? null
        : isOnline
        ? toast.success(
            <div>
              {" "}
              You are Online <i className="fas fa-wifi"></i>
            </div>,
            { position: "bottom-right" }
          )
        : toast.error(<div> You are offline <i className="fa-solid fa-globe"></i></div>, {
            position: "bottom-right",
          })}
    </>
  );
}
