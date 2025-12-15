
export function StartTodayBtn () { 

  return(
        <div className="relative w-[320px] h-[80px] place-self-center">
            <button
              className="w-full h-full bg-white bg-opacity-[5%] shadow-xs-white backdrop-blur-[4px]   
              rounded-none overflow-hidden   
              [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]
              border-none  relative z-10 text-white font-bold text-xl">
              START TODAY!
            </button>
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M20 0H320V60L300 80H0V20Z" stroke="#545354" strokeWidth="2" shapeRendering="crispEdges" />
            </svg>
          </div>
  )
} 