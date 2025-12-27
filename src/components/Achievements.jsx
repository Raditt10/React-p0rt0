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
      // Refs
      const sectionRef = useRef(null);
      const mainTitleRef = useRef(null);
      const competitionTitleRef = useRef(null);
      const competitionCardRef = useRef(null);
      const certificationTitleRef = useRef(null);
      const swiperRef = useRef(null);

      // States
      const [activeIndex, setActiveIndex] = useState(0);
      const [hoveredCardId, setHoveredCardId] = useState(null);

      // GSAP Animations
      useEffect(() => {
        const section = sectionRef.current;
        const mainTitle = mainTitleRef.current;
        const competitionTitle = competitionTitleRef.current;
        const competitionCard = competitionCardRef.current;
        const certificationTitle = certificationTitleRef.current;
        const swiper = swiperRef.current;

        if (!section || !mainTitle) return;

        // Detect mobile
        const isMobile = window.innerWidth < 768;

        gsap.set(mainTitle, { 
          opacity: 0, 
          y: isMobile ? 40 : 80,
          scale: isMobile ? 0.95 : 0.8,
          rotateX: 0
        });
        
        gsap.set(competitionTitle, { 
          opacity: 0, 
          x: isMobile ? -40 : -80,
          rotateY: 0
        });

        gsap.set(competitionCard, { 
          opacity: 0, 
          y: isMobile ? 30 : 60,
          scale: isMobile ? 0.98 : 0.9,
          rotateX: 0
        });

        gsap.set(certificationTitle, { 
          opacity: 0, 
          x: isMobile ? -40 : -80,
          rotateY: 0
        });

        gsap.set(swiper, { 
          opacity: 0, 
          y: isMobile ? 30 : 70,
          scale: isMobile ? 0.98 : 0.95
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
          duration: isMobile ? 0.6 : 1.2,
          ease: "power2.out"
        })
        .to(competitionTitle, {
          opacity: 1,
          x: 0,
          duration: isMobile ? 0.5 : 1,
          ease: "power2.out"
        }, "-=0.2")
        .to(competitionCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: isMobile ? 0.5 : 1,
          ease: "power2.out"
        }, "-=0.2")
        .to(certificationTitle, {
          opacity: 1,
          x: 0,
          duration: isMobile ? 0.5 : 1,
          ease: "power2.out"
        }, "-=0.2")
        .to(swiper, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: isMobile ? 0.5 : 1,
          ease: "power2.out"
        }, "-=0.2");

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }, []);

      return (
        <section 
          id='achievements'
          ref={sectionRef}
          style={{ fontFamily: "Sora Variable" }}
          className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28 overflow-hidden bg-gradient-to-br from-[#040507] via-[#0a0d12] to-[#050608]"
        >
          {/* Elegant Static Background */}
          <div className="absolute inset-0 z-0">
            {/* Central light bloom with soft amber halo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.12)_16%,rgba(255,255,255,0)_42%),radial-gradient(circle_at_68%_66%,rgba(255,214,170,0.12)_0%,rgba(255,214,170,0)_55%)]" />

            {/* Luxe vignette to deepen blacks */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.6)_100%)]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-20">
            {/* Enhanced Main Title with Glitch Effect */}
            <div className="relative mb-12 sm:mb-16 md:mb-20">
              <h1 
                ref={mainTitleRef}
                className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-slate-200 to-amber-100 bg-clip-text text-transparent font-semibold text-center relative z-30'
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 24px rgba(255,255,255,0.25)',
                  letterSpacing: '0.05em'
                }}
              >
                Achievements
              </h1>
            </div>
            
            {/* Competition Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <h2 
                ref={competitionTitleRef}
                className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10 flex items-center gap-3 whitespace-nowrap'
              >
                <span className="w-2 h-8 bg-white/30 rounded-full animate-pulse flex-shrink-0" />
                Competition
                <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent flex-shrink-0" />
              </h2>
              
              <div 
                ref={competitionCardRef}
                className='flex justify-center items-center'
              >
                <CompetitionCard />
              </div>
            </div>
            
            {/* Certification Section */}
            <div>
              <h2 
                ref={certificationTitleRef}
                className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10 flex items-center gap-3 whitespace-nowrap'
              >
                <span className="w-2 h-8 bg-white/30 rounded-full animate-pulse flex-shrink-0" />
                Certification
                <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent flex-shrink-0" />
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
                      return `<span class="${className}" style="background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(248,236,214,0.6));"></span>`;
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
                    '--swiper-navigation-color': '#ffffff',
                    '--swiper-pagination-color': '#ffffff',
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
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(248,236,214,0.3), rgba(255,255,255,0.3))',
                                backgroundSize: '300% 300%',
                                animation: 'gradientShift 2s ease infinite',
                                opacity: 0.6
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

            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
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

            /* Enhanced Swiper Styles */
            .swiper-button-next,
            .swiper-button-prev {
              color: #fff !important;
              background: rgba(255, 255, 255, 0.1) !important;
              backdrop-filter: blur(10px);
              border: 2px solid rgba(255, 255, 255, 0.2) !important;
              border-radius: 50% !important;
              width: 55px !important;
              height: 55px !important;
              margin-top: -27.5px !important;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
            }
            
            .swiper-button-next:hover,
            .swiper-button-prev:hover {
              background: rgba(255, 255, 255, 0.2) !important;
              border-color: rgba(255, 255, 255, 0.4) !important;
              transform: scale(1.15);
              box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
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
              border: 2px solid rgba(255, 255, 255, 0.3) !important;
            }
            
            .swiper-pagination-bullet-active {
              width: 18px !important;
              height: 18px !important;
              transform: scale(1.3);
              box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
              border-color: rgba(255, 255, 255, 0.6) !important;
            }
          `}</style>
        </section>
      )
    }

    export default Achievements;