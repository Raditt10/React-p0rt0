// React and Hooks
import React, { useEffect, useRef, useState } from 'react';

// GSAP Animation
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Components
import CertificationCard from './assets/CertificationCard';
import CompetitionCard from './assets/CompetitionCard';

// Data
import { dataCerti } from '../../constant';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef(null);
  const mainTitleRef = useRef(null);
  const competitionTitleRef = useRef(null);
  const competitionCardRef = useRef(null);
  const certificationTitleRef = useRef(null);
  const swiperRef = useRef(null);
  const glowRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const mainTitle = mainTitleRef.current;
    const competitionTitle = competitionTitleRef.current;
    const competitionCard = competitionCardRef.current;
    const certificationTitle = certificationTitleRef.current;
    const swiper = swiperRef.current;

    gsap.set(mainTitle, { 
      opacity: 0, 
      y: 80,
      scale: 0.8,
      rotateX: -15
    });
    
    gsap.set(competitionTitle, { 
      opacity: 0, 
      x: -80,
      rotateY: -20
    });

    gsap.set(competitionCard, { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: 15
    });

    gsap.set(certificationTitle, { 
      opacity: 0, 
      x: -80,
      rotateY: -20
    });

    gsap.set(swiper, { 
      opacity: 0, 
      y: 70,
      scale: 0.95
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(mainTitle, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 1.2,
      ease: "power4.out"
    })
    .to(competitionTitle, {
      opacity: 1,
      x: 0,
      rotateY: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.4")
    .to(competitionCard, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 1,
      ease: "back.out(1.5)"
    }, "-=0.5")
    .to(certificationTitle, {
      opacity: 1,
      x: 0,
      rotateY: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.3")
    .to(swiper, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id='achievements'
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28 bg-black" 
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Dynamic Mouse Glow Effect */}
      <div 
        ref={glowRef}
        className="absolute pointer-events-none z-5 transition-all duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: hoveredCardId !== null ? '900px' : '700px',
          height: hoveredCardId !== null ? '900px' : '700px',
          transform: 'translate(-50%, -50%)',
          background: `
            radial-gradient(
              circle at center,
              rgba(139, 92, 246, ${hoveredCardId !== null ? '0.5' : '0.35'}) 0%,
              rgba(59, 130, 246, ${hoveredCardId !== null ? '0.3' : '0.2'}) 20%,
              rgba(0, 255, 249, ${hoveredCardId !== null ? '0.2' : '0.12'}) 40%,
              rgba(255, 0, 222, ${hoveredCardId !== null ? '0.15' : '0.08'}) 60%,
              transparent 80%
            )
          `,
          filter: 'blur(90px)',
          opacity: mousePosition.x > 0 ? 1 : 0,
          mixBlendMode: 'screen'
        }}
      />
      

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center',
          animation: 'gridMove 25s linear infinite'
        }} />
      </div>

      {/* Hexagonal Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,51 12.3,43.7 12.3,29.2" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>
      </div>

      {/* Multiple Pulsing Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600/15 to-transparent animate-pulse-slow" 
             style={{ filter: 'blur(80px)', animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-[500px] h-[500px] rounded-full bg-linear-to-l from-cyan-600/12 to-transparent animate-pulse-slow" 
             style={{ filter: 'blur(70px)', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-pink-600/10 to-transparent animate-pulse-slow" 
             style={{ filter: 'blur(90px)', animationDelay: '4s', transform: 'translate(-50%, -50%)' }} />
      </div>

      {/* Enhanced Floating Particles with 3D Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const isSpecial = i % 7 === 0;
          return (
            <div
              key={i}
              className={`floating-particle absolute rounded-full ${isSpecial ? 'animate-float-special' : 'animate-float'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: isSpecial 
                  ? 'radial-gradient(circle, #fff, #8b5cf6)'
                  : Math.random() > 0.5 
                    ? 'linear-gradient(135deg, #8b5cf6, #00fff9)'
                    : 'linear-gradient(135deg, #ff00de, #8b5cf6)',
                boxShadow: `0 0 ${Math.random() * 20 + 10}px ${
                  isSpecial ? 'rgba(255, 255, 255, 0.9)' :
                  Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(0, 255, 249, 0.8)'
                }`,
                filter: 'blur(1px)',
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
                opacity: isSpecial ? 1 : 0.7
              }}
            />
          );
        })}
      </div>

      {/* Scanning Lines Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan-horizontal" 
             style={{ top: '20%', animationDelay: '0s' }} />
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-scan-horizontal" 
             style={{ top: '60%', animationDelay: '3s' }} />
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-pink-400/50 to-transparent animate-scan-vertical" 
             style={{ left: '30%', animationDelay: '1.5s' }} />
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-scan-vertical" 
             style={{ left: '70%', animationDelay: '4.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Enhanced Main Title with Glitch Effect */}
        <div className="relative mb-12 sm:mb-16 md:mb-20">
          <h1 
            ref={mainTitleRef}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent font-bold text-center relative z-30 overflow-hidden'
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 100px rgba(139, 92, 246, 0.6)',
              letterSpacing: '0.08em',
              filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))'
            }}
          >
            Achievements
          </h1>
        </div>
        
        {/* Competition Section */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <h2 
            ref={competitionTitleRef}
            className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10 flex items-center gap-3'
          >
            <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full animate-pulse" />
            Competition
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
          </h2>
          <div 
            ref={competitionCardRef}
            className='flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10'
          >
            <div 
              className="relative group perspective-1000"
            >
              {/* Enhanced Cyberpunk Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(0, 255, 249, 0.2) 50%, transparent 70%)',
                  filter: 'blur(25px)',
                  transform: 'scale(1.2)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
              
              {/* Animated Holographic Border */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
                <div 
                  className="absolute -inset-0.5 rounded-xl"
                  style={{
                    background: 'linear-gradient(45deg, #8b5cf6, #00fff9, #ff00de, #8b5cf6)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 3s ease infinite',
                    opacity: 0.6
                  }}
                />
                <div className="absolute inset-0.5 bg-black rounded-xl" />
                
                {/* Animated Grid Pattern */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-40"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, transparent 90%, #8b5cf6 100%),
                      linear-gradient(180deg, transparent 90%, #06b6d4 100%)
                    `,
                    backgroundSize: '25px 25px',
                    animation: 'gridMove 2s linear infinite'
                  }}
                />
                
                {/* Multiple Scanning Lines */}
                <div className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-scan rounded-full" />
                <div className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-400 to-transparent animate-scan" style={{animationDelay: '1s', animationDuration: '4s'}} />
                
                {/* Animated Corner Brackets with Glow */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 animate-pulse-corner" 
                     style={{boxShadow: '0 0 10px rgba(0, 255, 249, 0.8)'}} />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400 animate-pulse-corner" 
                     style={{animationDelay: '0.3s', boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'}} />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400 animate-pulse-corner" 
                     style={{animationDelay: '0.6s', boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'}} />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400 animate-pulse-corner" 
                     style={{animationDelay: '0.9s', boxShadow: '0 0 10px rgba(0, 255, 249, 0.8)'}} />
              </div>

              {/* Card with 3D Transform */}
              <div className="relative transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-2 rounded-xl overflow-hidden"
                   style={{transformStyle: 'preserve-3d'}}>
                <CompetitionCard />
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Certification Section with Enhanced Swiper */}
        <div>
          <h2 
            ref={certificationTitleRef}
            className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10 flex items-center gap-3'
          >
            <span className="w-2 h-8 bg-linear-to-b from-cyan-500 to-purple-500 rounded-full animate-pulse" />
            Certification
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </h2>
          
          <div 
            ref={swiperRef}
            className="flex justify-center items-center relative"
          >

            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1.5,
                slideShadows: true,
              }}
              spaceBetween={30}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
                renderBullet: function (index, className) {
                  return `<span class="${className}" style="background: linear-gradient(135deg, #8b5cf6, #00fff9);"></span>`;
                }
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 25,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                }
              }}
              className='my-6 sm:my-8 md:my-10 w-full max-w-6xl relative z-20'
              style={{
                '--swiper-navigation-color': '#8b5cf6',
                '--swiper-pagination-color': '#8b5cf6',
              }}
            >
              {dataCerti.map((d, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center pb-16">
                  <div className="flex justify-center items-center w-full h-full">
                    <div 
                      className={`relative group w-full transition-all duration-500 ${
                        index === activeIndex ? 'scale-100' : 'scale-90 opacity-70'
                      }`}
                      onMouseEnter={() => setHoveredCardId(index)}
                      onMouseLeave={() => setHoveredCardId(null)}
                    >
                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
                        <div 
                          className="absolute -inset-px rounded-xl"
                          style={{
                            background: 'linear-gradient(135deg, #8b5cf6, #00fff9, #ff00de, #8b5cf6)',
                            backgroundSize: '300% 300%',
                            animation: 'gradientShift 2s ease infinite',
                            opacity: 0.5
                          }}
                        />
                        <div className="absolute inset-px bg-black rounded-xl" />
                      </div>

                      <div className="relative transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                        <CertificationCard 
                          gambar={d.gambar} 
                          judul={d.judul} 
                          link={d.link} 
                        />
                      
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg) scale(1); 
            opacity: 0; 
          }
          10% { opacity: 0.8; }
          50% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { 
            transform: translateY(-120vh) translateX(100px) rotate(360deg) scale(0.5); 
            opacity: 0; 
          }
        }

        @keyframes float-special {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg) scale(1); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          50% { 
            opacity: 1;
            transform: translateY(-60vh) translateX(50px) rotate(180deg) scale(1.5); 
          }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-120vh) translateX(100px) rotate(360deg) scale(0.3); 
            opacity: 0; 
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(500%); opacity: 0; }
        }

        @keyframes scan-horizontal {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(500vh); opacity: 0; }
        }

        @keyframes scan-vertical {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(500vw); opacity: 0; }
        }

        @keyframes pulse-corner {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        @keyframes pulse-width {
          0%, 100% { width: 128px; opacity: 0.5; }
          50% { width: 256px; opacity: 1; }
        }

        .animate-float {
          animation: float 18s infinite linear;
        }

        .animate-float-special {
          animation: float-special 12s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-scan {
          animation: scan 4s linear infinite;
        }

        .animate-scan-horizontal {
          animation: scan-horizontal 6s linear infinite;
        }

        .animate-scan-vertical {
          animation: scan-vertical 8s linear infinite;
        }

        .animate-pulse-corner {
          animation: pulse-corner 2s ease-in-out infinite;
        }

        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }

        .animate-pulse-width {
          animation: pulse-width 3s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .rotate-y-2 {
          transform: rotateY(2deg);
        }

        /* Enhanced Swiper Styles */
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff !important;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(0, 255, 249, 0.3)) !important;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(139, 92, 246, 0.5) !important;
          border-radius: 50% !important;
          width: 55px !important;
          height: 55px !important;
          margin-top: -27.5px !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(0, 255, 249, 0.5)) !important;
          border-color: rgba(139, 92, 246, 0.8) !important;
          transform: scale(1.15);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.8);
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 22px !important;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet {
          width: 14px !important;
          height: 14px !important;
          transition: all 0.3s ease !important;
          border: 2px solid rgba(139, 92, 246, 0.3) !important;
        }
        
        .swiper-pagination-bullet-active {
          width: 18px !important;
          height: 18px !important;
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.8);
          border-color: rgba(139, 92, 246, 0.8) !important;
        }
        
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 45px !important;
            height: 45px !important;
            margin-top: -22.5px !important;
          }
          
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px !important;
          }
        }
        
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 40px !important;
            height: 40px !important;
          }
          
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 16px !important;
          }
        }

        /* Swiper Slide Shadow Enhancement */
        .swiper-slide {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .swiper-slide-active {
          filter: brightness(1.1);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6, #00fff9);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #a78bfa, #06b6d4);
        }
      `}</style>
    </section>
  )
}

export default Achievements;