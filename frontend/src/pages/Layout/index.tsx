// import Authentication from "../../routers/Authentication"
import { Outlet } from 'react-router-dom'
import { FC, Suspense } from 'react'
import Sidebar from '../../components/Sidebar'
import { useState } from 'react'
import Topbar from '../../components/Topbar'


const Layout: FC = () => {
  // const isLogedIn = Authentication()

  const [hamActive, setHamActive] = useState<boolean>(false)
  const baseHamActiveTransition = "transition-all ease-in duration-500"


  function getHamState(elementId: number) {


    switch (elementId) {
      case 1:
        return hamActive ? `rotate-45 translate-x-[-20px] translate-y-[10px] origin-center ${baseHamActiveTransition}` : ''

      case 2:
        return hamActive ? `opacity-0 translate-x-[20px] ${baseHamActiveTransition}` : ''

      case 3:
        return hamActive ? `-rotate-45 origin-center translate-y-[-18px] translate-x-[-5px] ${baseHamActiveTransition}` : ''
    }
  }


  return (
    <div className='border-red-500 w-full h-max flex'>
    
      <div className="group rounded-md left-6 p-[4px] bg-white h-fit top-4 border-2 border-primary z-20 fixed" onClick={() => hamActive ? setHamActive(false) : setHamActive(true)}>
        <svg viewBox='0 -10 100 100' className='w-[30px]' fill="none">
          <path d="m 20 20 h 60 " className={`${baseHamActiveTransition} stroke-[10px] stroke-primary rounded-md stroke-external ${getHamState(1)}`}></path>
          <path d="m 20 40 h 60 " className={`${baseHamActiveTransition} stroke-[10px] stroke-primary rounded-md stroke-external ${getHamState(2)}`}></path>
          <path d="m 20 60 h 60 " className={`${baseHamActiveTransition} stroke-[10px] stroke-primary rounded-md stroke-external ${getHamState(3)}`}></path>
        </svg>
      </div>

      <Sidebar active={hamActive} />

      <div className='w-full h-max overflow-y-hidden'>
        <Topbar />
        <Suspense fallback={<>Loading....</>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default Layout