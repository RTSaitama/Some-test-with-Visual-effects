import { useState, useRef, useEffect } from "react"

function ScrambleText({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [displayText, setDisplayText] = useState<string>(text)
  const animationRef = useRef<number | null>(null)

  const chars = Array.from(
    new Set(text.toLowerCase().split("").filter(c => c !== " "))
  ).join("") + "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  useEffect(() => {
    if (!isHovered) {
      // Відкладений виклик setState, щоб уникнути синхронного оновлення у useEffect
      const timeout = setTimeout(() => {
        setDisplayText(text)
      }, 0)

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      return () => clearTimeout(timeout)
    }

    let startTime: number | null = null
    const duration = 500

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.floor(progress * text.length)

      const result = text
        .split("")
        .map((letter, index) => {
          if (index < current) return letter
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")

      setDisplayText(result)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isHovered, text, chars])

  return <>{displayText}</>
}


interface NavItemProps {
  item: {
    label: string
    path: string
  }
}

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const measureRef = useRef<HTMLSpanElement | null>(null)
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth)
    }
  }, [item.label])

  return (
    <>
      <span 
        ref={measureRef} 
        style={{ 
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        {item.label}
      </span>

      <li
        className="nav__item whitespace-nowrap text-xs md:text-sm"
        style={{ width: width ? `${width}px` : 'auto' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href={item.path}>
          <ScrambleText text={item.label} isHovered={isHovered} />
        </a>
      </li>
    </>
  )
}

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const navItems: { label: string; path: string }[] = [
    { label: "Solutions", path: "/solutions" },
    { label: "Technology", path: "/technology" },
    { label: "About", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Resources", path: "/resources" },
    { label: "Contact", path: "/contact" },
  ]

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="header flex justify-between items-center w-full px-4 md:px-8 lg:px-[80px] py-4 md:py-6 relative z-50">
      <div className="logo__wrapp w-[100px] md:w-[156px] h-[16px] md:h-[22px] flex-shrink-0">
        <img src="./Logo.svg" alt="logo_img" className="w-full h-full" />
      </div>

       <nav className="hidden md:block nav__wrapp text-[#717072] flex-1">
        <ul className="nav__list flex flex-row justify-end gap-4 lg:gap-[50px]">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </ul>
      </nav>

       <button 
        className="md:hidden flex flex-col gap-1 z-50 flex-shrink-0"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

       {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-95 z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="md:hidden fixed inset-0 z-40 flex items-center justify-center pt-20">
            <ul className="nav__list flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <li key={item.path} className="text-[#717072] hover:text-white transition text-xl">
                  <a href={item.path} onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  )
}
