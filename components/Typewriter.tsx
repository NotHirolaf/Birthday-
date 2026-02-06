"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

interface TypewriterProps {
    text: string;
    onComplete?: () => void;
    instant?: boolean; // Show full text immediately without typing animation
}

export default function Typewriter({ text, onComplete, instant }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDone, setIsDone] = useState(false);
    const indexRef = useRef(0);
    const onCompleteRef = useRef(onComplete);

    // Update ref when onComplete changes
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        // If instant mode, show full text immediately
        if (instant) {
            setDisplayedText(text);
            setIsDone(true);
            if (onCompleteRef.current) {
                onCompleteRef.current();
            }
            return;
        }

        // Reset state only if text actually changes
        setDisplayedText("");
        setIsDone(false);
        indexRef.current = 0;
    }, [text, instant]); // Removed onComplete from dependencies

    useEffect(() => {
        if (isDone || instant) return;

        const typeChar = () => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current++;

                // Randomize typing speed for "human" feel
                const delay = Math.random() * 50 + 30; // 30ms to 80ms
                setTimeout(typeChar, delay);
            } else {
                setIsDone(true);
                if (onCompleteRef.current) {
                    // Wait a moment *after* the last character before triggering completion events
                    setTimeout(() => onCompleteRef.current?.(), 500);
                }
                if (!instant) {
                    triggerConfetti();
                }
            }
        };

        const timeoutId = setTimeout(typeChar, 500); // Initial delay
        return () => clearTimeout(timeoutId);
    }, [text, isDone, instant]); // Removed onComplete from dependencies

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
            {!isDone && <span className="animate-pulse">|</span>}
        </div>
    );
}
