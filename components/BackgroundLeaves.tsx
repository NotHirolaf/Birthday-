"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Simple SVG Leaf Component
const Leaf = ({ color }: { color: string }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
    >
        <path
            d="M12 2C12 2 11 8 5 12C11 13 12 22 12 22C12 22 13 13 19 12C13 8 12 2 12 2Z"
            fill={color}
        />
    </svg>
);

export default function BackgroundLeaves() {
    const [leaves, setLeaves] = useState<
        { id: number; x: number; delay: number; duration: number; color: string }[]
    >([]);

    useEffect(() => {
        // Generate random leaves primarily on the client to avoid hydration mismatch
        const colors = ["#9eb58b", "#7c9a6a", "#a8c095", "#8da87c"];
        const leafCount = 20;
        const newLeaves = Array.from({ length: leafCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage
            delay: Math.random() * 20,
            duration: 15 + Math.random() * 20, // Slow drift
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setLeaves(newLeaves);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {leaves.map((leaf) => (
                <motion.div
                    key={leaf.id}
                    initial={{ y: -50, x: `${leaf.x}vw`, rotate: 0, opacity: 0 }}
                    animate={{
                        y: "110vh",
                        x: [`${leaf.x}vw`, `${leaf.x + (Math.random() * 10 - 5)}vw`], // Sway slightly
                        rotate: 360,
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: leaf.duration,
                        repeat: Infinity,
                        delay: leaf.delay,
                        ease: "linear",
                    }}
                    style={{ position: "absolute" }}
                >
                    <Leaf color={leaf.color} />
                </motion.div>
            ))}
        </div>
    );
}
