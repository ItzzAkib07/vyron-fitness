import React from "react";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { testimonialsData } from "../../data/testimonialsData";
import SectionHeader from "../../components/common/SectionHeader";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="ATHLETE REVIEWS"
          title="COMMUNITY"
          accentWord="VERDICTS."
          subtitle="Read verified reviews from endurance racers, powerlifters, medical surgeons, and tech leaders training at VYRON."
        />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="py-4"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {testimonialsData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="h-full p-8 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between shadow-xl hover:border-zinc-700 transition-colors">
                  <div>
                    {/* Rating stars & Quote Icon */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-1 text-[#E2FF00]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#E2FF00]" />
                        ))}
                      </div>
                      <Quote className="w-6 h-6 text-zinc-700" />
                    </div>

                    {/* Highlight Badge */}
                    <div className="inline-block px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-[11px] font-mono-tech uppercase font-bold mb-4 border border-[#00F0FF]/25">
                      {item.highlight}
                    </div>

                    {/* Quote text */}
                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author Card */}
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border border-zinc-700"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-bold text-sm text-white">{item.name}</div>
                      <div className="text-[11px] text-zinc-400 font-mono-tech">{item.role}</div>
                      <div className="text-[10px] text-[#E2FF00] font-mono-tech mt-0.5">
                        Member since {item.memberSince} • {item.program}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

