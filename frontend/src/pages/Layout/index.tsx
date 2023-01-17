// import Authentication from "../../routers/Authentication"
import { useNavigate } from 'react-router-dom'
import { FC, useEffect } from 'react'


const Layout: FC = () => {
  // const isLogedIn = Authentication()
  const navigate = useNavigate()



  useEffect(() => navigate("/login"), [])
  

  return (
    <div></div>
  )
}

export default Layout