import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { lazy } from "react"
import Layout from "../pages/Layout"
import Login from "../pages/Login"
import Registration from "../pages/Registration"


// const Layout = lazy(() => import("../pages/Layout"))
// const Login = lazy(() => import("../pages/Login"))
// const Registration = lazy(() => import("../pages/Registration"))


function index() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default index