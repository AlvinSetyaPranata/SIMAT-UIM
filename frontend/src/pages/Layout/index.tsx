// import Authentication from "../../routers/Authentication"
import { Outlet } from 'react-router-dom'
import { FC, Suspense } from 'react'
import Navbar from '../../components/Sidebar'


const Layout: FC = () => {
  // const isLogedIn = Authentication()
  

  return (
    <div className='container w-full min-h-screen overflow-hidden flex'>
      <Navbar />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout