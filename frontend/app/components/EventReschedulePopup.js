"use client"

import React, { useState } from 'react';
import { 
  Calendar, 
  Mountain, 
  Handshake, 
  Scale, 
  Globe, 
  X 
} from 'lucide-react';

export default function NIACNoticeModal() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    /* Fixed Fullscreen Backdrop Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 overflow-y-auto">
      
      {/* Notice Card Container */}
      <div className="relative w-full max-w-2xl max-h-[calc(100vh-1.5rem)] sm:max-h-none overflow-y-auto bg-white rounded-lg shadow-2xl p-5 sm:p-8 font-sans text-slate-800 my-auto">
        
        {/* Top-Right Exit Cross */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
          aria-label="Close notice"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pr-6 pl-2">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img 
              src="https://niac.asia/wp-content/uploads/2019/09/logo-niac.png" 
              alt="NIAC Logo" 
              className="h-10 w-auto object-contain" 
            />
            <h2 className="text-xl font-bold text-[#0f2b5c] uppercase tracking-tight">
              IMPORTANT <span className="text-[#c17937]">UPDATE & APPEAL</span>
            </h2>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#0f2b5c] uppercase tracking-wide">
              ASIA ADR SUMMIT & NEPAL ADR WEEK 2026
            </h3>
            <p className="text-sm font-semibold text-[#c17937] mt-1">
              <span className="line-through text-slate-400 mr-2">4–6 DECEMBER 2026</span> 
              NEW DATES: 5–7 MARCH 2027
            </p>
          </div>

          <p className="text-xs text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Due to recent devastating flash floods in specific Nepali regions i.e. Trishuli river basins, we are rescheduling this event. We thank the global community for their kind support and solidarity.
          </p>
        </div>

        {/* Support Points */}
        <div className="mt-5 p-4 bg-slate-50 rounded-md border border-slate-100">
          <h4 className="text-center text-xs font-bold tracking-wider text-[#0f2b5c] uppercase mb-3">
            YOUR CONTINUE SUPPORT IS SIGNIFICANT, SO THAT WE KINDLY REQUEST YOU TO:
          </h4>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#c17937] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 uppercase">MARK YOUR CALENDARS:</strong> To participate in the rescheduled event, <strong className="text-slate-900 uppercase">5–7 March 2027</strong>, in Kathmandu.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Mountain className="w-4 h-4 text-[#c17937] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 uppercase">KEEP NEPAL AS A TRAVEL DESTINATION:</strong> Entire Nepal including Kathmandu and all heritage sites are safe and fully operational in welcoming condition of your visit.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Handshake className="w-4 h-4 text-[#c17937] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 uppercase">ENGAGE OUR PROFESSIONALS:</strong> We&apos;re confident the international community stands ready to support Nepal. We invite and request you to work and engage with our qualified Arbitrators, Lawyers, Mediators, Engineers, and IT professionals.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-[#c17937] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 uppercase">CHOOSE NEPAL AS AN ARBITRATION SEAT:</strong> Host your upcoming mediations and arbitrations in Nepal.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-[#c17937] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 uppercase">BRING GLOBAL EVENTS TO NEPAL:</strong> Host future conferences and summits here to contribute to economic recovery.
              </div>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-5 pt-2">
          <p className="text-xs font-bold text-[#0f2b5c] uppercase tracking-wide">
            WE LOOK FORWARD TO WELCOMING YOU TO KATHMANDU.
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-2">
            Nepal International ADR Center (NIAC), Kathmandu, Nepal
          </p>
        </div>

      </div>
    </div>
  );
}