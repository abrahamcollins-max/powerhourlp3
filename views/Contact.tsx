import React from 'react';
import { motion } from 'framer-motion';
import { CyberButton, NeonText } from '../components/CyberComponents';
import { ArrowLeft, Mail } from 'lucide-react';

const ContactSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950 overflow-y-auto custom-scrollbar">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/10 via-slate-950 to-slate-950 min-h-screen" />

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
          <button onClick={onBack} className="flex items-center gap-2 text-cyan-500 hover:text-white transition-colors group">
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
              <span className="hidden md:inline font-cyber">HOME</span>
          </button>
      </div>

      <div className="z-10 w-full max-w-4xl px-6 flex flex-col md:flex-row gap-12 items-center py-20 md:py-0 min-h-screen md:min-h-0">
        
        {/* Info Side */}
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex-1 space-y-8"
        >
             <NeonText color="cyan" size="text-4xl md:text-5xl">GET IN TOUCH</NeonText>
             <p className="text-slate-400 text-lg">
                Have questions about the tournaments or the platform? Our support team is ready to assist you in the arena.
             </p>
             
             <div className="space-y-4">
                <div className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 rounded bg-cyan-900/30 flex items-center justify-center text-cyan-400 border border-cyan-500/30"><Mail /></div>
                    <span>support@powerhourtrader.com</span>
                </div>
             </div>
        </motion.div>

        {/* Form Side */}
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full"
        >
            <div className="bg-slate-900/50 p-6 md:p-8 border border-cyan-500/20 backdrop-blur-md relative">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                <form className="space-y-6">
                    <div>
                        <input type="text" placeholder="NAME" className="w-full bg-slate-950 border border-cyan-900 p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all font-cyber tracking-wider" />
                    </div>
                    <div>
                        <input type="email" placeholder="EMAIL" className="w-full bg-slate-950 border border-cyan-900 p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all font-cyber tracking-wider" />
                    </div>
                    <div>
                        <textarea rows={4} className="w-full bg-slate-950 border border-cyan-900 p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all font-cyber tracking-wider"></textarea>
                    </div>
                    <CyberButton className="w-full">SEND</CyberButton>
                </form>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactSection;