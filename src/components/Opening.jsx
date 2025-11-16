import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Opening = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // loading, entering, complete
  const [typedText, setTypedText] = useState('');
  
  const fullText = "Welcome to My Portfolio";

  useEffect(() => {
    // Typing animation
    let currentIndex = 0;
    const typingTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingTimer);
      }
    }, 100);

    return () => clearInterval(typingTimer);
  }, []);

  useEffect(() => {
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setStage('entering');
          setTimeout(() => {
            setStage('complete');
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black pointer-events-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'complete' ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      style={{ pointerEvents: stage === 'complete' ? 'none' : 'auto' }}
    >
      {/* Animated Space Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Starfield */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1, 0.8, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Nebula Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-blue-900/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Multiple Orbiting Rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] border border-cyan-500/20 rounded-full" />
          {/* Orbiting particle 1 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] md:w-[800px] md:h-[800px] border border-purple-500/15 rounded-full" />
          {/* Orbiting particle 2 */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[350px] h-[350px] sm:w-[480px] sm:h-[480px] md:w-[700px] md:h-[700px] border border-dashed border-blue-500/15 rounded-full" />
          {/* Orbiting particle 3 */}
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] border border-dotted border-cyan-500/10 rounded-full" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[900px] md:h-[900px] border border-purple-500/10 rounded-full" />
          {/* Orbiting particle 4 */}
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-pink-400 rounded-full shadow-[0_0_8px_rgba(236,72,153,1)]" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Planet Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: stage === 'entering' ? 1.2 : 1,
            rotate: stage === 'entering' ? 360 : 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Planet Core */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            
            {/* Planet Surface with Image */}
            <div className="relative w-full h-full rounded-full shadow-2xl overflow-hidden border-4 border-cyan-400/50">
              {/* Image */}
              <img 
                src="/img/meow.jpg" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-transparent to-purple-700/30" />
              
              {/* Surface Pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 70%, rgba(0,0,0,0.3) 0%, transparent 50%)`
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Orbital Ring */}
            <motion.div
              className="absolute inset-0 -m-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full border-2 border-dashed border-cyan-400/30 rounded-full" />
              {/* Orbiting Dot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-wider">
            Hi! 
          </h1>
          <div className="text-cyan-400/80 text-sm md:text-base tracking-widest h-6">
            <span>{typedText}</span>
            <motion.span
              className="inline-block w-0.5 h-5 bg-cyan-400 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div
          className="w-72 md:w-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Progress Label */}
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-cyan-400/70">Tunggu bentar yaa..</span>
            <span className="text-cyan-400 font-mono font-bold">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-cyan-500/20">
            {/* Progress Fill */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Progress Glow */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400/50 to-purple-600/50 blur-md"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)'
        }} />
      </div>
    </motion.div>
  );
};

export default Opening;