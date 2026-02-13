import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloorPlans = () => {
  const [activeWing, setActiveWing] = useState('East Wing');
  const [activeBhk, setActiveBhk] = useState('1 BHK');

  const wings = ['East Wing', 'West Wing', 'North Wing', 'South Wing'];
  const bhks = ['1 BHK', '2 BHK', '5.6 BHK'];

  const details = {
    '1 BHK': { type: '1bhk', area: '380-411 RCA Sq.ft', price: 'Click for price' },
    '2 BHK': { type: '2bhk', area: '580-611 RCA Sq.ft', price: 'Click for price' },
    '5.6 BHK': { type: '5.6bhk', area: '1280-1350 RCA Sq.ft', price: 'Click for price' },
  };

  return (
    <section id="floor-plans" className="py-24 bg-[#def8ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wing Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {wings.map(wing => (
            <button
              key={wing}
              onClick={() => setActiveWing(wing)}
              className={`px-8 py-2 text-xs font-black uppercase tracking-widest transition-all relative ${activeWing === wing ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {wing}
              {activeWing === wing && (
                <motion.div layoutId="underline_wing" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white/40 backdrop-blur-sm p-8 lg:p-16 rounded-[40px] shadow-2xl">
          
          {/* Left: 3D Floor Plan Image */}
          <div className="flex-[1.2] w-full bg-white rounded-[32px] p-8 shadow-inner relative group">
             <AnimatePresence mode="wait">
                <motion.img
                  key={activeBhk}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  src="https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&q=80&w=1000"
                  className="w-full h-auto rounded-xl drop-shadow-2xl"
                  alt={`Floor Plan ${activeBhk}`}
                />
             </AnimatePresence>
             <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">3D View</div>
          </div>

          {/* Right: Info & Controls */}
          <div className="flex-1 w-full">
             <div className="max-w-md mx-auto">
                <div className="flex gap-4 mb-12">
                   {bhks.map(bhk => (
                     <button
                       key={bhk}
                       onClick={() => setActiveBhk(bhk)}
                       className={`flex-1 py-3 rounded-xl font-black text-sm transition-all border-2 ${activeBhk === bhk ? 'bg-[#50dab4] text-white border-[#50dab4] shadow-lg' : 'bg-white text-gray-400 border-transparent hover:border-emerald-200'}`}
                     >
                       {bhk}
                     </button>
                   ))}
                </div>

                <div className="space-y-8 mb-12 border-l-4 border-emerald-400 pl-8">
                   <div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Type</p>
                      <p className="text-2xl font-black text-gray-800 uppercase">{details[activeBhk].type}</p>
                   </div>
                   <div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Area</p>
                      <p className="text-2xl font-black text-gray-800 uppercase">{details[activeBhk].area}</p>
                   </div>
                   <div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Price</p>
                      <p className="text-2xl font-black text-gray-800 uppercase text-emerald-600">{details[activeBhk].price}</p>
                   </div>
                </div>

                <button className="w-full bg-[#b4ec51] text-gray-900 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#a2d84a] transition-all shadow-[0_15px_30px_rgba(180,236,81,0.3)] active:scale-95">
                   Download Floor Plan
                </button>

                <div className="mt-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                   {[1,2,3].map(i => (
                     <div key={i} className="flex-shrink-0 w-24 h-24 rounded-xl border-2 border-emerald-100 p-2 hover:border-emerald-500 transition-colors cursor-pointer bg-white shadow-sm">
                        <img src="https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-contain" alt="Thumbnail" />
                     </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FloorPlans;
