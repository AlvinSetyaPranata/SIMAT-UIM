import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy } from "react"
import Login from "../pages/Login"
import Registration from "../pages/Registration"



const Layout = lazy(() => import("../pages/Layout"))
const Detail = lazy(() => import("../pages/Detail"))
const Assignment = lazy(() => import("../pages/Assignment"))
const Payment = lazy(() => import("../pages/Payment"))
const Account = lazy(() => import("../pages/Account"))
const About = lazy(() => import("../pages/About"))


function index() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/dashboard' element={<Layout />}>
            <Route path='/dashboard/detail' element={<Detail />} />
            <Route path='/dashboard/assignments' element={<Assignment />} />
            <Route path='/dashboard/payments' element={<Payment />} />
            <Route path='/dashboard/account' element={<Account />} />
            <Route path='/dashboard/about' element={<About />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default index