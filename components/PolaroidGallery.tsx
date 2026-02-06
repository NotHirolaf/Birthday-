"use client";

import { motion } from "framer-motion";
import Polaroid from "./Polaroid";

interface Photo {
    id: number;
    src: string;
    caption?: string;
    delay: number;
    startX: number;
    startY: number;
    rotation: number;
}

interface PolaroidGalleryProps {
    onBack?: () => void;
}

export default function PolaroidGallery({ onBack }: PolaroidGalleryProps) {
    // Strategically positioned photos in two rows
    const topRowPhotos: Photo[] = [
        {
            id: 1,
            src: "/photos/photo-1.png",
            caption: "Memory 1",
            delay: 0.2,
            startX: -300,
            startY: 20,
            rotation: -5,
        },
        {
            id: 2,
            src: "/photos/photo-2.png",
            caption: "Memory 2",
            delay: 0.4,
            startX: -300,
            startY: 20,
            rotation: 3,
        },
        {
            id: 3,
            src: "/photos/photo-3.png",
            caption: "Memory 3",
            delay: 0.6,
            startX: -300,
            startY: 20,
            rotation: -7,
        },
        {
            id: 4,
            src: "/photos/photo-4.png",
            caption: "Memory 4",
            delay: 0.8,
            startX: -300,
            startY: 20,
            rotation: 4,
        },
    ];

    const bottomRowPhotos: Photo[] = [
        {
            id: 5,
            src: "/photos/photo-5.png",
            caption: "Memory 5",
            delay: 0.3,
            startX: window.innerWidth + 300,
            startY: 55,
            rotation: 6,
        },
        {
            id: 6,
            src: "/photos/photo-6.png",
            caption: "Memory 6",
            delay: 0.5,
            startX: window.innerWidth + 300,
            startY: 55,
            rotation: -4,
        },
        {
            id: 7,
            src: "/photos/photo-7.png",
            caption: "Memory 7",
            delay: 0.7,
            startX: window.innerWidth + 300,
            startY: 55,
            rotation: 8,
        },
        {
            id: 8,
            src: "/photos/photo-8.png",
            caption: "Memory 8",
            delay: 0.9,
            startX: window.innerWidth + 300,
            startY: 55,
            rotation: -3,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-gradient-to-b from-[#f5f1e8] to-[#e8dfc8] z-30 overflow-hidden"
        >
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl font-serif text-center mt-12 mb-8 text-[#4a4a4a]"
            >
                Our Memories Together ✨
            </motion.h2>

            {/* Top Row - Slides from left */}
            <div className="relative h-1/3 flex items-center justify-center gap-8 mb-12">
                {topRowPhotos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{
                            x: -400,
                            opacity: 0,
                            rotate: photo.rotation - 10
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            rotate: photo.rotation,
                        }}
                        transition={{
                            delay: photo.delay,
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 50,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div
                            className="bg-white p-3 pb-8 shadow-2xl hover:shadow-3xl transition-shadow cursor-pointer"
                            style={{
                                transform: `rotate(${photo.rotation}deg)`,
                                width: '220px'
                            }}
                        >
                            {/* Photo */}
                            <div className="w-full h-60 bg-gray-900 relative overflow-hidden">
                                <img
                                    src={photo.src}
                                    alt={photo.caption || `Photo ${photo.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Caption Area */}
                            {photo.caption && (
                                <div className="mt-2 text-center font-serif text-sm text-gray-700">
                                    {photo.caption}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Row - Slides from right */}
            <div className="relative h-1/3 flex items-center justify-center gap-8">
                {bottomRowPhotos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{
                            x: 400,
                            opacity: 0,
                            rotate: photo.rotation + 10
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            rotate: photo.rotation,
                        }}
                        transition={{
                            delay: photo.delay,
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 50,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div
                            className="bg-white p-3 pb-8 shadow-2xl hover:shadow-3xl transition-shadow cursor-pointer"
                            style={{
                                transform: `rotate(${photo.rotation}deg)`,
                                width: '220px'
                            }}
                        >
                            {/* Photo */}
                            <div className="w-full h-60 bg-gray-900 relative overflow-hidden">
                                <img
                                    src={photo.src}
                                    alt={photo.caption || `Photo ${photo.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Caption Area */}
                            {photo.caption && (
                                <div className="mt-2 text-center font-serif text-sm text-gray-700">
                                    {photo.caption}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Back Button - Top Left Corner */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                onClick={onBack}
                className="fixed top-8 left-8 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-[#4a4a4a] rounded-full font-serif text-sm hover:bg-white hover:shadow-lg transition-all shadow-md border border-[#dcd8d0] z-50 flex items-center gap-2"
            >
                <span className="text-lg">←</span>
                <span>Back</span>
            </motion.button>
        </motion.div>
    );
}
