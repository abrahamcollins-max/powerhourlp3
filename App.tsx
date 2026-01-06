import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewState } from './types';
import HeroSection from './views/Hero';
import TournamentsSection from './views/Tournaments';
import HowItWorksSection from './views/HowItWorks';
import ContactSection from './views/Contact';
import { Menu, X } from 'lucide-react';
import { SocialIconsBar } from './components/CyberComponents';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HERO);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation Handlers
  const goLeft = () => setCurrentView(ViewState.TOURNAMENTS);
  const goRight = () => setCurrentView(ViewState.CONTACT);
  const goDown = () => setCurrentView(ViewState.HOW_IT_WORKS);
  const goHome = () => setCurrentView(ViewState.HERO);

  const getTransition = () => {
    return { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] };
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case ViewState.TOURNAMENTS:
        return <TournamentsSection onBack={goHome} />;
      case ViewState.HOW_IT_WORKS:
        return <HowItWorksSection onBack={goHome} />;
      case ViewState.CONTACT:
        return <ContactSection onBack={goHome} />;
      case ViewState.HERO:
      default:
        return <HeroSection onNavigate={setCurrentView} />;
    }
  };

  const navButtonClass = "px-6 py-2 border border-cyan-800 bg-slate-900/80 text-cyan-400 font-cyber text-xs uppercase tracking-wider hover:bg-cyan-900/50 hover:text-white transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)] h-10 min-w-[120px] flex items-center justify-center";

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden text-white selection:bg-cyan-500/30 flex justify-center bg-black">
      
      {/* Wrapper to constrain max width on huge monitors */}
      <div className="relative w-full h-full max-w-[1920px] mx-auto shadow-2xl overflow-hidden">

        {/* --- Global Atmosphere & Effects --- */}
        
        {/* 1. Film Grain / Digital Noise Overlay */}
        <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-overlay fixed">
          <svg className='w-full h-full'>
            <filter id='noiseFilter'>
              <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>
            </filter>
            <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
          </svg>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Grid Floor */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(8,145,178,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(8,145,178,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" style={{ transform: 'perspective(500px) rotateX(60deg) scale(2)' }} />
          {/* Ambient Glows */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-600/20 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-orange-600/20 blur-[100px]" />
        </div>

        {/* --- Top Navigation Bar --- */}
        <nav className="absolute top-0 left-0 right-0 z-50 py-2 md:py-4 px-4 md:px-8 flex items-center justify-between h-20 md:h-28 transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-4 cursor-pointer z-10 shrink-0" onClick={goHome}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="https://i.ibb.co/q3QdH7qb/logo-PHT.png" 
                alt="PowerHourTrader" 
                className="h-12 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-300" 
              />
            </div>
          </div>

          {/* Center: Desktop Links (Visible on XL+, Absolute Center) */}
          {/* Tightened gap on XL, expanded on 2XL+ to prevent overlap */}
          <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-6 min-[1600px]:gap-12 font-cyber tracking-widest text-sm z-0">
            <button onClick={goDown} className="hover:text-cyan-400 transition-colors hover:scale-105 transform duration-200">How It Works</button>
            <button onClick={goLeft} className="hover:text-cyan-400 transition-colors hover:scale-105 transform duration-200">Tournaments</button>
            <button onClick={goRight} className="hover:text-cyan-400 transition-colors hover:scale-105 transform duration-200">Contact Us</button>
          </div>

          {/* Right: Socials, Auth, Mobile Toggle */}
          <div className="flex items-center gap-4 md:gap-6 z-10 shrink-0">
             
             {/* Desktop Buttons & Socials Container */}
             <div className="hidden md:flex items-center gap-4 lg:gap-6">
                 {/* Socials - Only show on very wide screens (1600px+) to prevent overlap with Center Links */}
                 <div className="hidden min-[1600px]:block scale-75 origin-right">
                    <SocialIconsBar />
                 </div>

                 {/* Divider - Only visible if socials are visible */}
                 <div className="hidden min-[1600px]:block h-8 w-px bg-white/20 mx-2" />

                 <button className={navButtonClass}>
                   Log In
                 </button>
                 <button className={navButtonClass}>
                   Join The Ranks
                 </button>
             </div>

             {/* Mobile/Tablet/Compact Desktop Menu Toggle */}
             {/* Visible up to 1600px (when socials appear in header) to ensure socials are accessible via menu */}
             <div className="flex items-center gap-4 min-[1600px]:hidden">
                  {/* Show simple Login on mobile/tablet */}
                  <button className="md:hidden text-cyan-400 font-cyber text-xs uppercase tracking-wider hover:text-white">
                      Log In
                  </button>
                  <button className="text-cyan-400 z-10 p-2 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <AnimatePresence mode='wait'>
                        {isMenuOpen ? (
                            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                                <X size={28} />
                            </motion.div>
                        ) : (
                            <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                                <Menu size={28} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </button>
             </div>
          </div>

        </nav>

        {/* --- Mobile Menu Overlay --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[90] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 min-[1600px]:hidden"
            >
               <button onClick={() => { goHome(); setIsMenuOpen(false); }} className="text-3xl font-cyber text-white hover:text-cyan-400 transition-colors">HOME</button>
               
               <div className="h-px w-16 bg-white/10" />

               <button onClick={() => { goDown(); setIsMenuOpen(false); }} className="text-2xl font-cyber text-slate-300 hover:text-white transition-colors">How It Works</button>
               <button onClick={() => { goLeft(); setIsMenuOpen(false); }} className="text-2xl font-cyber text-slate-300 hover:text-white transition-colors">Tournaments</button>
               <button onClick={() => { goRight(); setIsMenuOpen(false); }} className="text-2xl font-cyber text-slate-300 hover:text-white transition-colors">Contact</button>
               
               <div className="h-px w-16 bg-white/10" />
               
               {/* Mobile Socials - Visible in menu when hidden in header */}
               <div className="scale-90">
                 <SocialIconsBar />
               </div>

               <button className="text-xl font-cyber text-yellow-400 border border-yellow-500/50 px-6 py-2">Join The Ranks</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Main Content Area --- */}
        <main className="relative w-full h-full pt-20 md:pt-28 transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={getTransition()}
              className="w-full h-full"
            >
              {renderCurrentView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
