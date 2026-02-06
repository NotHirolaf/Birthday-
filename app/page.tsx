"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundLeaves from "@/components/BackgroundLeaves";
import Envelope from "@/components/Envelope";
import Typewriter from "@/components/Typewriter";

export default function Home() {
  const [showLetter, setShowLetter] = useState(false);

  // Placeholder message - easy to edit
  const letterText = `Dearest Emma,

Happy Birthday!

I hope your day is as magical and peaceful as a quiet afternoon in the countryside. May your year be filled with small wonders, gentle breezes, and the warmth of good company.

Just like the leaves drifting in the wind, may you find beauty in every moment.

With all my love,
[Your Name]`;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-4">
      {/* Background Layer */}
      <BackgroundLeaves />

      <div className="z-10 w-full max-w-2xl flex flex-col items-center justify-center min-h-[50vh]">
        <AnimatePresence mode="wait">
          {!showLetter ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
              className="w-full flex justify-center"
            >
              <Envelope onOpen={() => setShowLetter(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg border border-[#e8e4d9] w-full max-w-lg md:max-w-2xl overflow-y-auto max-h-[80vh] scrollbar-hide"
            >
              {/* Paper Texture Overlay for Letter */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

              <div className="relative z-10">
                <Typewriter text={letterText} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Credits */}
      <div className="fixed bottom-4 text-xs text-[#4a4a4a] opacity-50 font-serif z-50">
        Inspired by Studio Ghibli
      </div>
    </main>
  );
}
