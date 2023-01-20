// import Authentication from "../../routers/Authentication"
import { Outlet } from 'react-router-dom'
import { FC, Suspense } from 'react'
import Navbar from '../../components/Sidebar'
import { useState } from 'react'


const Layout: FC = () => {
  // const isLogedIn = Authentication()

  const [hamActive, setHamActive] = useState<boolean>(false)


  return (
    <div className='container w-full min-h-screen overflow-hidden flex'>
      <button onClick={() => hamActive ? setHamActive(false) : setHamActive(true)} className="rounded-md left-4 py-2 px-5 bg-white absolute top-4">
        <div className="max-w-full h-[24px] relative">
          <span className="min-w-full h-min rotate-45 bg-primary absolute rounded-md top-0 text-transparent">.</span>
          <span className="min-w-full rotate-90 bg-primary rounded-md absolute top-0 text-transparent">.</span>
          <span className="min-w-full -rotate-45 bg-primary rounded-md absolute top-0 text-transparent">.</span>
        </div>
      </button>

      <Navbar />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout