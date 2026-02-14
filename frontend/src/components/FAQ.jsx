import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data) return null;

  return (
    <section id="faq" className="py-32 bg-[#f8fffb] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1a3a3a] text-center mb-24 tracking-tight">
           Frequently Asked Questions
        </h2>
        
        <div className="max-w-5xl mx-auto space-y-6">
          {data.items?.map((item, index) => (
            <div key={index} className="overflow-hidden px-4">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-7 rounded-2xl transition-all duration-300 text-left bg-[#def8ed] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-lg border border-white/50`}
              >
                <span className="font-bold text-[#1a3a3a] text-sm md:text-base tracking-tight">{item.question}</span>
                <div className={`transition-transform duration-300 flex-shrink-0 ml-4 ${activeIndex === index ? 'rotate-45' : ''}`}>
                   <Plus size={24} className="text-[#2dd4bf] stroke-[3px]" />
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-10 py-8 text-gray-600 leading-relaxed font-medium bg-white/40 backdrop-blur-sm rounded-b-2xl border-x border-b border-[#def8ed]/50 mx-4 shadow-inner text-sm">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
