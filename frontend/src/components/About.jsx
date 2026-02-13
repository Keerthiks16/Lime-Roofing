import React from 'react';
import { motion } from 'framer-motion';

const About = ({ data }) => {
  if (!data) return null;

  return (
    <section id="developer" className="pt-16 pb-8 min-h-[45vh] lg:h-[45vh] flex items-center bg-[#def8ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Overlapping Circular Images (Larger as per reference) */}
          <div className="flex-1 relative w-full h-[200px] lg:h-[450px]">
             {/* Center Large Circle */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 lg:w-72 lg:h-72 rounded-full border-4 lg:border-8 border-white shadow-2xl overflow-hidden z-20">
                <img src={data.images?.[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover" alt="Interior" />
             </div>
             
             {/* Top Circle */}
             <div className="absolute top-14 left-4 w-28 h-28 lg:w-48 lg:h-48 rounded-full border-2 lg:border-4 border-white shadow-xl overflow-hidden z-10">
                <img src={data.images?.[1] || "https://images.unsplash.com/photo-1600607687940-47a000df3cc4?auto=format&fit=crop&q=80&w=600"} className="w-full h-full object-cover" alt="Garden" />
             </div>

             {/* Bottom Right Circle */}
             <div className="absolute bottom-4 right-4 w-32 h-32 lg:w-44 lg:h-44 rounded-full border-2 lg:border-4 border-white shadow-xl overflow-hidden z-30">
                <img src={data.images?.[2] || "https://images.unsplash.com/photo-1628592102171-ade797814c56?auto=format&fit=crop&q=80&w=600"} className="w-full h-full object-cover" alt="Lobby" />
             </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="flex-1">
             <div className="max-w-xl">
                <h2 className="text-2xl lg:text-3xl font-serif font-black text-gray-900 mb-2 tracking-tight uppercase">
                   {data.title || "About Project"}
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed font-medium text-[11px] lg:text-xs whitespace-pre-line">
                   {data.description || `At Vighnaharta Infinity, every detail reflects the grandest gesture of life in the most authentic and desirable home. \n\nGuided by a humanist approach, the architecture places people at the heart of the space. \n\nBuilt on the foundations of comfort, it evokes a true sense of freedom, protection, and belonging.`}
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4">
                   <button className="bg-[#b4ec51] text-gray-900 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#a2d84a] transition-all shadow-md active:scale-95">
                      Download Brochure
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
