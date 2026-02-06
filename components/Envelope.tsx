"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function Envelope({ onOpen, onAudioReady }: { onOpen: () => void; onAudioReady?: (audio: HTMLAudioElement) => void }) {
    const [step, setStep] = useState<"closed" | "opening" | "opened">("closed");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleOpen = () => {
        if (step !== "closed") return;
        setStep("opening");

        // Create and play audio only when envelope is opened
        if (!audioRef.current) {
            audioRef.current = new Audio('/one-summers-day.mp3');
            audioRef.current.volume = 0.5;
            if (onAudioReady) {
                onAudioReady(audioRef.current);
            }
        }

        audioRef.current.currentTime = 7; // Start at 7 seconds (skip intro)
        audioRef.current.play().catch(error => {
            console.log("Audio playback error:", error);
        });

        setTimeout(() => {
            onOpen();
        }, 1500);
    };

    return (
        <div className="relative flex items-center justify-center h-screen w-full z-10 pointer-events-none">
            <motion.div
                className="relative pointer-events-auto cursor-pointer"
                onClick={handleOpen}
                animate={step === "closed" ? {
                    rotate: [0, -3, 3, -3, 0],
                    scale: [1, 1.05, 1, 1.05, 1]
                } : {}}
                transition={step === "closed" ? {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeInOut"
                } : {}}
            >

                {/* The Letter Card (Hidden inside initially) */}
                <motion.div
                    className="absolute left-4 right-4 top-2 h-32 bg-white shadow-sm z-10"
                    initial={{ y: 0 }}
                    animate={step === "opening" ? { y: -100 } : { y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                    <div className="p-4 space-y-2 opacity-30">
                        <div className="w-full h-1 bg-gray-200 rounded" />
                        <div className="w-full h-1 bg-gray-200 rounded" />
                        <div className="w-2/3 h-1 bg-gray-200 rounded" />
                    </div>
                </motion.div>

                {/* Envelope Back Body */}
                <div className="relative w-72 h-44 bg-[#f0ede6] shadow-xl rounded-sm z-20 overflow-hidden border border-[#dcd8d0]">
                    {/* Pocket pattern/shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent top-10" />
                </div>

                {/* Envelope Front Body (The pocket part) */}
                <div className="absolute bottom-0 left-0 w-full h-0 z-30 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-b-[90px] border-b-[#fcfaf7] drop-shadow-sm" />
                <div className="absolute bottom-0 left-0 w-full h-0 z-30 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-b-[90px] border-b-[#f7f5f0] clip-path-polygon" />

                {/* The Flap (Top triangle) */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-0 z-40 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-t-[90px] border-t-[#ebe7e0] origin-top drop-shadow-md"
                    initial={{ rotateX: 0 }}
                    animate={step !== "closed" ? { rotateX: 180, zIndex: 1 } : { rotateX: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {/* Wax Seal attached to Flap */}
                    <motion.div
                        className="absolute -top-[55px] left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#c15f5f] shadow-sm flex items-center justify-center border-2 border-[#a34040]"
                        animate={step !== "closed" ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="text-white text-sm font-serif">♥</span>
                    </motion.div>
                </motion.div>

            </motion.div>
        </div>
    );
}
