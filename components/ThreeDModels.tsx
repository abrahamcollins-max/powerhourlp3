import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame } from 'framer-motion';

// --- The 3D Bull Logo (Updated with New Image & Realistic Physics) ---
export const ThreeDBullLogo: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  // Mouse tracking state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position (-0.5 to 0.5)
      const xPct = (e.clientX / window.innerWidth) - 0.5;
      const yPct = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Realistic heavy physics (low stiffness, reasonable damping)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 60, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 60, damping: 15 });
  
  // Parallax translation for impact
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), { stiffness: 60, damping: 15 });
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), { stiffness: 60, damping: 15 });

  return (
    <div className="perspective-container w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center flex-col z-50">
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          rotateX,
          rotateY,
          x: moveX,
          y: moveY,
          scale
        }}
        initial={{ scale: 0, opacity: 0, rotateY: 180 }}
        animate={{ scale: scale, opacity: 1, rotateY: 0 }}
        transition={{ 
            type: "spring", 
            stiffness: 50, 
            damping: 15, 
            delay: 0.2,
            scale: { duration: 0.5 } // Smooth scale impact
        }}
      >
        {/* Intense Core Glow - Copper/Blue Mix */}
        <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-500/30 blur-[100px] rounded-full mix-blend-screen" 
            style={{ transform: 'translateZ(-80px)' }}
            animate={{ 
                opacity: [0.3, 0.6, 0.3], 
                scale: [1, 1.1, 1] 
            }}
            transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
        />
        
        {/* Dynamic Shadow that moves opposite to light source/logo */}
        <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-black/80 blur-[40px] rounded-full"
             style={{ 
                 transform: 'translateZ(-100px)',
                 x: useTransform(mouseX, [-0.5, 0.5], [40, -40]),
                 y: useTransform(mouseY, [-0.5, 0.5], [40, -40])
             }}
        />

        {/* Main Logo Image - High Quality with Pulsing Copper Glow */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(30px)' }}>
             <motion.img 
                src="https://i.ibb.co/XkkTGmf1/PHT-3-D-Bull-Logo-Realistic-02-DEC2025-No-Background.png" 
                alt="PHT Realistic Bull Logo" 
                className="w-full h-full object-contain"
                initial={{ filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 0px rgba(234,88,12,0)) contrast(1.25) saturate(1.1)" }}
                animate={{ 
                    filter: [
                        "drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 0px rgba(234,88,12,0)) contrast(1.25) saturate(1.1)",
                        "drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(234,88,12,0.3)) contrast(1.25) saturate(1.1)",
                        "drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 0px rgba(234,88,12,0)) contrast(1.25) saturate(1.1)"
                    ]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
             />
        </div>
        
        {/* Depth Layer for volumetric feel */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 blur-[1px]" style={{ transform: 'translateZ(-20px) scale(0.95)' }}>
             <img 
                src="https://i.ibb.co/XkkTGmf1/PHT-3-D-Bull-Logo-Realistic-02-DEC2025-No-Background.png" 
                alt="Depth Layer" 
                className="w-full h-full object-contain brightness-0 invert opacity-20" // Silhouette effect for depth
             />
        </div>

      </motion.div>

      {/* --- Reflection Floor --- */}
      <motion.div
        className="relative w-full h-full preserve-3d opacity-20 blur-md pointer-events-none"
        style={{
          rotateX: useTransform(rotateX, (v) => -v), // Mirror rotation roughly
          rotateY,
          scale,
          marginTop: -60 * scale, // Adjust based on scale (reduced for smaller screens)
          transformOrigin: 'top center'
        }}
      >
        <div 
             className="absolute inset-0 flex items-center justify-center" 
             style={{ 
                 transform: 'scaleY(-1)', 
                 maskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)',
                 WebkitMaskImage: 'linear-gradient(to top, transparent 20%, black 80%)' 
             }}
        >
             <img 
                src="https://i.ibb.co/XkkTGmf1/PHT-3-D-Bull-Logo-Realistic-02-DEC2025-No-Background.png" 
                alt="Reflection" 
                className="w-full h-full object-contain"
             />
        </div>
      </motion.div>

    </div>
  );
};

// --- The 3D Coin (Updated with Reflection) ---
export const ThreeDCoin: React.FC = () => {
    // Continuous rotation
    const [rotation, setRotation] = useState(0);

    useAnimationFrame((t) => {
        setRotation(t / 20); // Speed control
    });

    return (
        <div className="perspective-container w-32 h-48 md:w-40 md:h-64 flex flex-col items-center">
            <motion.div
                className="w-24 h-24 md:w-32 md:h-32 relative preserve-3d z-10"
                style={{ rotateY: rotation }}
            >
                {/* Coin Front */}
                <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 flex items-center justify-center border-4 border-yellow-200 backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-dashed border-yellow-900/50 flex items-center justify-center">
                        <span className="font-cyber font-black text-2xl md:text-3xl text-yellow-900 drop-shadow-md">PHT</span>
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
                </div>

                {/* Coin Back */}
                <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 flex items-center justify-center border-4 border-yellow-200"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                     <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-dashed border-yellow-900/50 flex items-center justify-center">
                        <span className="font-cyber font-black text-2xl md:text-3xl text-yellow-900 drop-shadow-md">$</span>
                    </div>
                </div>
                
                {/* Coin Edge (Approximation with layers) */}
                <div className="absolute inset-0 rounded-full border-[10px] border-yellow-800" style={{ transform: 'translateZ(-5px)' }} />
            </motion.div>

             {/* Reflection */}
             <motion.div
                className="w-24 h-24 md:w-32 md:h-32 relative preserve-3d opacity-20 blur-sm mt-4"
                style={{ rotateY: rotation }}
            >
                 <div 
                    className="absolute inset-0 rounded-full bg-yellow-600 flex items-center justify-center"
                    style={{ transform: 'scaleY(-1)', maskImage: 'linear-gradient(transparent, black)' }}
                >
                    {/* Simple reflection shape */}
                </div>
            </motion.div>
        </div>
    )
}