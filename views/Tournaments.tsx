import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Tournament } from '../types';
import { CyberButton, NeonText, TiltCard } from '../components/CyberComponents';
import { ArrowLeft } from 'lucide-react';

const tournamentsData: Tournament[] = [
  { id: '1', name: 'SPY 0DTE', type: 'PPP', ticker: 'SPY', traders: 1000, maxTrade: '10K', start: '9:30 12/20', end: '4:00 12/20', purse: '$50,000', cost: '$50' },
  { id: '2', name: 'SOXL WEEKLY', type: 'PPP', ticker: 'SOXL', traders: 1000, maxTrade: '10K', start: '9:30 12/20', end: '4:00 12/20', purse: '$50,000', cost: '$50' },
  { id: '3', name: 'HOOD SHARES', type: 'GPP', ticker: 'HOOD', traders: 1000, maxTrade: '10K', start: '9:30 12/20', end: '4:00 12/20', purse: '$50,000', cost: '$50' },
  { id: '4', name: 'QQQ DAILY', type: 'PPP', ticker: 'QQQ', traders: 850, maxTrade: '10K', start: '9:30 12/21', end: '4:00 12/21', purse: '$25,000', cost: '$25' },
  { id: '5', name: 'NVDA RALLY', type: 'GPP', ticker: 'NVDA', traders: 1200, maxTrade: '25K', start: '9:30 12/21', end: '4:00 12/21', purse: '$75,000', cost: '$100' },
  { id: '6', name: 'TSLA WEEKLY', type: 'PPP', ticker: 'TSLA', traders: 950, maxTrade: '15K', start: '9:30 12/21', end: '4:00 12/21', purse: '$40,000', cost: '$40' },
];

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const cardVariants: Variants = {
  hidden: { 
    y: 100, 
    opacity: 0, 
    scale: 0.8,
    rotateX: -45 
  },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 15 
    }
  }
};

const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1, 
        transition: { 
            type: "spring", 
            stiffness: 50, 
            damping: 12,
            delay: 0.2 
        } 
    }
};

const infoLeftVariants: Variants = {
    hidden: { x: -100, opacity: 0, filter: "blur(10px)" },
    visible: { 
        x: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 60, delay: 0.6 } 
    }
};

const infoRightVariants: Variants = {
    hidden: { x: 100, opacity: 0, filter: "blur(10px)" },
    visible: { 
        x: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 60, delay: 0.7 } 
    }
};

const TournamentCard: React.FC<{ data: Tournament }> = ({ data }) => {
  const isPPP = data.type === 'PPP';
  const mainColorClass = isPPP ? 'text-cyan-400' : 'text-orange-400';
  const borderColorClass = isPPP ? 'border-cyan-500' : 'border-orange-500';
  const topLineClass = isPPP ? 'bg-cyan-500' : 'bg-orange-500';
  const glowColorHex = isPPP ? '#22d3ee' : '#f97316';
  
  // RGB values for shadow interpolation
  const shadowColor = isPPP ? '34, 211, 238' : '249, 115, 22';
  
  // Subtle gradient background
  const bgGradient = isPPP 
    ? 'bg-[linear-gradient(180deg,rgba(8,145,178,0.1)_0%,rgba(2,6,23,0.95)_100%)]' 
    : 'bg-[linear-gradient(180deg,rgba(234,88,12,0.1)_0%,rgba(2,6,23,0.95)_100%)]';

  return (
    <motion.div
      variants={cardVariants}
      className="relative w-full max-w-[320px] shrink-0 group h-fit"
    >
      <TiltCard className="w-full h-fit">
        {/* Container with preserve-3d to handle depth */}
        <div className="relative w-full" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* LAYER 1: Background, Border, Watermark (Base Level) */}
            <motion.div 
                className={`absolute inset-0 border ${borderColorClass} ${bgGradient} backdrop-blur-md overflow-hidden`}
                style={{ transform: 'translateZ(0px)' }}
                animate={{
                    boxShadow: [
                        `0 0 10px rgba(${shadowColor}, 0.1), inset 0 0 0px rgba(${shadowColor}, 0)`,
                        `0 0 25px rgba(${shadowColor}, 0.3), inset 0 0 10px rgba(${shadowColor}, 0.1)`,
                        `0 0 10px rgba(${shadowColor}, 0.1), inset 0 0 0px rgba(${shadowColor}, 0)`
                    ],
                    borderColor: isPPP ? ['rgba(34, 211, 238, 0.4)', 'rgba(34, 211, 238, 0.8)', 'rgba(34, 211, 238, 0.4)'] 
                                     : ['rgba(249, 115, 22, 0.4)', 'rgba(249, 115, 22, 0.8)', 'rgba(249, 115, 22, 0.4)']
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                whileHover={{
                    boxShadow: `0 0 40px rgba(${shadowColor}, 0.6), inset 0 0 20px rgba(${shadowColor}, 0.2)`,
                    borderColor: `rgba(${shadowColor}, 1)`,
                    transition: { duration: 0.3 }
                }}
            >
                {/* Dynamic Sheen Effect */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 w-[200%]"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                />

                {/* New Pulsing Internal Glow Spot */}
                <motion.div 
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${glowColorHex}40 0%, transparent 60%)`
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Top Decorative Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${topLineClass} shadow-[0_0_10px_currentColor] z-20`} />

                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
                    <span className={`font-cyber text-9xl font-bold ${mainColorClass} scale-150 transform -translate-y-6`}>PHT</span>
                </div>
            </motion.div>

            {/* LAYER 2: Content (Floating Elements) */}
            <div className="relative flex flex-col p-5 pb-6 gap-2" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* Header - Floats significantly */}
                <div className="flex flex-col items-center justify-center mb-4 mt-6 text-center" style={{ transform: 'translateZ(30px)' }}>
                     {/* Title Glow - Backlit Effect */}
                    <motion.div 
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-12 blur-xl opacity-20 ${isPPP ? 'bg-cyan-400' : 'bg-orange-400'} rounded-full -z-10`}
                        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <h3 className={`font-cyber text-2xl ${mainColorClass} uppercase leading-none tracking-wide drop-shadow-md`}>{data.name}</h3>
                    <p className="text-[9px] text-slate-300 font-cyber tracking-widest mt-1.5 uppercase opacity-80">
                        {isPPP ? 'Progressive Prize Purse' : 'Guaranteed Prize Purse'}
                    </p>
                </div>

                {/* Stats List - Floats moderately */}
                <div className="space-y-3" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex justify-between items-center font-rajdhani text-sm font-semibold tracking-wide border-b border-white/5 pb-1 group-hover:border-white/20 transition-colors">
                        <span className="text-slate-500 uppercase">Traders</span>
                        <span className="text-white drop-shadow-sm">{data.traders}</span>
                    </div>
                    <div className="flex justify-between items-center font-rajdhani text-sm font-semibold tracking-wide border-b border-white/5 pb-1 group-hover:border-white/20 transition-colors">
                        <span className="text-slate-500 uppercase">Max/Trade</span>
                        <span className="text-white drop-shadow-sm">{data.maxTrade}</span>
                    </div>
                    <div className="flex justify-between items-center font-rajdhani text-sm font-semibold tracking-wide border-b border-white/5 pb-1 group-hover:border-white/20 transition-colors">
                        <span className="text-slate-500 uppercase">Start</span>
                        <span className="text-white drop-shadow-sm">{data.start}</span>
                    </div>
                    <div className="flex justify-between items-center font-rajdhani text-sm font-semibold tracking-wide border-b border-white/5 pb-1 group-hover:border-white/20 transition-colors">
                        <span className="text-slate-500 uppercase">End</span>
                        <span className="text-white drop-shadow-sm">{data.end}</span>
                    </div>
                </div>

                {/* Footer Area - Floats most */}
                <div className="mt-4 space-y-3" style={{ transform: 'translateZ(40px)' }}>
                    {/* Purse Bar */}
                    <div className="bg-slate-950/80 border-y border-white/10 px-5 py-3 flex justify-between items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-sm hover:bg-slate-900/90 transition-colors">
                        <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Purse</span>
                        <span className="font-cyber text-2xl text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{data.purse}</span>
                    </div>
                    
                    {/* Join Button */}
                    <div>
                        <CyberButton variant={isPPP ? 'primary' : 'gold'} className="w-full shadow-xl text-sm py-2">
                            JOIN {data.cost} USD
                        </CyberButton>
                    </div>
                </div>

            </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// --- New Visual Effect Components ---

const ScannerEffect = () => (
    <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-50 pointer-events-none"
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 1.5, ease: "easeInOut", times: [0, 1] }}
    />
);

const Spotlights = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left Spotlight - Cyan */}
        <motion.div 
            className="absolute -top-[50%] -left-[20%] w-[100vw] h-[200vh] origin-center opacity-20 mix-blend-screen"
            style={{ background: 'conic-gradient(from 180deg at 50% 0%, transparent 45%, cyan 50%, transparent 55%)' }}
            animate={{ rotate: [15, 45, 15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Right Spotlight - Orange */}
        <motion.div 
            className="absolute -top-[50%] -right-[20%] w-[100vw] h-[200vh] origin-center opacity-20 mix-blend-screen"
            style={{ background: 'conic-gradient(from 180deg at 50% 0%, transparent 45%, orange 50%, transparent 55%)' }}
            animate={{ rotate: [-15, -45, -15] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                }}
                animate={{
                    y: [0, -100],
                    opacity: [0, 0.5, 0],
                    scale: [0, 1.5, 0]
                }}
                transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear"
                }}
            />
        ))}
    </div>
);

const TournamentsSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: containerRef });

  // Parallax Values
  const ySpace = useTransform(scrollY, [0, 1000], [0, -150]); 
  const yGrid = useTransform(scrollY, [0, 1000], [0, -250]); 
  const yChart1 = useTransform(scrollY, [0, 1000], [0, -350]); 
  const yChart2 = useTransform(scrollY, [0, 1000], [0, -450]); 

  return (
    <div 
        ref={containerRef}
        className="relative w-full h-full flex flex-col items-center pt-8 overflow-y-auto pb-20 custom-scrollbar"
    >
      <ScannerEffect />
      
      {/* --- BACKGROUND LAYERS --- */}
      {/* Expanded to cover full viewport + movement area */}
      <div className="fixed inset-0 h-[120vh] w-full z-0 overflow-hidden pointer-events-none">
        
        {/* Layer 0: Spotlights & Atmosphere */}
        <Spotlights />

        {/* Layer 1: Deep Space Gradient (Furthest) */}
        <motion.div 
            style={{ y: ySpace }}
            className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/80 via-[#050214] to-slate-950" 
        />

        {/* Layer 2: Digital Grid Floor (Perspective) */}
        {/* Height increased to 100vh to ensure it covers bottom */}
        <motion.div 
            style={{ y: yGrid }}
            className="absolute bottom-[-10%] left-0 right-0 h-[100vh] opacity-30"
        >
            <div 
                className="w-full h-full"
                style={{
                    background: 'linear-gradient(to bottom, transparent 2px, cyan 2px), linear-gradient(to right, cyan 1px, transparent 1px)',
                    backgroundSize: '100% 40px, 40px 100%',
                    transform: 'perspective(1000px) rotateX(60deg) scale(2)',
                    transformOrigin: 'bottom center',
                    maskImage: 'linear-gradient(to bottom, transparent, black 80%)'
                }}
            />
        </motion.div>

        {/* --- Cyberpunk Stock Charts Overlay --- */}
        
        {/* Chart 1: The Bull Run (Cyan/Green - Smooth) */}
        <motion.svg 
            style={{ y: yChart1 }}
            className="absolute bottom-0 left-0 w-full h-[80vh] opacity-30" 
            viewBox="0 0 1000 500" 
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="cyberGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#22d3ee', stopOpacity:0.4}} />
                    <stop offset="100%" style={{stopColor:'#22d3ee', stopOpacity:0}} />
                </linearGradient>
            </defs>
            <path d="M0,500 L0,400 L50,420 L100,350 L150,380 L200,300 L250,320 L300,250 L350,280 L400,200 L450,220 L500,150 L550,180 L600,100 L650,120 L700,50 L750,80 L800,20 L850,40 L900,0 L950,20 L1000,0 V500 Z" fill="url(#cyberGrad1)" />
            <path d="M0,400 L50,420 L100,350 L150,380 L200,300 L250,320 L300,250 L350,280 L400,200 L450,220 L500,150 L550,180 L600,100 L650,120 L700,50 L750,80 L800,20 L850,40 L900,0 L950,20 L1000,0" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>

        {/* Chart 2: The Volatility (Orange/Copper - Jagged) */}
        <motion.svg 
            style={{ y: yChart2 }}
            className="absolute bottom-0 left-0 w-full h-[70vh] opacity-20" 
            viewBox="0 0 1000 500" 
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="cyberGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#f97316', stopOpacity:0.3}} />
                    <stop offset="100%" style={{stopColor:'#f97316', stopOpacity:0}} />
                </linearGradient>
            </defs>
            <path d="M0,500 L0,450 L100,400 L200,480 L300,350 L400,420 L500,300 L600,380 L700,250 L800,320 L900,200 L1000,150 V500 Z" fill="url(#cyberGrad2)" />
            <path d="M0,450 L100,400 L200,480 L300,350 L400,420 L500,300 L600,380 L700,250 L800,320 L900,200 L1000,150" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
        </motion.svg>

      </div>

      <div className="z-10 w-full max-w-7xl px-6 flex flex-col gap-6 md:gap-8 min-h-min justify-start md:justify-center pb-32">
        
        {/* Header Section */}
        <motion.div 
            className="flex flex-col items-center justify-center relative py-4 md:py-6 shrink-0"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="w-full flex items-center justify-between relative z-10">
                <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft /> HUB
                </button>
                
                <div className="text-center px-12 py-4 bg-black/60 border-x-4 border-cyan-500 clip-path-slant shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-xl relative overflow-hidden group">
                     {/* Glitch Overlay */}
                     <motion.div 
                        className="absolute inset-0 bg-cyan-400/20"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.5 }}
                     />
                     <NeonText color="cyan" size="text-3xl md:text-5xl" className="relative z-10">ARENA</NeonText>
                     <p className="text-cyan-300 text-xs tracking-[0.5em] mt-1 relative z-10">LIVE MARKET BATTLEGROUND</p>
                </div>

                <div className="w-24 hidden md:block" /> 
            </div>
        </motion.div>

        {/* Info Cards - Animated Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto w-full relative z-20 shrink-0">
             <motion.div 
                variants={infoLeftVariants}
                initial="hidden"
                animate="visible"
                className="border-l-4 border-cyan-500 bg-slate-900/80 backdrop-blur-md p-4 md:p-6 rounded-r-lg relative overflow-hidden group hover:bg-cyan-900/30 transition-colors shadow-lg"
             >
                <h4 className="font-cyber text-cyan-400 text-xl mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" /> PPP (Progressive)
                </h4>
                <p className="text-sm text-slate-300">Prize grows with each entry. High risk, high reward.</p>
             </motion.div>
             
             <motion.div 
                variants={infoRightVariants}
                initial="hidden"
                animate="visible"
                className="border-l-4 border-orange-500 bg-slate-900/80 backdrop-blur-md p-4 md:p-6 rounded-r-lg relative overflow-hidden group hover:bg-orange-900/30 transition-colors shadow-lg"
             >
                <h4 className="font-cyber text-orange-400 text-xl mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-ping" /> GPP (Guaranteed)
                </h4>
                <p className="text-sm text-slate-300">Stated purse regardless of participation. Reliable winnings.</p>
             </motion.div>
        </div>

        {/* Tournament Grid - Staggered Entrance */}
        <motion.div 
            className="mt-4 md:mt-12 relative z-20 flex-1 flex flex-col justify-start w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div 
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
                className="flex flex-col items-center mb-8 max-w-4xl mx-auto w-full text-center"
            >
                <h3 className="font-cyber text-2xl md:text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-2">FEATURED TOURNAMENTS</h3>
                <button className="text-sm text-cyan-400 hover:text-white font-bold tracking-wider hover:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all uppercase">VIEW ALL</button>
            </motion.div>
            
            <div className="flex flex-wrap items-start justify-center gap-4 md:gap-8 w-full">
                {tournamentsData.map((t) => (
                    <TournamentCard key={t.id} data={t} />
                ))}
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TournamentsSection;