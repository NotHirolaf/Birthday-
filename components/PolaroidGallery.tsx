"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

// All 24 photos across 3 pages
const allPhotos: Photo[][] = [
    // Page 1 (photos 1-8)
    [
        { id: 1, src: "/photos/photo-1.jpg", caption: "Memory 1", delay: 0.2, startX: -300, startY: 20, rotation: -5 },
        { id: 2, src: "/photos/photo-2.JPG", caption: "Memory 2", delay: 0.4, startX: -300, startY: 20, rotation: 3 },
        { id: 3, src: "/photos/photo-3.JPG", caption: "Memory 3", delay: 0.6, startX: -300, startY: 20, rotation: -7 },
        { id: 4, src: "/photos/photo-4.JPG", caption: "Memory 4", delay: 0.8, startX: -300, startY: 20, rotation: 4 },
        { id: 5, src: "/photos/photo-5.DNG", caption: "Memory 5", delay: 0.3, startX: 300, startY: 55, rotation: 6 },
        { id: 6, src: "/photos/photo-6.jpg", caption: "Memory 6", delay: 0.5, startX: 300, startY: 55, rotation: -4 },
        { id: 7, src: "/photos/photo-7.jpg", caption: "Memory 7", delay: 0.7, startX: 300, startY: 55, rotation: 8 },
        { id: 8, src: "/photos/photo-8.jpg", caption: "Memory 8", delay: 0.9, startX: 300, startY: 55, rotation: -3 },
    ],
    // Page 2 (photos 9-16)
    [
        { id: 9, src: "/photos/photo-9.jpg", caption: "Memory 9", delay: 0.2, startX: -300, startY: 20, rotation: 5 },
        { id: 10, src: "/photos/photo-10.jpg", caption: "Memory 10", delay: 0.4, startX: -300, startY: 20, rotation: -3 },
        { id: 11, src: "/photos/photo-11.jpeg", caption: "Memory 11", delay: 0.6, startX: -300, startY: 20, rotation: 6 },
        { id: 12, src: "/photos/photo-12.JPG", caption: "Memory 12", delay: 0.8, startX: -300, startY: 20, rotation: -5 },
        { id: 13, src: "/photos/photo-13.jpg", caption: "Memory 13", delay: 0.3, startX: 300, startY: 55, rotation: -6 },
        { id: 14, src: "/photos/photo-14.jpg", caption: "Memory 14", delay: 0.5, startX: 300, startY: 55, rotation: 4 },
        { id: 15, src: "/photos/photo-15.jpg", caption: "Memory 15", delay: 0.7, startX: 300, startY: 55, rotation: -7 },
        { id: 16, src: "/photos/photo-16.jpg", caption: "Memory 16", delay: 0.9, startX: 300, startY: 55, rotation: 3 },
    ],
    // Page 3 (photos 17-24)
    [
        { id: 17, src: "/photos/photo-17.jpg", caption: "Memory 17", delay: 0.2, startX: -300, startY: 20, rotation: -4 },
        { id: 18, src: "/photos/photo-18.jpg", caption: "Memory 18", delay: 0.4, startX: -300, startY: 20, rotation: 7 },
        { id: 19, src: "/photos/photo-19.jpeg", caption: "Memory 19", delay: 0.6, startX: -300, startY: 20, rotation: -6 },
        { id: 20, src: "/photos/photo-20.jpg", caption: "Memory 20", delay: 0.8, startX: -300, startY: 20, rotation: 5 },
        { id: 21, src: "/photos/photo-21.JPG", caption: "Memory 21", delay: 0.3, startX: 300, startY: 55, rotation: 7 },
        { id: 22, src: "/photos/photo-22.jpg", caption: "Memory 22", delay: 0.5, startX: 300, startY: 55, rotation: -5 },
        { id: 23, src: "/photos/photo-23.jpg", caption: "Memory 23", delay: 0.7, startX: 300, startY: 55, rotation: 6 },
        { id: 24, src: "/photos/photo-24.jpg", caption: "Memory 24", delay: 0.9, startX: 300, startY: 55, rotation: -4 },
    ],
];

export default function PolaroidGallery({ onBack }: PolaroidGalleryProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const currentPhotos = allPhotos[currentPage];
    const topRowPhotos = currentPhotos.slice(0, 4);
    const bottomRowPhotos = currentPhotos.slice(4, 8);

    const goToNextPage = () => {
        if (currentPage < allPhotos.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

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
                Gangalang Memories ✨
            </motion.h2>

            {/* Top Row - Slides from left */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`top-${currentPage}`}
                    className="relative h-1/3 flex items-center justify-center gap-8 mb-12"
                >
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
                            exit={{
                                x: -400,
                                opacity: 0,
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
                                onClick={() => setSelectedPhoto(photo)}
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
                </motion.div>
            </AnimatePresence>

            {/* Bottom Row - Slides from right */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bottom-${currentPage}`}
                    className="relative h-1/3 flex items-center justify-center gap-8"
                >
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
                            exit={{
                                x: 400,
                                opacity: 0,
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
                                onClick={() => setSelectedPhoto(photo)}
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
                </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-12 z-50">
                {/* Previous Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    className={`px-5 py-2.5 bg-white/90 backdrop-blur-sm text-[#4a4a4a] rounded-full font-serif text-sm hover:bg-white hover:shadow-lg transition-all shadow-md border border-[#dcd8d0] flex items-center gap-2 ${currentPage === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                >
                    <span className="text-lg">←</span>
                    <span>Prev</span>
                </motion.button>

                {/* Page Indicators */}
                <div className="flex items-center gap-3">
                    {allPhotos.map((_, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
                            onClick={() => setCurrentPage(index)}
                            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${currentPage === index
                                ? 'bg-[#4a4a4a] scale-125'
                                : 'bg-[#4a4a4a]/30 hover:bg-[#4a4a4a]/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                    onClick={goToNextPage}
                    disabled={currentPage === allPhotos.length - 1}
                    className={`px-5 py-2.5 bg-white/90 backdrop-blur-sm text-[#4a4a4a] rounded-full font-serif text-sm hover:bg-white hover:shadow-lg transition-all shadow-md border border-[#dcd8d0] flex items-center gap-2 ${currentPage === allPhotos.length - 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                >
                    <span>Next</span>
                    <span className="text-lg">→</span>
                </motion.button>
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

            {/* Zoom Modal */}
            {selectedPhoto && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedPhoto(null)}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-8 cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0.8, rotate: selectedPhoto.rotation }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-4xl max-h-[90vh] cursor-default"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute -top-4 -right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors z-10 cursor-pointer"
                        >
                            <span className="text-2xl text-gray-700">×</span>
                        </button>

                        {/* Enlarged Polaroid */}
                        <div className="bg-white p-6 pb-12 shadow-2xl">
                            <img
                                src={selectedPhoto.src}
                                alt={selectedPhoto.caption || `Photo ${selectedPhoto.id}`}
                                className="w-full h-auto max-h-[70vh] object-contain"
                            />
                            {selectedPhoto.caption && (
                                <div className="mt-4 text-center font-serif text-lg text-gray-700">
                                    {selectedPhoto.caption}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}
