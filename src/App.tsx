import { Header } from "./components/Header"
import { HomePage } from "./pages/HomePage"
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useEffect } from "react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function App() {
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
    <div className="app h-screen w-screen bg-[url('/Some-test-with-Visual-effects/hero-bg.jpg')] bg-center bg-no-repeat bg-cover px-[80px] py-[40px] relative">
      
      <div 
        className="rectangle bg-[url('/Some-test-with-Visual-effects/Rectangle.png')] bg-center bg-no-repeat bg-cover absolute" 
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
        className="vector vector1-idle absolute bg-[url('/Some-test-with-Visual-effects/Group.svg')] bg-center bg-no-repeat bg-cover"
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
        className="vector vector2-idle absolute bg-[url('/Some-test-with-Visual-effects/Group.svg')] bg-center bg-no-repeat bg-cover"
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
      <HomePage />
    </div>
  )
}

export default App
