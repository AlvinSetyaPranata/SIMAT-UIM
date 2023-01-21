// import Authentication from "../../routers/Authentication"
import { Outlet } from 'react-router-dom'
import { FC, Suspense } from 'react'
import Navbar from '../../components/Sidebar'
import { useState } from 'react'


const Layout: FC = () => {
  // const isLogedIn = Authentication()

  const [hamActive, setHamActive] = useState<boolean>(false)
  const baseHamActiveTransition = "transition-all ease-in duration-500"


  function getHamState(elementId: number) {


    switch(elementId) {
      case 1:
        return hamActive ? `-rotate-45 translate-y-[8px] ${baseHamActiveTransition}` : ''

      case 2:
        return hamActive ? `opacity-0 translate-x-[20px] ${baseHamActiveTransition}` : ''

      case 3:
        return hamActive ? `rotate-[45deg] translate-y-[-8px] ${baseHamActiveTransition}` : ''
    }
  }


  return (
    <div className='container w-full min-h-screen overflow-hidden flex'>

      <button onClick={() => hamActive ? setHamActive(false) : setHamActive(true)} className="group rounded-md left-4 py-2 px-5 bg-white absolute top-4 border-2 border-primary z-20">
        <div className="max-w-full h-[24px] relative">
          <span className={`rotate-90 min-w-full bg-primary absolute rounded-lg top-[-8px] text-transparent transition-all duration-500 ease-out ${getHamState(1)}`}>.</span>

          <span className={`min-w-full rotate-90 bg-primary rounded-lg absolute top-0 text-transparent opacity-1 transition-all duration-500 ease-out ${getHamState(2)}`}>.</span>
          
          <span className={`rotate-90 min-w-full bg-primary absolute rounded-lg top-[8px] text-transparent transition-all duration-500 ease-out ${getHamState(3)}`}>.</span>
        </div>
      </button>

      <Navbar active={hamActive} />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout