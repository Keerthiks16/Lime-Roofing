import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Township = ({ data }) => {
  if (!data) return null;
  const buildings = data.items || [];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 text-center mb-16 tracking-tight">
           {data.title.split(' ').map((word, i, arr) => (
             i === arr.length - 1 ? <span key={i} className="text-emerald-700">{word}</span> : word + ' '
           ))}
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buildings.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden shadow-xl border border-gray-100"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={b.img || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"} 
                    alt={b.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80">{b.status}</p>
                   <h3 className="text-lg font-black uppercase tracking-wide">{b.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Decorative Navigation (Visual Only) */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-emerald-600 hidden lg:flex cursor-pointer hover:bg-emerald-50 transition-colors">
             <ChevronLeft size={24} />
          </div>
          <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-emerald-600 hidden lg:flex cursor-pointer hover:bg-emerald-50 transition-colors">
             <ChevronRight size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Township;
