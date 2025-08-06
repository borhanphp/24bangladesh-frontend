"use client";
import { useEffect, useState } from "react";
import { MdWifiOff } from "react-icons/md"; // Material Design icon

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus(); // check on mount

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white flex items-center justify-center p-2 z-50 shadow-md">
      <MdWifiOff className="text-xl mr-2" />
      <span>আপনার ডিভাইসে ইন্টারনেট সংযোগ নেই</span>
    </div>
  );
}
