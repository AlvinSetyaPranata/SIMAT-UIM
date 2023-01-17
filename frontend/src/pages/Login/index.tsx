import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../../assets/logo-uim.png'
import LoginFooter from '../../components/LoginFooter'
import { SyntheticEvent, useRef } from 'react'


function Login() {

  const variants = {
    containerInit: {
      width: '500px',
      opacity: 0
    },

    containerAnimate: {
      width: '1000px',
      opacity: 1,
      zIndex: 0,
      transition: {        
        width: {
          delay: 1,
          duration: 1,
        },
        
        duration: 1,
        ease: 'easeIn'
      }
    }
  }




  const username = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)

  interface formData {
    username: string,
    password: string
  }


  const handleForm = async(event: SyntheticEvent) => {
    event.preventDefault()

    const form: formData = {
      username: username.current!.value,
      password: password.current!.value
    }


    await fetch('http://localhost:8000/user/auth/', {
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(form)
    })
    .then((data) => data.json())
    .then((data) => console.log(data))
  }


  return (
    <div className="min-h-screen w-screen grid place-items-center box-border">
      <motion.div className="container w-[500px] flex shadow-lg z-10 overflow-hidden" variants={variants} initial='containerInit' animate='containerAnimate'>

        <div className="relative bg-primary p-6 grid place-items-center w-[500px] py-16 px-6 flex-shrink-0 flex-grow-0">
          <h1 className='text-xl font-semibold text-white mb-12'>SISTEM INFORMASI AKADEMIK TERPADU</h1>
          <img src={Logo} alt="logo" />
          <h2 className='text-3xl font-bold text-white mt-8'>Universitas Islam Madura</h2>
          <h3 className='text-xl font-semibold text-yellow-custom mt-4'>Kampus 5 Menara Ilmu</h3>
        </div>

        <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {ease: 'easeIn', delay: 1.5}}} className='grid w-[50%] bg-red-blue place-items-center'>
          <form className='grid gap-y-8' onSubmit={handleForm}>
            <div className='grid gap-y-2'>
              <label className='font-semibold text-lg'>Username</label>
              <input type="text" ref={username} className='py-[6px] w-[300px] outline-none px-4 bg-slate-100 rounded-md'/>
              <Link to='' className='text-link text-right font-semibold text-sm'>Belum terdaftar?</Link>
            </div>
            <div className='grid gap-y-2'>
              <label className='font-semibold text-lg'>Password</label>
              <input type="password" ref={password} className='py-[6px] w-[300px] outline-none px-4 bg-slate-100 rounded-md'/>
              <Link to='' className='text-link text-right font-semibold text-sm'>Lupa Password?</Link>
            </div>
            <button type="submit"  className='bg-primary max-w-[150px] rounded-md text-white font-semibold py-2'>Login</button>
          </form>
        </motion.div>
      </motion.div>

      <LoginFooter />

    </div>
  )
}

export default Login