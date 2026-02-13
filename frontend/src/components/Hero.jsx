import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="relative pt-20 pb-0 min-h-[60vh] lg:h-[60vh] flex items-center overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Text + Building Render */}
          <div className="flex-1 w-full order-2 lg:order-1 flex flex-col justify-center">
            <div className="mb-12 pl-4 border-l-4 border-gray-900">
               <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">{data.description || "20+ PODIUM LUXURIOUS AMENITIES | SPACIOUS BALCONY HOMES"}</h3>
               <h1 className="text-xl md:text-5xl mt-32 font-serif font-black text-gray-900 leading-tight">
                  {/* THINKING <span className="text-gray-800 font-black">OF A</span> <br />
                  <span className="text-emerald-700 italic">FANTASTIC</span> VICINITY? */}
                  {data.title || "Looking to buy a home in Mumbai?"}
               </h1>
            </div>
            
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-b-4 border-emerald-500 max-w-lg bg-white z-0">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-white via-white/20 to-transparent pointer-events-none" style={{ height: '50%' }}></div>
              <img 
                src={data.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000"} 
                alt="Building Render"
                className="w-full aspect-[16/11] object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Right Side: Logo + Pricing Table (More Centered) */}
          <div className="flex-[1.2] w-full flex flex-col items-center lg:items-start order-1 lg:order-2 text-center lg:text-left lg:pl-12">
            <div className="mb-6 w-full">
               <div className="flex flex-col items-center lg:items-start gap-1 mb-2">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center p-2 shadow-xl mb-1">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                      <path d="M12 2L4 10V21H20V10L12 2M12 4.4L18.4 10.8V19.4H5.6V10.8L12 4.4M12 7A2 2 0 0 0 10 9A2 2 0 0 0 12 11A2 2 0 0 0 14 9A2 2 0 0 0 12 7Z" />
                    </svg>
                  </div>
                  <div className="text-center lg:text-left">
                    <h2 className="text-gray-400 text-sm tracking-widest font-bold uppercase">Vighnaharta</h2>
                  </div>
               </div>
               <div className="w-24 h-1.5 bg-emerald-500 hidden lg:block"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-xl relative border-y border-gray-100 py-6">
               <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gray-100 hidden md:block"></div>
               
               <div className="px-4">
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Smart 1 BHK</h4>
                  <p className="text-xs text-gray-400 font-bold mb-1">@ <span className="line-through decoration-red-500">{data.extraData?.strikedPrice1Bhk || "74.99 Lacs"}</span></p>
                  <div className="space-y-0.5">
                     <p className="text-3xl font-black text-gray-900">₹ {data.extraData?.price1Bhk || "69.99 Lacs*"}</p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">onwards</p>
                  </div>
               </div>

               <div className="px-4">
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Premium 2 BHK</h4>
                  <p className="text-xs text-gray-400 font-bold mb-1">@ <span className="line-through decoration-red-500">{data.extraData?.strikedPrice2Bhk || "1.05 CR"}</span></p>
                  <div className="space-y-0.5">
                     <p className="text-3xl font-black text-gray-900">₹ {data.extraData?.price2Bhk || "96.99 Lacs*"}</p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">onwards</p>
                  </div>
               </div>
            </div>

            <div className=" bg-white shadow-2xl p-2 rounded-2xl flex items-center gap-2 border border-gray-50 max-w-sm w-full lg:ml-0 shadow-emerald-500/10 relative z-30">
               <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 flex-shrink-0">
                  <MapPin size={22} />
               </div>
               <div className="text-left">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">{data.extraData?.locationLabel || "Location"}</p>
                  <p className="text-xs font-black text-gray-800 leading-tight uppercase whitespace-pre-line">
                     {data.extraData?.address || "Bldg. No. 223/224, \nCircle - Kannamwar Nagar 1, Vikhroli (East)"}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy Divider - High on left, steep drop, then gentle slope */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] fill-[#def8ed]">
           <path d="M0,10 C150,10 300,100 600,105 S1000,110 1200,115 V120 H0 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
