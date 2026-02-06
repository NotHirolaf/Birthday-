"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingParticles() {
    const [particles, setParticles] = useState<
        { id: number; x: number; y: number; duration: number; delay: number }[]
    >([]);

    useEffect(() => {
        // Generate magical dust/pollen
        const particleCount = 40;
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 10 + Math.random() * 20,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-[#faeab1] opacity-60 blur-[1px]"
                    style={{
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                        width: Math.random() > 0.5 ? "2px" : "3px",
                        height: Math.random() > 0.5 ? "2px" : "3px",
                    }}
                    animate={{
                        y: [
                            `${p.y}vh`,
                            `${p.y - (10 + Math.random() * 10)}vh`,
                            `${p.y}vh`,
                        ],
                        x: [
                            `${p.x}vw`,
                            `${p.x + (Math.random() * 5 - 2.5)}vw`,
                            `${p.x}vw`,
                        ],
                        opacity: [0, 0.6, 0.2, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
