"use client";

import { motion } from "framer-motion";

interface PolaroidProps {
    src: string;
    caption?: string;
    delay: number;
    index: number;
    startX: number;
    startY: number;
    rotation: number;
}

export default function Polaroid({
    src,
    caption,
    delay,
    index,
    startX,
    startY,
    rotation
}: PolaroidProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.8,
                x: startX,
                y: startY,
                rotate: rotation
            }}
            animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                rotate: rotation
            }}
            transition={{
                delay,
                duration: 0.8,
                ease: "easeOut"
            }}
            className="absolute"
            style={{
                left: `${startX}%`,
                top: `${startY}%`,
            }}
        >
            <div
                className="bg-white p-3 pb-8 shadow-2xl hover:shadow-3xl transition-shadow cursor-pointer hover:scale-105 hover:z-50"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    width: '240px'
                }}
            >
                {/* Photo */}
                <div className="w-full h-64 bg-gray-900 relative overflow-hidden">
                    <img
                        src={src}
                        alt={caption || `Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Caption Area */}
                {caption && (
                    <div className="mt-2 text-center font-serif text-sm text-gray-700">
                        {caption}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
