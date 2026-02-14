import React from 'react';
import { motion } from 'framer-motion';

const ConstructionUpdates = ({ data }) => {
  if (!data) return null;
  const updates = data.items || [];

  return (
    <section className=" bg-white overflow-hidden">
      {/* Full width gradient title bar */}
      <div className="bg-gradient-to-r from-[#8be6c4] to-[#c7f474] py-12 mb-8 relative shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1a3a3a] text-center tracking-tight">
             {data.title || "Construction Updates"}
           </h2>
        </div>
        <div className="max-w-7xl mt-20 h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {updates.map((u, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1, duration: 0.6 }}
               viewport={{ once: true }}
               className="group relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white h-[450px]"
             >
                <img src={u.img || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={u.tower} />
                
                {/* Frosted glass bar at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-white/30 backdrop-blur-xl border-t border-white/40 flex flex-col items-center text-center">
                   <p className="text-xs font-black uppercase tracking-widest text-[#1a3a3a] mb-1">{u.status}</p>
                   <h3 className="text-lg font-black uppercase tracking-wider mb-2 text-[#1a3a3a]">{u.tower}</h3>
                   <a href="#" className="text-[10px] font-black underline underline-offset-4 text-[#1a3a3a] hover:text-[#50dab4] transition-colors uppercase tracking-widest">Know More</a>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
      </div>

      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {updates.map((u, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1, duration: 0.6 }}
               viewport={{ once: true }}
               className="group relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white h-[450px]"
             >
                <img src={u.img || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={u.tower} />
                
                <div className="absolute inset-x-0 bottom-0 p-6 bg-white/30 backdrop-blur-xl border-t border-white/40 flex flex-col items-center text-center">
                   <p className="text-xs font-black uppercase tracking-widest text-[#1a3a3a] mb-1">{u.status}</p>
                   <h3 className="text-lg font-black uppercase tracking-wider mb-2 text-[#1a3a3a]">{u.tower}</h3>
                   <a href="#" className="text-[10px] font-black underline underline-offset-4 text-[#1a3a3a] hover:text-[#50dab4] transition-colors uppercase tracking-widest">Know More</a>
                </div>
             </motion.div>
           ))}
        </div>
      </div> */}
    </section>
  );
};

export default ConstructionUpdates;
