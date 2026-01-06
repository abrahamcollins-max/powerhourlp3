import React, { useEffect, useRef } from 'react';
import { ViewState } from '../types';
import { ThreeDBullLogo } from '../components/ThreeDModels';
import { ChevronLeft, ChevronRight, Trophy, TrendingUp, DollarSign, Target, Cpu, Swords, CandlestickChart } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const TradingViewWidget = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
          { "proName": "FOREXCOM:NSXUSD", "title": "US 100" },
          { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
          { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
          { "description": "NVIDIA", "proName": "NASDAQ:NVDA" },
          { "description": "TESLA", "proName": "NASDAQ:TSLA" },
          { "description": "APPLE", "proName": "NASDAQ:AAPL" }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "adaptive",
        "colorTheme": "dark",
        "locale": "en"
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container w-full h-full" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Central Content - Main Wrapper */}
      {/* Adjusted margin to be safer on mobile */}
      <div className="z-10 flex flex-col items-center text-center relative mb-16 md:mb-24 mt-[-5vh] md:mt-[-8vh]">
        
        {/* Main Title & Tagline */}
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 md:mb-12 relative flex flex-col items-center"
        >
            <div className="absolute inset-0 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Main Heading - Sharper, Impactful, Orbitron Font */}
            <h1 className="font-cyber text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter relative z-10 flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-6 leading-none">
                <span 
                  className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_2px_0px_rgba(0,0,0,0.5)]"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.3))' }}
                >
                  POWERHOUR
                </span>
                <span 
                  className="bg-clip-text text-transparent bg-gradient-to-b from-[#ffcf96] via-[#d97706] to-[#7c2d12] drop-shadow-[0_2px_0px_rgba(0,0,0,0.5)]"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(234,88,12,0.4))' }}
                >
                  TRADER
                </span>
            </h1>
            
            {/* Tagline */}
            <p className="mt-4 md:mt-6 font-rajdhani font-bold tracking-[0.4em] md:tracking-[0.6em] text-orange-400 text-xs sm:text-sm md:text-xl uppercase drop-shadow-md relative z-20 bg-gradient-to-r from-transparent via-black/40 to-transparent px-8 py-1 text-center">
                Where Players Are Made
            </p>
        </motion.div>

        {/* 3D Elements Row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 xl:gap-40 relative w-full">
            
            {/* Left Wing - Tournament Text - Visible only on large screens - CENTERED */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:flex flex-col gap-6 text-center items-center justify-start h-[350px] pt-12 z-20 min-w-[280px]"
            >
                <h3 className="text-white font-cyber text-xl border-b border-cyan-500/50 pb-2 mb-2 w-full shadow-[0_4px_10px_-4px_rgba(6,182,212,0.5)] text-center">Daily & Weekly Tournaments</h3>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center gap-3 text-cyan-300 hover:text-white transition-colors cursor-default text-lg font-bold tracking-widest">
                        <span className="drop-shadow-[0_0_5px_rgba(103,232,249,0.8)]">STOCKS</span> <TrendingUp size={24} className="text-cyan-400" />
                    </div>
                    <div className="flex items-center justify-center gap-3 text-cyan-300 hover:text-white transition-colors cursor-default text-lg font-bold tracking-widest">
                        <span className="drop-shadow-[0_0_5px_rgba(103,232,249,0.8)]">OPTIONS</span> <DollarSign size={24} className="text-cyan-400" />
                    </div>
                    <div className="flex items-center justify-center gap-3 text-cyan-300 hover:text-white transition-colors cursor-default text-lg font-bold tracking-widest">
                        <span className="drop-shadow-[0_0_5px_rgba(103,232,249,0.8)]">ETFs</span> <Trophy size={24} className="text-cyan-400" />
                    </div>
                </div>
            </motion.div>

            {/* Center - 3D Logo */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                className="relative flex items-center justify-center z-10"
            >
                {/* Glow - Copper/Blue mix */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-orange-900/20 to-transparent blur-[60px] pointer-events-none" />
                
                {/* Scale is 1.62 */}
                <ThreeDBullLogo scale={1.62} />
            </motion.div>

            {/* Right Wing - Brokerage Text - Visible only on large screens */}
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:flex flex-col items-center justify-start h-[350px] pt-12 z-20 min-w-[280px]"
            >
                <div className="relative group text-center">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="border-l-2 border-orange-500 bg-slate-900/40 p-6 backdrop-blur-md relative max-w-xs flex flex-col items-center">
                        <CandlestickChart className="text-orange-400 mb-4 w-12 h-12" />
                        <h3 className="font-cyber text-2xl text-white leading-tight mb-2">
                            TRADING TOURNAMENTS
                        </h3>
                         <p className="text-orange-400 font-bold tracking-wider text-lg">
                            FROM YOUR OWN BROKERAGE
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Mobile View - Text under logo */}
        <div className="lg:hidden mt-8 flex flex-col items-center px-6 gap-6">
             <div className="border border-cyan-500/30 bg-slate-900/60 p-3 sm:p-4 rounded backdrop-blur-sm text-center w-64">
                 <p className="font-cyber text-white text-base sm:text-lg leading-tight mb-2">Daily & Weekly</p>
                 <div className="flex justify-center gap-2 text-xs text-cyan-300 font-bold tracking-wider">
                    <span>STOCKS</span> • <span>OPTIONS</span> • <span>ETFs</span>
                 </div>
             </div>
             <div className="border border-orange-500/30 bg-slate-900/60 p-3 sm:p-4 rounded backdrop-blur-sm text-center w-64">
                 <p className="font-cyber text-white text-base sm:text-lg leading-tight">
                    TRADING TOURNAMENTS<br/>
                    <span className="text-orange-400 text-sm sm:text-base">FROM YOUR OWN BROKERAGE</span>
                 </p>
             </div>
        </div>

      </div>

      {/* --- PROFESSIONAL HUD SIDE TRIGGERS --- */}

      {/* Left: HOW IT WORKS - Visible on medium+ */}
      <motion.button
        onClick={() => onNavigate(ViewState.HOW_IT_WORKS)}
        className="absolute left-0 top-[15%] -translate-y-1/2 z-40 group hidden md:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
         <div className="relative h-[600px] w-16 md:w-24 flex items-center justify-start overflow-hidden transition-all duration-300 hover:w-24 md:hover:w-32 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
            {/* The Main Shape */}
            <div 
                className="absolute inset-y-0 left-0 w-full bg-slate-950/90 backdrop-blur-xl border-r-4 border-cyan-500/50 group-hover:border-cyan-400 group-hover:bg-slate-900 transition-all"
                style={{ clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0 100%)' }}
            />
            
            {/* Inner Decoration Line */}
            <div 
                className="absolute top-[15%] bottom-[15%] right-4 w-[2px] bg-cyan-500/20 group-hover:bg-cyan-400/50 transition-colors"
            />

            {/* Content Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-between py-16 text-cyan-500 group-hover:text-cyan-300 transition-colors">
                 <ChevronLeft size={48} className="animate-pulse" />
                 
                 <div className="flex-1 flex items-center justify-center w-full">
                     <span 
                        className="whitespace-nowrap font-cyber font-bold tracking-[0.3em] text-lg md:text-2xl opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                     >
                        HOW IT WORKS
                     </span>
                 </div>

                 <Cpu size={32} className="opacity-50 group-hover:opacity-100" />
            </div>
         </div>
      </motion.button>
      
      {/* Mobile Left Trigger */}
      <motion.button
        onClick={() => onNavigate(ViewState.HOW_IT_WORKS)}
        className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-40 group"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-center bg-slate-900/80 backdrop-blur-md border-r-2 border-y border-cyan-500/50 py-4 pr-1 pl-1 rounded-r-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-slate-800 transition-colors h-32 sm:h-48">
             <ChevronLeft className="text-cyan-400 w-5 h-5 animate-pulse" />
             <span 
                className="text-cyan-400 font-cyber font-bold text-[10px] tracking-widest mt-1"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
             >
                HOW IT WORKS
             </span>
        </div>
      </motion.button>


      {/* Right: ARENA - Visible on medium+ */}
      <motion.button
        onClick={() => onNavigate(ViewState.TOURNAMENTS)}
        className="absolute right-0 top-[15%] -translate-y-1/2 z-40 group hidden md:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
         <div className="relative h-[600px] w-16 md:w-24 flex items-center justify-end overflow-hidden transition-all duration-300 hover:w-24 md:hover:w-32 group-hover:drop-shadow-[0_0_25px_rgba(249,115,22,0.6)]">
            {/* The Main Shape */}
            <div 
                className="absolute inset-y-0 right-0 w-full bg-slate-950/90 backdrop-blur-xl border-l-4 border-orange-500/50 group-hover:border-orange-400 group-hover:bg-slate-900 transition-all"
                style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 90%)' }}
            />

            {/* Inner Decoration Line */}
            <div 
                className="absolute top-[15%] bottom-[15%] left-4 w-[2px] bg-orange-500/20 group-hover:bg-orange-400/50 transition-colors"
            />

            {/* Content Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-between py-16 text-orange-500 group-hover:text-orange-300 transition-colors">
                 <ChevronRight size={48} className="animate-pulse" />
                 
                 <div className="flex-1 flex items-center justify-center w-full">
                     <span 
                        className="whitespace-nowrap font-cyber font-bold tracking-[0.3em] text-lg md:text-2xl opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                     >
                        ENTER ARENA
                     </span>
                 </div>

                 <Swords size={32} className="opacity-50 group-hover:opacity-100" />
            </div>
         </div>
      </motion.button>
      
      {/* Mobile Right Trigger */}
      <motion.button
        onClick={() => onNavigate(ViewState.TOURNAMENTS)}
        className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-40 group"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-center bg-slate-900/80 backdrop-blur-md border-l-2 border-y border-orange-500/50 py-4 pl-1 pr-1 rounded-l-xl shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:bg-slate-800 transition-colors h-32 sm:h-48">
             <span 
                className="text-orange-400 font-cyber font-bold text-[10px] tracking-widest mb-1"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
             >
                ARENA
             </span>
             <ChevronRight className="text-orange-400 w-5 h-5 animate-pulse" />
        </div>
      </motion.button>


      {/* Bottom: JOIN THE RANKS */}
      <motion.div 
        className="absolute bottom-12 left-0 right-0 z-40 flex flex-col items-center justify-center pointer-events-none"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
          {/* Button is pointer-events-auto */}
          <button 
            onClick={() => onNavigate(ViewState.CONTACT)} // Mapping to Contact as a "Join" action
            className="pointer-events-auto group relative mb-3"
          >
              <div className="absolute -inset-4 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div 
                className="relative bg-slate-900 border-2 border-orange-500 hover:border-white text-orange-400 hover:text-white px-8 md:px-16 py-3 md:py-4 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] flex items-center gap-3"
                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
              >
                  <Target className="animate-pulse w-5 h-5 md:w-6 md:h-6" />
                  <span className="font-cyber text-lg md:text-2xl font-bold tracking-[0.2em] shadow-black drop-shadow-lg whitespace-nowrap">JOIN THE RANKS</span>
              </div>
          </button>
          
          <div className="bg-black/80 backdrop-blur-sm px-4 md:px-8 py-2 border-x border-cyan-500/30 skew-x-[-20deg] max-w-[90%] md:max-w-none text-center pointer-events-auto mb-4">
             <p className="text-cyan-400 font-rajdhani font-bold tracking-wider text-xs md:text-lg uppercase skew-x-[20deg]">
                Join & Receive <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">Free PHT</span> To Enter $USD Prize Tournaments
             </p>
          </div>
      </motion.div>

      {/* --- Ticker Tape --- */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/90 border-t border-cyan-500/30 z-20 overflow-hidden flex items-center">
         <TradingViewWidget />
      </div>

      {/* Background HUD decorations */}
      <div className="absolute bottom-32 left-12 hidden lg:block opacity-20 pointer-events-none">
        <Target size={56} className="text-cyan-500" />
      </div>

    </div>
  );
};

export default HeroSection;