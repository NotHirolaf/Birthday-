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
    const onCompleteRef = useRef(onComplete);

    // Update ref when onComplete changes
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Handle instant mode and resets
    useEffect(() => {
        if (instant) {
            setDisplayedText(text);
            setIsDone(true);
            // Use a small timeout to allow render to complete before callback
            const timeout = setTimeout(() => {
                if (onCompleteRef.current) onCompleteRef.current();
            }, 0);
            return () => clearTimeout(timeout);
        }
        // Reset only if text changes and we aren't already matching (prevents loop)
        if (displayedText !== "" && displayedText !== text && !text.startsWith(displayedText)) {
            setDisplayedText("");
            setIsDone(false);
        } else if (text !== displayedText && displayedText === "") {
            // Initial start
            setIsDone(false);
        }
    }, [instant, text, displayedText]);

    // Typing Effect
    useEffect(() => {
        if (instant || isDone) return;

        // If finished typing
        if (displayedText.length >= text.length) {
            setIsDone(true);
            if (!instant) triggerConfetti();
            const timeout = setTimeout(() => {
                if (onCompleteRef.current) onCompleteRef.current();
            }, 500);
            return () => clearTimeout(timeout);
        }

        // Type next character
        const isStarting = displayedText === "";
        const delay = isStarting ? 500 : (Math.random() * 50 + 30);

        const timeoutId = setTimeout(() => {
            setDisplayedText(text.slice(0, displayedText.length + 1));
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [displayedText, text, instant, isDone]);

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
