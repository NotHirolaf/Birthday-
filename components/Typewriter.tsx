"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

interface TypewriterProps {
    text: string;
    onComplete?: () => void;
}

export default function Typewriter({ text, onComplete }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDone, setIsDone] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        // Reset state if text changes
        setDisplayedText("");
        setIsDone(false);
        indexRef.current = 0;
    }, [text]);

    useEffect(() => {
        if (isDone) return;

        const typeChar = () => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current++;

                // Randomize typing speed for "human" feel
                const delay = Math.random() * 50 + 30; // 30ms to 80ms
                setTimeout(typeChar, delay);
            } else {
                setIsDone(true);
                if (onComplete) {
                    // Wait a moment *after* the last character before triggering completion events
                    setTimeout(onComplete, 500);
                }
                triggerConfetti();
            }
        };

        const timeoutId = setTimeout(typeChar, 500); // Initial delay
        return () => clearTimeout(timeoutId);
    }, [text, isDone, onComplete]);

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const colors = ["#ffb7b2", "#ffdac1", "#e2f0cb", "#b5ead7", "#c7ceea"];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: colors,
                shapes: ["circle"], // Petal-like
                scalar: 0.8,
                drift: 0,
                ticks: 200, // slower fall
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: colors,
                shapes: ["circle"],
                scalar: 0.8,
                drift: 0,
                ticks: 200,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };

    return (
        <div className="font-serif text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
            {displayedText}
            <span className="animate-pulse">|</span>
        </div>
    );
}
