import React, { useState, useEffect } from "react";
import { CalendarGrid } from "@/components/CalendarGrid";
import { Snow } from "@/components/Snow";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { CountdownScreen } from "@/components/CountdownScreen";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  shouldShowCountdown,
  getCountdownBlurClass,
} from "@/lib/countdown-config";

const Index = () => {
  const [snowEnabled, setSnowEnabled] = useState(true);
  const [showCountdown, setShowCountdown] = useState(shouldShowCountdown);
  const [showWelcome, setShowWelcome] = useState(() => {
    if (showCountdown) return false;
    const hasVisited = localStorage.getItem("has-visited");
    return hasVisited !== "true";
  });

  useEffect(() => {
    const savedSnow = localStorage.getItem("snow-enabled");
    if (savedSnow !== null) setSnowEnabled(savedSnow === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("snow-enabled", String(snowEnabled));
  }, [snowEnabled]);

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    const hasVisited = localStorage.getItem("has-visited");
    if (hasVisited !== "true") {
      setShowWelcome(true);
    }
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    localStorage.setItem("has-visited", "true");
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Snow enabled={snowEnabled} count={150} />

      {showCountdown && (
        <CountdownScreen onComplete={handleCountdownComplete} />
      )}
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}

      <div
        className={`flex flex-col min-h-screen transition-all duration-1000 ${getCountdownBlurClass()}`}
      >
        <Header />

        <main className="flex-1 gradient-romantic px-2 sm:px-4 py-6 flex items-center justify-center overflow-hidden">
          <CalendarGrid />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
