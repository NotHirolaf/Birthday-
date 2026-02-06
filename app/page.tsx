"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundLeaves from "@/components/BackgroundLeaves";
import Envelope from "@/components/Envelope";
import Typewriter from "@/components/Typewriter";
import FloatingParticles from "@/components/FloatingParticles";
import PolaroidGallery from "@/components/PolaroidGallery";

export default function Home() {
  const [showLetter, setShowLetter] = useState(false);
  const [letterComplete, setLetterComplete] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  // Placeholder message - easy to edit
  const letterText = `Dearest Emma,

Happy Birthday!

On this special day, I wanted to create something as unique and wonderful as you are. 

May your day be filled with joy, laughter, and all the magic you bring into the world.

With all my love,
[Your Name]`;

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioElement) {
      audioElement.volume = newVolume / 100;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioElement) {
      if (isMuted) {
        audioElement.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioElement.volume = 0;
        setIsMuted(true);
      }
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Layers */}
      <BackgroundLeaves />
      <FloatingParticles />

      {/* Envelope, Letter, or Photo Gallery */}
      <AnimatePresence mode="wait">
        {!showLetter ? (
          <Envelope
            key="envelope"
            onOpen={() => setShowLetter(true)}
            onAudioReady={(audio) => setAudioElement(audio)}
          />
        ) : showPhotos ? (
          <PolaroidGallery key="photos" onBack={() => setShowPhotos(false)} />
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center min-h-screen p-8 z-20 relative"
          >
            <div className="max-w-2xl w-full bg-[#fdfbf7] shadow-2xl border border-[#dcd8d0] rounded-sm p-12 relative">
              <Typewriter text={letterText} onComplete={() => setLetterComplete(true)} instant={letterComplete} />

              {/* Decorative Sticker - top right corner */}
              {showLetter && (
                <motion.img
                  initial={{ opacity: 0, x: 50, y: -50, scale: 0.3, rotate: 45 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 12 }}
                  transition={{
                    delay: 2,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.4
                  }}
                  src="/pngegg.png"
                  alt="Decorative sticker"
                  className="absolute right-4 top-4 w-28 h-auto z-10"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
                    transform: 'rotate(12deg)',
                  }}
                />
              )}

              {/* View Memories Button */}
              {letterComplete && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  onClick={() => setShowPhotos(true)}
                  className="mt-8 mx-auto block px-6 py-3 bg-[#c15f5f] text-white rounded-full font-serif text-sm hover:bg-[#a34040] transition-colors shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  📸 View Memories
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volume Control - appears when letter is shown */}
      {showLetter && audioElement && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="fixed top-8 right-8 z-50 bg-[#fdfbf7]/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-xl border border-[#dcd8d0]"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMute}
              className="text-lg hover:scale-110 transition-transform active:scale-95"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "🔇" : volume > 50 ? "🔊" : volume > 0 ? "🔉" : "🔈"}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-32 h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #c15f5f 0%, #c15f5f ${isMuted ? 0 : volume}%, #e8e4d9 ${isMuted ? 0 : volume}%, #e8e4d9 100%)`
              }}
            />
            <span className="text-sm text-[#4a4a4a] font-serif min-w-[3rem] text-center font-medium">
              {isMuted ? "0%" : `${volume}%`}
            </span>
          </div>
        </motion.div>
      )}

      {/* Footer / Credits */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#4a4a4a] opacity-50 font-serif z-40">
        Emma's Birthday Letter
      </div>
    </main>
  );
}
