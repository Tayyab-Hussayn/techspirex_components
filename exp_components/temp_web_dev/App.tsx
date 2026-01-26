
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, Box, Smartphone, Code2, Layers, Cpu, CreditCard, BoxSelect, Sparkles } from 'lucide-react';

/**
 * 3D STACK LAYERS ENUM
 */
type Layer = 'code' | 'blueprint' | 'ui' | null;

/**
 * FEATURE PILL COMPONENT
 */
const FeaturePill = ({ 
  icon: Icon, 
  title, 
  description, 
  onHover, 
  isActive 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  onHover: (active: boolean) => void,
  isActive: boolean 
}) => (
  <motion.button
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
    className={`group flex items-center gap-4 px-5 py-3 rounded-full border transition-all duration-300 text-left ${
      isActive 
      ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
      : 'bg-transparent border-white/5 hover:border-white/10'
    }`}
  >
    <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-zinc-500 group-hover:text-zinc-300'}`}>
      <Icon size={18} />
    </div>
    <div>
      <div className={`text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-zinc-400'}`}>{title}</div>
      <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">{description}</div>
    </div>
  </motion.button>
);

/**
 * 3D ISOMETRIC STACK COMPONENT
 */
const IsometricHero = ({ activeLayer }: { activeLayer: Layer }) => {
  const [isExploded, setIsExploded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [25, 15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-25, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const springConfig = { stiffness: 100, damping: 20 };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsExploded(true)}
      onMouseLeave={() => setIsExploded(false)}
      className="relative w-full h-[600px] flex items-center justify-center cursor-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-[400px] h-[250px]"
      >
        {/* CONNECTION LINES (VISIBLE ON EXPLODE) */}
        <AnimatePresence>
          {isExploded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-[1px] bg-gradient-to-b from-cyan-400 to-transparent"
                  style={{ 
                    height: '240px',
                    left: i % 2 === 0 ? '0%' : '100%',
                    top: i < 2 ? '0%' : '100%',
                    transform: `translateZ(-120px) translateY(${i < 2 ? '-120px' : '-120px'})`,
                    opacity: 0.5,
                    borderLeft: '1px dashed rgba(34, 211, 238, 0.3)'
                  }} 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LAYER 1: CODE (BOTTOM) */}
        <motion.div
          animate={{ 
            z: isExploded ? -140 : 0,
            opacity: activeLayer && activeLayer !== 'code' ? 0.3 : 1,
            scale: activeLayer === 'code' ? 1.05 : 1
          }}
          transition={springConfig}
          className="absolute inset-0 bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl p-6 overflow-hidden flex flex-col gap-2 pointer-events-none"
        >
          <div className="flex gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-zinc-800" />
            <div className="w-2 h-2 rounded-full bg-zinc-800" />
            <div className="w-2 h-2 rounded-full bg-zinc-800" />
          </div>
          <div className="font-mono text-[9px] text-cyan-400/80 leading-relaxed">
            <span className="text-fuchsia-400">export default function</span> <span className="text-emerald-400">Card</span>() &#123;<br/>
            &nbsp;&nbsp;<span className="text-fuchsia-400">return</span> (<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-rose-400">motion.div</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">whileHover</span>=&#123;&#123; <span className="text-amber-400">scale</span>: 1.05 &#125;&#125;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">className</span>=<span className="text-emerald-400">"glass-card"</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br/>
            &nbsp;&nbsp;);<br/>
            &#125;
          </div>
          <div className="absolute bottom-4 right-4 text-zinc-800"><Terminal size={40} /></div>
        </motion.div>

        {/* LAYER 2: BLUEPRINT (MIDDLE) */}
        <motion.div
          animate={{ 
            z: 0,
            opacity: activeLayer && activeLayer !== 'blueprint' ? 0.2 : 0.6,
            scale: activeLayer === 'blueprint' ? 1.05 : 1
          }}
          transition={springConfig}
          className="absolute inset-0 border-[1px] border-cyan-500/40 rounded-2xl pointer-events-none bg-cyan-500/[0.02]"
          style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
           <div className="absolute top-4 left-4 border border-rose-500/50 px-1 text-[8px] text-rose-500 font-mono">P: 24px</div>
           <div className="absolute inset-6 border border-rose-500/20 rounded-lg border-dashed" />
           <div className="absolute bottom-4 right-4 flex gap-1 items-center">
              <BoxSelect size={12} className="text-cyan-400" />
              <span className="text-[8px] font-mono text-cyan-400 uppercase">Auto-Layout: 8px</span>
           </div>
        </motion.div>

        {/* LAYER 3: UI (TOP) */}
        <motion.div
          animate={{ 
            z: isExploded ? 140 : 20,
            opacity: activeLayer && activeLayer !== 'ui' ? 0.4 : 1,
            scale: activeLayer === 'ui' ? 1.05 : 1
          }}
          transition={springConfig}
          className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] p-8 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={100} className="text-white" />
          </div>
          <div className="flex justify-between items-start">
             <div className="w-12 h-10 bg-gradient-to-tr from-amber-200/20 to-amber-500/40 rounded-md border border-white/10" />
             <div className="text-[10px] font-mono tracking-widest text-white/40">WORLD BANK</div>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-mono tracking-[0.2em] text-white">4400 8210 9921 4242</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[7px] uppercase tracking-widest text-white/30">Holder</div>
                <div className="text-[10px] text-white/80 font-bold">ALEX ARCHITECT</div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-500/50 mix-blend-screen" />
                <div className="w-6 h-6 rounded-full bg-amber-500/50 mix-blend-screen -ml-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* MOUSE FOLLOWER / STATUS */}
      <motion.div 
        animate={{ x: x.get() * 100, y: y.get() * 100 }}
        className="absolute pointer-events-none z-[100] px-3 py-1 bg-white text-black text-[9px] font-bold uppercase rounded-full tracking-tighter shadow-xl"
        style={{ left: '60%', top: '60%' }}
      >
        {isExploded ? 'Exploded View' : 'Inspect Stack'}
      </motion.div>
    </div>
  );
};

/**
 * AURORA BACKGROUND EFFECT
 */
const Aurora = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 100, 0],
        y: [0, 50, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-violet-600/10 blur-[160px] rounded-full"
    />
    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        x: [0, -80, 0],
        y: [0, 100, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 blur-[140px] rounded-full"
    />
  </div>
);

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  const [activeLayer, setActiveLayer] = useState<Layer>(null);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-fuchsia-500/30 overflow-hidden">
      <Aurora />

      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT: CONTENT */}
          <div className="relative z-10 space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-[0.3em]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System Operational
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-8xl font-black leading-[0.85] tracking-tighter text-white"
              >
                We Speak <br />
                <span 
                  data-text="Developer"
                  className="relative glitch-hover text-transparent text-stroke-white hover:text-white transition-all duration-500 cursor-default"
                >
                  Developer.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-zinc-500 text-lg md:text-xl max-w-md font-medium leading-snug"
              >
                Deconstructing the boundary between high-fidelity design and production-grade code.
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-4 max-w-lg">
              <FeaturePill 
                icon={Terminal} 
                title="Source Mapping" 
                description="Prop-Level Sync" 
                isActive={activeLayer === 'code'}
                onHover={(active) => setActiveLayer(active ? 'code' : null)}
              />
              <FeaturePill 
                icon={BoxSelect} 
                title="Blueprint" 
                description="Precision Layout" 
                isActive={activeLayer === 'blueprint'}
                onHover={(active) => setActiveLayer(active ? 'blueprint' : null)}
              />
              <FeaturePill 
                icon={Sparkles} 
                title="Glass UI" 
                description="Final Fidelity" 
                isActive={activeLayer === 'ui'}
                onHover={(active) => setActiveLayer(active ? 'ui' : null)}
              />
            </div>
          </div>

          {/* RIGHT: HERO 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <IsometricHero activeLayer={activeLayer} />
          </motion.div>
        </div>

        {/* BOTTOM DECORATION */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2 }}
          className="mt-32 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale opacity-40 hover:grayscale-0 transition-all duration-700"
        >
          {['Framer', 'React', 'Tailwind', 'Next.js', 'Vercel', 'Radix'].map((brand) => (
            <span key={brand} className="text-xs font-mono font-bold text-white tracking-[0.4em] uppercase">{brand}</span>
          ))}
        </motion.div>
      </main>

      {/* DECORATIVE RADIAL MESH */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] mix-blend-overlay" 
           style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
    </div>
  );
}

