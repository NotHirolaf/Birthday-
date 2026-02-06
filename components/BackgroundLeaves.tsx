"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MapleLeafIcon from "./MapleLeafIcon";

export default function BackgroundLeaves() {
    const [leaves, setLeaves] = useState<
        {
            id: number;
            x: number;
            delay: number;
            duration: number;
            color: string;
            scale: number;
        }[]
    >([]);

    useEffect(() => {
        // Generate random leaves primarily on the client to avoid hydration mismatch
        const colors = ["#d65f5f", "#c15f5f", "#e68a8a", "#d97b7b", "#b04a4a"]; // Reddish maple colors
        const leafCount = 80; // Increased count
        const newLeaves = Array.from({ length: leafCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage
            delay: Math.random() * 25,
            duration: 15 + Math.random() * 20, // Slow drift
            color: colors[Math.floor(Math.random() * colors.length)],
            scale: 0.5 + Math.random() * 0.8, // Size variation
        }));
        setLeaves(newLeaves);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {leaves.map((leaf) => (
                <motion.div
                    key={leaf.id}
                    initial={{
                        y: -50,
                        x: `${leaf.x}vw`,
                        rotate: Math.random() * 360,
                        opacity: 0,
                        scale: leaf.scale,
                    }}
                    animate={{
                        y: "110vh",
                        x: [`${leaf.x}vw`, `${leaf.x + (Math.random() * 20 - 10)}vw`], // More natural sway
                        rotate: [0, 360],
                        opacity: [0, 0.8, 0.8, 0],
                    }}
                    transition={{
                        duration: leaf.duration,
                        repeat: Infinity,
                        delay: leaf.delay,
                        ease: "linear",
                    }}
                    style={{ position: "absolute" }}
                >
                    <MapleLeafIcon color={leaf.color} size={24} />
                </motion.div>
            ))}
        </div>
    );
}
