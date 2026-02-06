"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail } from "lucide-react"; // Fallback icon or decoration

export default function Envelope({ onOpen }: { onOpen: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        // Play audio
        const audio = new Audio("https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg"); // Placeholder loop
        // Ideally we'd use a specific piano track. 
        // audio.loop = true; // Use loop if it was a track
        // audio.play().catch(e => console.log("Audio autoplay failed", e)); 

        // Delay calling onOpen to allow animation to play
        setTimeout(() => {
            onOpen();
        }, 800);
    };

    return (
        <div className="relative flex items-center justify-center h-screen w-full z-10">
            <motion.div
                className="relative w-64 h-40 bg-[#fdfbf7] shadow-xl rounded-sm cursor-pointer border border-gray-200"
                initial={{ scale: 1, rotate: 0 }}
                animate={
                    isOpen
                        ? { scale: 0, opacity: 0 } // Disappear as letter takes over
                        : {
                            rotate: [0, -1, 1, -1, 0],
                            scale: [1, 1.02, 1, 1.02, 1],
                        }
                }
                transition={
                    isOpen
                        ? { duration: 0.5 }
                        : {
                            repeat: Infinity,
                            repeatDelay: 2, // Shake every 2 seconds
                            duration: 0.5,
                        }
                }
                whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                onClick={handleOpen}
            >
                {/* Envelope Flap (Closed) */}
                {!isOpen && (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[80px] border-t-[#e8e4d9] origin-top"
                    />
                )}

                {/* Wax Seal */}
                {!isOpen && (
                    <motion.div
                        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#c15f5f] shadow-sm flex items-center justify-center border-2 border-[#a34040]"
                        initial={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                    >
                        <span className="text-white text-xs font-serif">♥</span>
                    </motion.div>
                )}

                {/* Envelope Body/Pouch Appearance */}
                <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none border-t border-gray-100 opacity-50" />
            </motion.div>
        </div>
    );
}
