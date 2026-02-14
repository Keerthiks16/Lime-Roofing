import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const VideoTour = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Default video logic
  const videoUrl = data?.extraData?.videoUrl || "https://www.youtube.com/watch?v=jPkBJY1KI_Q"; // Placeholder
  const thumbnailUrl = data?.images?.[0] || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2000";

  return (
    <section className="relative w-full aspect-[21/9] md:h-[600px] overflow-hidden group cursor-pointer" onClick={() => setIsOpen(true)}>
      {/* Thumbnail Background */}
      <img 
        src={thumbnailUrl} 
        alt="Location View" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
        {/* Play Button Overlay */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 border-4 border-white/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 bg-white/10 backdrop-blur-sm">
           <Play fill="white" size={48} className="text-white ml-2" />
           {/* Pulsing ring animation */}
           <div className="absolute inset-0 border-4 border-white rounded-full animate-ping opacity-20"></div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            <button className="absolute top-8 right-8 text-white hover:text-emerald-400 transition-colors">
              <X size={48} strokeWidth={1.5} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTour;
