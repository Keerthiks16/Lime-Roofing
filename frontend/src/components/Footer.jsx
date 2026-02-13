import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import EnquiryForm from './EnquiryForm';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-950 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">V</span>
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase leading-none mb-1">Vighnaharta</h3>
                <h4 className="text-xl font-black text-white leading-none">INFINITY</h4>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 font-medium">
              Building dreams into reality with excellence, integrity, and innovation since 2010. Experience the pinnacle of luxury living.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#b4ec51] hover:text-gray-900 transition-all duration-300"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#b4ec51] hover:text-gray-900 transition-all duration-300"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#b4ec51] hover:text-gray-900 transition-all duration-300"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
             <h4 className="text-sm font-black mb-8 uppercase tracking-[0.2em] text-[#b4ec51]">Quick Links</h4>
             <ul className="space-y-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
               <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
               <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
               <li><a href="#amenities" className="hover:text-white transition-colors">Amenities</a></li>
               <li><a href="#floor-plans" className="hover:text-white transition-colors">Floor Plans</a></li>
               <li><a href="#developer" className="hover:text-white transition-colors">Developer</a></li>
             </ul>
          </div>

          {/* Contact Info */}
          <div>
             <h4 className="text-sm font-black mb-8 uppercase tracking-[0.2em] text-[#b4ec51]">Contact Us</h4>
             <ul className="space-y-6 text-gray-400">
               <li className="flex gap-4">
                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#b4ec51]">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Our Address</p>
                    <p className="text-sm font-bold text-gray-300">Bldg No. 223/224, Kanjurmarg East, Mumbai</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#b4ec51]">
                    <Phone size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-sm font-bold text-gray-300">+91 98765 43210</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#b4ec51]">
                    <Mail size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-sm font-bold text-gray-300">sales@vighnaharta.com</p>
                 </div>
               </li>
             </ul>
          </div>

          {/* Enquiry Wrapper */}
          <div className="md:col-span-1">
             <h4 className="text-sm font-black mb-8 uppercase tracking-[0.2em] text-[#b4ec51]">Enquiry Now</h4>
             <EnquiryForm />
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 text-center">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2024 Vighnaharta Infinity. Developed for Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
