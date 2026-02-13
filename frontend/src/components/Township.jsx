import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Township = ({ data }) => {
  if (!data) return null;
  const buildings = data.items || [];

  return (
    <section className="py-24 bg-[#def8ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1a3a3a] text-center mb-20 tracking-tight">
           Explore More Buildings in the Township
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buildings.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50 bg-white"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={b.img || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"} 
                    alt={b.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-r from-[#8be6c4] to-[#c7f474] text-[#1a3a3a] text-center">
                   <p className="text-[11px] font-black uppercase tracking-tight">
                      {b.status} - {b.name}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Pixel-Perfect Navigation Arrows */}
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex items-center justify-center pointer-events-none">
             <div className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-emerald-600 hidden lg:flex cursor-pointer hover:bg-emerald-50 transition-colors pointer-events-auto">
                <ChevronLeft size={24} strokeWidth={3} />
             </div>
          </div>
          <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex items-center justify-center pointer-events-none">
             <div className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-emerald-600 hidden lg:flex cursor-pointer hover:bg-emerald-50 transition-colors pointer-events-auto">
                <ChevronRight size={24} strokeWidth={3} />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Township;
