import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';

// A button with cut corners
export const CyberButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold';
  className?: string;
}> = ({ children, onClick, variant = 'primary', className = '' }) => {
  
  const colors = {
    primary: 'bg-cyan-900/40 border-cyan-500 text-cyan-100 hover:bg-cyan-800/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]',
    secondary: 'bg-slate-900/40 border-slate-500 text-slate-100 hover:bg-slate-800/60',
    gold: 'bg-yellow-900/40 border-yellow-500 text-yellow-100 hover:bg-yellow-800/60 hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative px-6 py-2 border-2 font-cyber font-bold tracking-wider uppercase
        ${colors[variant]}
        ${className}
      `}
      style={{
        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
      }}
    >
      {children}
    </motion.button>
  );
};

// A hexagonal container with Glassmorphism
export const HexContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  active?: boolean;
}> = ({ children, className = '', borderColor = 'cyan', active = false }) => {
  
  const activeClass = active 
    ? `shadow-[0_0_30px_rgba(${borderColor === 'cyan' ? '34,211,238' : '234,179,8'},0.5)] bg-slate-800/60`
    : 'bg-slate-900/40';

  const borderClass = active 
    ? `border-${borderColor}-400`
    : `border-white/20`; // Glassmorphism subtle border when inactive

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        {/* Hexagon Shape */}
        <div 
            className={`
                absolute inset-0 backdrop-blur-md border-2 
                transition-all duration-500 ease-in-out
                ${activeClass} ${borderClass}
            `}
            style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                zIndex: 0,
                mixBlendMode: active ? 'normal' : 'overlay' // Glassmorphism enhancement
            }}
        />
        
        {/* Active Glow inner */}
        {active && (
            <div 
                className={`absolute inset-0 opacity-50 bg-${borderColor}-500/20 blur-md transition-opacity duration-500`}
                style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    zIndex: -1
                }}
            />
        )}

        {/* Inner Content */}
        <div className="relative z-10 p-6 text-center flex flex-col items-center justify-center h-full w-full">
            {children}
        </div>
    </div>
  );
};

export const NeonText: React.FC<{ children: React.ReactNode; color?: 'cyan' | 'gold' | 'magenta'; size?: string, className?: string }> = ({ 
  children, 
  color = 'cyan',
  size = 'text-xl',
  className = ''
}) => {
  const shadows = {
    cyan: 'drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]',
    gold: 'drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]',
    magenta: 'drop-shadow-[0_0_5px_rgba(232,121,249,0.8)]'
  };
  
  const textColors = {
    cyan: 'text-cyan-400',
    gold: 'text-yellow-400',
    magenta: 'text-fuchsia-400'
  };

  return (
    <span className={`${textColors[color]} ${shadows[color]} ${size} font-cyber ${className}`}>
      {children}
    </span>
  );
};

export const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]); // Increased slightly for better effect
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
        ref={ref}
        style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`perspective-container ${className}`}
    >
        {/* We do NOT enforce a default translateZ here, letting children decide depth, 
            but we add a subtle glare effect overlay */}
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
            
            {children}

            {/* Dynamic Glare Overlay */}
            <motion.div 
                className="absolute inset-0 pointer-events-none rounded-xl z-50"
                style={{
                    background: useMotionTemplate`radial-gradient(
                        circle at ${useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])}, 
                        rgba(255,255,255,0.08) 0%, 
                        transparent 50%
                    )`,
                    opacity: useTransform(useSpring(useTransform([mouseX, mouseY], ([x, y]) => Math.abs(x) + Math.abs(y))), [0, 1], [0, 1])
                }}
            />
        </div>
    </motion.div>
  );
};

export const SocialIconsBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Hex color codes for neon glow
  const icons = [
    { 
      name: 'FACEBOOK', 
      color: '#3b82f6', // Bright Blue
      path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' 
    },
    { 
      name: 'INSTAGRAM', 
      color: '#ec4899', // Pink
      path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M16 2H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4z' 
    },
    { 
      name: 'X', 
      color: '#ffffff', // White
      path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' 
    },
    { 
      name: 'DISCORD', 
      color: '#818cf8', // Indigo
      path: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' 
    },
    { 
      name: 'YOUTUBE', 
      color: '#ff0000', // YouTube Red
      path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' 
    },
  ];

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {icons.map((icon) => {
        const isHovered = hoveredIcon === icon.name;
        
        return (
          <motion.a 
            key={icon.name} 
            href="#" 
            className="group relative flex items-center justify-center p-2 transition-all duration-300"
            onHoverStart={() => setHoveredIcon(icon.name)}
            onHoverEnd={() => setHoveredIcon(null)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
             {/* Icon with Neon Drop-Shadow Filter on Hover */}
             <svg 
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
                fill="currentColor" 
                className="relative z-10 w-6 h-6 md:w-8 md:h-8 transition-all duration-300"
                style={{
                    color: isHovered ? icon.color : '#64748b', // Slate-500 default
                    filter: isHovered 
                        ? `drop-shadow(0 0 8px ${icon.color}) drop-shadow(0 0 15px ${icon.color})` 
                        : 'none'
                }}
              >
                <path d={icon.path} />
             </svg>
             
             {/* Background glow spot (subtle ambient light) */}
             <div 
                className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-30"
                style={{ backgroundColor: icon.color }}
             />
          </motion.a>
        );
      })}
    </div>
  )
}