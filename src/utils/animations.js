import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
};

export const staggerFadeIn = (elements, stagger = 0.15, duration = 0.8) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements[0],
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
};

export const counterAnimation = (element, targetValue, duration = 2) => {
  const obj = { count: 0 };
  return gsap.to(obj, {
    count: targetValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      if (element) {
        element.innerText = Math.floor(obj.count).toLocaleString();
      }
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
};
