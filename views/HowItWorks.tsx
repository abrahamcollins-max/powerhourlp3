import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HexStep } from '../types';
import { HexContainer, NeonText, TiltCard } from '../components/CyberComponents';
import { UserPlus, TrendingUp, Upload, DollarSign, MessageSquare, Monitor, ArrowUp, ChevronDown, HelpCircle, Zap } from 'lucide-react';

const steps: HexStep[] = [
  { id: 1, title: "SIGN UP & JOIN", description: "Create your account and enter a tournament.", icon: <UserPlus size={32} className="text-yellow-400" /> },
  { id: 2, title: "TRADE YOUR BROKERAGE", description: "Trade your own account within tournament rules.", icon: <Monitor size={32} className="text-cyan-400" /> },
  { id: 3, title: "INPUT PROFITS", description: "Input your daily profits on the PHT platform.", icon: <TrendingUp size={32} className="text-cyan-400" /> },
  { id: 4, title: "CLIMB & CHAT", description: "Climb the leaderboard and chat in the live forum.", icon: <MessageSquare size={32} className="text-cyan-400" /> },
  { id: 5, title: "UPLOAD CONFIRMATION", description: "If you place, upload your trade confirmation.", icon: <Upload size={32} className="text-yellow-400" /> },
  { id: 6, title: "COLLECT PRIZE", description: "Receive your winnings securely.", icon: <DollarSign size={32} className="text-yellow-400" /> },
];

const faqs = [
    { 
        q: "What is a Guaranteed Prize Pool Tournament (GPP)?", 
        a: "A tournament where the purse and rank payouts are known prior to entry" 
    },
    { 
        q: "What is a Progressive Tournament?", 
        a: "A tournament where each entry fee grows the total purse. Rank payouts are a percentage of the purse." 
    },
    { 
        q: "Why can’t I enter a Progressive Tournament?", 
        a: "PHT may prohibit progressive tournament user entry to comply with USA state and foreign domicile legal requirements. Allowed entry locations are subject to change as deemed appropriate." 
    },
    { 
        q: "What are PHT credits and how can they be used?", 
        a: "PHT credits are the local currency of the platform. Credits are earned based on your VIP level, platform rewards, rankings and total winnings. Credits can be used to pay entry fees into GPP tournaments only. Credits cannot be redeemed for USD or withdrawn from the platform." 
    },
    {
        q: "What are tournament rules?",
        a: "Tournament rules include the security to be traded, timeframe of the tournament and the max dollar amount allowed to enter a trade. There are no limits on the number of trades that can be placed during the tournament. Both winning and losing trades complying with tournament rules will count towards your total profit. Winners are determined by total profit only. The number of trades has no bearing on your tournament rank."
    },
    {
        q: "What is the deadline to join or withdraw from a tournament?",
        a: "You can join and withdraw from a tournament any time prior to the stated enrollment deadline. When you successfully withdraw from a tournament, you will receive a full refund credited to your wallet. Traders may not withdraw after the enrollment deadline. All entry fees are final and non-refundable."
    },
    { 
        q: "When must I complete my KYC (Know Your Customer)?", 
        a: "KYC is not needed to compete in a tournament but is required for trade verification and must be completed for prize eligibility." 
    },
    { 
        q: "How is my trade data “verified”?", 
        a: "Trade verification authenticates your stated profits during a live tournament with trades from your brokerage statement. PHT’s proprietary AI automation with fraud detection ensures that trade confirmations are real and have not been fabricated or altered to protect the integrity of the platform." 
    },
    { 
        q: "What constitutes a trade confirmation?", 
        a: "A daily trade statement from your broker showing your name that matches your KYC ID provided. PHT is serious about data security and encrypts all user personal information for KYC purposes. Please black-out your account number when sending us your trade confirmation. For corporate or trust entities, proof of ownership or trading authorization is required in your KYC." 
    },
    {
        q: "What is the trade confirmation upload deadline?",
        a: "4 hours after the end time of the tournament. This deadline is subject to change."
    },
    {
        q: "What is the “verified” leaderboard?",
        a: "The “verified” leaderboard including rank and prizes is posted the following business day after the end of a tournament for all verified entrants."
    }
];

// Component for a single circuit trace line
const CircuitTrace: React.FC<{ 
    path: string; 
    delay: number; 
    duration: number; 
    color: string;
    width?: number;
}> = ({ path, delay, duration, color, width = 2 }) => {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {/* Background Path (Darker) */}
            <path d={path} fill="none" stroke={color} strokeWidth={width} strokeOpacity="0.1" />
            
            {/* Pulse Animation */}
            <motion.path 
                d={path} 
                fill="none" 
                stroke={color} 
                strokeWidth={width * 1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                transition={{ 
                    duration: duration, 
                    repeat: Infinity, 
                    delay: delay,
                    ease: "easeInOut"
                }}
            />
        </svg>
    );
};

const HowItWorksSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (steps.length + 1)); 
    }, 1500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center pt-8 bg-slate-950 overflow-y-auto pb-20 custom-scrollbar">
      
      {/* --- MAINFRAME CORE BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050914] overflow-hidden">
        
        {/* Deep Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#050914] to-black opacity-90" />

        {/* Tech Grid Pattern (Static) */}
        <div 
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: `
                    linear-gradient(to right, #22d3ee 1px, transparent 1px),
                    linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
                maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
            }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-900/10 blur-[120px] rounded-full" />

        {/* Animated Circuit Traces - Right Side */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
            <CircuitTrace path="M 100 0 V 100 L 50 150 V 300" delay={0} duration={3} color="#22d3ee" />
            <CircuitTrace path="M 200 0 V 200 L 100 300 V 600" delay={1} duration={4} color="#22d3ee" />
            <CircuitTrace path="M 50 0 V 50 H 150 V 150" delay={2} duration={5} color="#fbbf24" /> {/* Gold trace */}
        </div>

        {/* Animated Circuit Traces - Left Side (Mirrored logic via coordinates) */}
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-30 scale-x-[-1]">
            <CircuitTrace path="M 100 0 V 100 L 50 150 V 300" delay={1.5} duration={3} color="#22d3ee" />
            <CircuitTrace path="M 300 0 V 400 L 200 500 V 800" delay={0.5} duration={6} color="#22d3ee" />
            <CircuitTrace path="M 150 0 V 150 H 50 V 300" delay={3} duration={4} color="#fbbf24" />
        </div>

        {/* Connecting Nodes (Pulsing Dots) */}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyan-400 box-shadow-[0_0_10px_#22d3ee]"
                style={{
                    top: Math.random() * 80 + 10 + '%',
                    left: Math.random() * 80 + 10 + '%',
                }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
            />
        ))}

      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
          <button onClick={onBack} className="flex flex-col items-center text-yellow-500 hover:text-white transition-colors">
              <ArrowUp size={32} />
              <span className="text-xs">HOME</span>
          </button>
      </div>

      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center mb-20">
        
        <div className="flex items-center gap-4 mb-16 mt-8 relative z-10">
            <Zap className="text-cyan-400 w-10 h-10 animate-bounce" />
            <NeonText color="cyan" size="text-4xl md:text-6xl" className="text-center">HOW PHT WORKS</NeonText>
            <Zap className="text-cyan-400 w-10 h-10 animate-bounce" />
        </div>

        {/* Creative Floating Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-32">
            {steps.map((step, index) => {
                const borderColor = index === 0 || index === steps.length - 1 ? 'yellow' : 'cyan';
                const isActive = activeStep === index;
                const floatDuration = 4 + index * 0.5;
                const floatDelay = index * 0.2;

                return (
                    <motion.div
                        key={step.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1, type: 'spring' }}
                        className="relative group z-10 w-64 h-72 mx-auto"
                    >
                         <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
                            className="w-full h-full relative"
                         >
                            <div className={`
                                absolute -top-6 left-1/2 -translate-x-1/2 z-30 w-12 h-12 rounded-full 
                                flex items-center justify-center font-cyber font-bold text-xl 
                                bg-slate-900 border-2 transition-colors duration-500
                                ${isActive ? `border-${borderColor}-400 text-${borderColor}-400 shadow-[0_0_20px_currentColor]` : `border-${borderColor}-500 text-white`}
                                shadow-lg
                            `}>
                                {step.id}
                            </div>

                            <TiltCard className="w-full h-full">
                                <HexContainer borderColor={borderColor} className="transition-transform duration-300" active={isActive}>
                                    <div className={`mb-6 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                                        {step.icon}
                                    </div>
                                    <h4 className={`font-cyber text-lg leading-tight mb-3 px-4 transition-colors duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : (borderColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400')}`}>
                                        {step.title}
                                    </h4>
                                    <p className="text-sm text-slate-300 font-rajdhani leading-snug px-2">
                                        {step.description}
                                    </p>
                                </HexContainer>
                            </TiltCard>

                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-4 bg-cyan-500/20 blur-xl rounded-[100%] opacity-40" />
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>

        {/* FAQs Section */}
        <div className="w-full max-w-3xl flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
                <HelpCircle className="text-cyan-400" />
                <NeonText color="cyan" size="text-3xl">FAQs</NeonText>
            </div>
            
            <div className="w-full space-y-4">
                {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                        <div key={idx} className="w-full border border-slate-800 bg-slate-900/50 backdrop-blur-md rounded overflow-hidden">
                            <button 
                                onClick={() => setOpenFaq(isOpen ? null : idx)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                            >
                                <span className="font-cyber text-left text-white text-lg tracking-wide">{faq.q}</span>
                                <ChevronDown className={`text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <motion.div 
                                initial={false}
                                animate={{ height: isOpen ? 'auto' : 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 pt-0 text-slate-400 font-rajdhani text-lg leading-relaxed border-t border-slate-800/50">
                                    {faq.a}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorksSection;