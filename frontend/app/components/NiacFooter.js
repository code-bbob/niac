import { Globe, AtSign, Share2, MapPin, Phone, Mail, Send } from "lucide-react";

export default function NiacFooter() {
  return (
    <footer className="bg-primary-container text-on-primary-container border-t border-outline-variant">
      {/* Subtle top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-tertiary-fixed/30 to-transparent" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-8 py-[50px] sm:py-[100px] max-w-[1600px] mx-auto">
        <div className="col-span-1">
          <div className="font-serif text-2xl text-white mb-1">NIAC</div>
          <div className="text-[9px] tracking-[0.25em] uppercase text-tertiary-fixed/60 mb-6">
            Nepal International ADR Center
          </div>
          <p className="text-sm leading-relaxed opacity-70 mb-8 max-w-xs">
            Elevating dispute resolution standards in the Himalayan region and beyond since 2004.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 border border-outline-variant/40 flex items-center justify-center hover:border-tertiary-fixed/60 hover:text-tertiary-fixed transition-all duration-300" aria-label="Website">
              <Globe className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-9 h-9 border border-outline-variant/40 flex items-center justify-center hover:border-tertiary-fixed/60 hover:text-tertiary-fixed transition-all duration-300" aria-label="Email">
              <AtSign className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-9 h-9 border border-outline-variant/40 flex items-center justify-center hover:border-tertiary-fixed/60 hover:text-tertiary-fixed transition-all duration-300" aria-label="Share">
              <Share2 className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary-fixed/80 mb-8">Navigation</h4>
          <ul className="space-y-3.5 text-sm leading-relaxed opacity-70">
            <li><a className="hover:text-tertiary-fixed hover:opacity-100 transition-all duration-300" href="#">Our Rules</a></li>
            <li><a className="hover:text-tertiary-fixed hover:opacity-100 transition-all duration-300" href="#">Fee Schedule</a></li>
            <li><a className="hover:text-tertiary-fixed hover:opacity-100 transition-all duration-300" href="#">Panel of Neutrals</a></li>
            <li><a className="hover:text-tertiary-fixed hover:opacity-100 transition-all duration-300" href="#">Resources &amp; Library</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary-fixed/80 mb-8">Contact Us</h4>
          <ul className="space-y-4 text-sm leading-relaxed opacity-70">
            <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-tertiary-fixed/70" /> Durbar Marg, Kathmandu, Nepal</li>
            <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-tertiary-fixed/70" /> +977 1 4XXXXXX</li>
            <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-tertiary-fixed/70" /> info@niac.org.np</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary-fixed/80 mb-8">Newsletter</h4>
          <p className="text-sm leading-relaxed opacity-60 mb-4">Receive legal updates and ADR insights monthly.</p>
          <div className="group flex border-b border-outline-variant/50 py-2 transition-colors focus-within:border-tertiary-fixed/60">
            <input
              className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-on-primary-container/30"
              placeholder="Email Address"
              type="email"
            />
            <button type="submit" className="text-tertiary-fixed/70 group-focus-within:text-tertiary-fixed transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-8 py-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-50">
            &copy; {new Date().getFullYear()} NIAC &mdash; Nepal International ADR Center. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs opacity-50">
            <a className="hover:text-tertiary-fixed hover:opacity-100 transition-all duration-300" href="#">Privacy Policy</a>
            <a className="hover:text-tertiary-fixed hover:opacity-100 transition-all duration-300" href="#">Terms of Service</a>
            <a className="hover:text-tertiary-fixed hover:opacity-100 transition-all duration-300" href="#">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
