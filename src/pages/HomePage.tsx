 import { Header } from "../components/Header"
import { useGSAP } from '@gsap/react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useEffect } from "react"
import { StartTodayBtn } from "../components/StartTodayBtn"
 import { ArrowDownBtn } from "../components/ArrowDownBtn"
gsap.registerPlugin(ScrollTrigger, useGSAP)

export function HomePage() {
  const animationRef = useRef<gsap.core.Tween[]>([])

  useGSAP(() => {
    animationRef.current.forEach(anim => anim.kill())
    animationRef.current = []

    const vectors = [
      { selector: '.vector1-idle', x: 20, y: -15, duration: 6 },
      { selector: '.vector2-idle', x: -25, y: 10, duration: 6.5 }
    ]

    vectors.forEach(({ selector, x, y, duration }) => {
      const anim = gsap.to(selector, {
        x,
        y,
        duration,
        ease: 'none', 
        repeat: -1,
        yoyo: true,
        force3D: true,
        willChange: 'transform',
        lazy: false
      })
      animationRef.current.push(anim)
    })
  })

  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden'
    document.body.style.overflowX = 'hidden'
    
    return () => {
      animationRef.current.forEach(anim => anim.kill())
      document.documentElement.style.overflowX = ''
      document.body.style.overflowX = ''
    }
  }, [])

  return (
    <div className="app h-screen w-screen bg-[url(/Some-test-with-Visual-effects/hero-bg.jpg)] bg-center bg-no-repeat bg-cover px-[80px] py-[40px] relative">
      <div 
        className="rectangle bg-[url(/Some-test-with-Visual-effects/Rectangle.png)] bg-center bg-no-repeat bg-cover absolute" 
        style={{
          width: 'calc(100% - 160px)', 
          height: '57%', 
          top: '15%', 
          left: '80px',
          maskImage: 'url(/Some-test-with-Visual-effects/Group.svg)', 
          WebkitMaskImage: 'url(/Some-test-with-Visual-effects/Group.svg)', 
          maskSize: 'cover', 
          WebkitMaskSize: 'cover', 
          maskPosition: 'center', 
          WebkitMaskPosition: 'center', 
          maskRepeat: 'no-repeat', 
          WebkitMaskRepeat: 'no-repeat',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />

      <div
        className="vector vector1-idle absolute bg-[url(/Some-test-with-Visual-effects/Group.svg)] bg-center bg-no-repeat bg-cover"
        style={{
          width: 'calc(100% - 160px)', 
          height: '57%', 
          top: '21.5%',
          left: '80px',
          maskImage: 'url(/Some-test-with-Visual-effects/Group.svg)', 
          WebkitMaskImage: 'url(/Some-test-with-Visual-effects/Group.svg)', 
          maskSize: 'cover', 
          WebkitMaskSize: 'cover', 
          maskPosition: 'center', 
          WebkitMaskPosition: 'center', 
          maskRepeat: 'no-repeat', 
          WebkitMaskRepeat: 'no-repeat',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          contain: 'layout style paint'
        }}
      />
      <div
        className="vector vector2-idle absolute bg-[url(/Some-test-with-Visual-effects/Group.svg)] bg-center bg-no-repeat bg-cover"
        style={{
          width: 'calc(100% - 160px)', 
          height: '57%', 
          top: '21.5%',
          left: '80px',
          maskImage: 'url(/Some-test-with-Visual-effects/Group.svg)', 
          WebkitMaskImage: 'url(/Some-test-with-Visual-effects/Group.svg)', 
          maskSize: 'cover', 
          WebkitMaskSize: 'cover', 
          maskPosition: 'center', 
          WebkitMaskPosition: 'center', 
          maskRepeat: 'no-repeat', 
          WebkitMaskRepeat: 'no-repeat',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          contain: 'layout style paint'
        }}
      />

      <Header />
      <div className="hero__content absolute bottom-[138px] w-full flex flex-col items-center justify-center gap-[7px]">
        <StartTodayBtn />
        <ArrowDownBtn />
        <h1 className="hero__title text-[4rem] max-w-[914px] text-white text-center mb-[36px]" style={{ lineHeight: '105%' }}>
          Building the future of medicine with AI
        </h1>
      </div>
    </div>
  )
}