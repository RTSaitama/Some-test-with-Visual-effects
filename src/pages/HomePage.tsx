import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { StartTodayBtn } from "../components/StartTodayBtn"
import { ArrowDownBtn } from "../components/ArrowDownBtn"

gsap.registerPlugin(ScrollTrigger)

export function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Створюємо контекст для GSAP всередині цього компонента
    const ctx = gsap.context(() => {
      // Анімація hero__title при скролі
      gsap.set(".hero__title", { y: -50 })
      gsap.to(".hero__title", {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero__btn__arrow",
          start: "top bottom",
          end: "top top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, containerRef) // контейнер для scoped селекторів

    // Очистка після анмації при розмонтуванні
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      <div className="hero__screen min-h-screen relative z-10">
        <div className="hero__titleContent-wrapp gap-[7px] absolute bottom-[138px] w-full flex flex-col items-center justify-center">
          <StartTodayBtn />
          <h1
            style={{ lineHeight: "105%" }}
            className="hero__title text-[4rem] max-w-[914px] text-white text-center mb-[36px]"
          >
            Building the future of medicine with AI
          </h1>
          <ArrowDownBtn />
        </div>
      </div>

      <section className="section-2 h-screen bg-black relative z-20 overflow-hidden flex items-center justify-center">
        <h2 className="text-white text-4xl">2</h2>
      </section>

      <section className="h-screen bg-black flex items-center justify-center">
        <h2 className="text-white text-4xl">3</h2>
      </section>
    </div>
  )
}
