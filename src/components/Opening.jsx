import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Opening = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("loading");
  const [typedText, setTypedText] = useState("");
  const fullText = "自豪地呈现";

  useEffect(() => {
    let currentIndex = 0;
    const typingTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(typingTimer);
      }
    }, 80);
    return () => clearInterval(typingTimer);
  }, []);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setStage("entering");
          setTimeout(() => {
            setStage("complete");
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-transparent pointer-events-auto text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "complete" ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ pointerEvents: stage === "complete" ? "none" : "auto" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-[95%] sm:w-[90%] max-w-2xl h-[70vh] sm:h-[80vh] max-h-[600px]">
          <div className="absolute inset-0 rounded-lg sm:rounded-xl shadow-2xl border border-gray-800/30 overflow-hidden bg-[#2d2d2d]">
            <div className="absolute top-0 left-0 right-0 h-9 sm:h-11 bg-[#2a2a2a] border-b border-black/30 flex items-center px-2 sm:px-3">
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ee6a5f]" />
                <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#f5bd4f]" />
                <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#61c454]" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-gray-300 text-xs sm:text-sm font-semibold">portfolio.app</span>
              </div>
              <div className="w-16 sm:w-24" />
            </div>
            <div className="absolute top-9 sm:top-11 left-0 right-0 bottom-0 bg-gradient-to-br from-[#fef3e2] to-[#fdefd4]" />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 px-4">
        <motion.div
          className="relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: stage === "entering" ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
            <div className="relative w-full h-full rounded-full shadow-xl overflow-hidden border-2 sm:border-4 border-white/20 bg-[#0f1116]">
              <img src="/img/meow.jpg" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-white/15" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 mb-3 tracking-tight drop-shadow-sm"
            style={{ fontFamily: '"Space Grotesk", "Inter", system-ui, sans-serif', fontWeight: 800 }}
          >
            Hao!
          </h1>
          <div
            className="text-amber-800/90 text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase h-9 sm:h-10 flex items-center justify-center"
            style={{ fontFamily: "monospace" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-700 via-amber-800 to-orange-700">{typedText}</span>
            <motion.span
              className="inline-block w-1 h-6 bg-amber-800 ml-1.5 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-between items-center mb-4 text-base">
            <span className="text-amber-800/80 text-sm sm:text-base font-semibold">Tunggu bentar yaa..</span>
            <span
              className="text-amber-900 font-black text-2xl sm:text-3xl tracking-tighter tabular-nums"
              style={{ fontWeight: 900 }}
            >
              {progress}%
            </span>
          </div>

          <div className="relative h-5 sm:h-6 bg-gradient-to-r from-amber-100/80 to-amber-100/80 rounded-full overflow-hidden border-2 border-amber-300/40 shadow-md">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "linear" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Opening;
