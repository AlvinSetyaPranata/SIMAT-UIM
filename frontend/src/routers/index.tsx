import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../pages/Layout"
import Login from "../pages/Login"


function index() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}/>
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default index