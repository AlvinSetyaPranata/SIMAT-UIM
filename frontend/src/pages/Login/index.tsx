import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../../assets/logo-uim.png'
import LoginFooter from '../../components/LoginFooter'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import Eye from '../../assets/eye.png'
import EyeOff from '../../assets/eye-off.png'
import useLoginValidate from '../../hooks/useLoginValidate'

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

  const [revealPassword, setRevealPassword] = useState<Boolean>(false)



  const [Postfn, state] = useLoginValidate()


  function handleReveal() {
    if (revealPassword) {
      setRevealPassword(false)
    } else {
      setRevealPassword(true)
    }
  }

  // useEffect(() => console.log(state.msg), [state])

  const handleForm = (event: SyntheticEvent) => {
    event.preventDefault()

    Postfn({username: username.current!.value, password: password.current!.value})
  }

  return (
    <div className="min-h-screen w-screen box-border flex justify-center items-center flex-col gap-8">
      <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { ease: "linear", duration: 1 } }} className='text-3xl font-bold'>SELAMAT DATANG</motion.h1>
      <motion.div className="container mx-auto w-[500px] flex shadow-lg z-10 overflow-hidden" variants={variants} initial='containerInit' animate='containerAnimate'>

        <div className="relative bg-primary p-6 grid place-items-center w-[500px] py-16 px-6 flex-shrink-0 flex-grow-0">
          <h1 className='text-xl font-semibold text-white mb-12'>SISTEM INFORMASI AKADEMIK TERPADU</h1>
          <img src={Logo} alt="logo" />
          <h2 className='text-3xl font-bold text-white mt-8'>Universitas Islam Madura</h2>
          <h3 className='text-xl font-semibold text-yellow-custom mt-4'>Kampus 5 Menara Ilmu</h3>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { ease: 'easeIn', delay: 1.5 } }} className='grid w-[50%] bg-red-blue place-items-center'>
          <form className='grid gap-y-12' onSubmit={handleForm}>
            <div className='grid'>
              <div className='flex justify-between w-full items-center'>
                <label className='font-semibold text-lg'>Username</label>
                <span className={`text-red-400 font-semibold text-sm ${state.type === 'username' ? state.spanCls : 'opacity-0'} empty:opacity-0`}>{state.msg}</span>
              </div>

              <input type="text" ref={username} className={`py-[6px] w-[300px] outline-none px-4 rounded-md border-2 mt-2 ${state.type === 'username' ? state.inputCls : ''} focus:border-slate-100`} />
              <Link to='/register' className='text-link text-right font-semibold text-sm'>Belum terdaftar?</Link>
            </div>



            {/* password */}
            <div className='grid gap-y-2'>
              <div className='flex justify-between w-full items-center'>
                <label className='font-semibold text-lg'>Password</label>
                <span className={`text-red-400 font-semibold text-sm ${state.type === 'password' ? state.spanCls : 'opacity-0'} empty:opacity-0`}>{state.msg}</span>
              </div>
              <div className='flex w-full items-center'>
                <input type={revealPassword ? 'text' : 'password'} ref={password} className={`py-[6px] w-[300px] outline-none px-4 rounded-md border-2 mt-2 ${state.type === 'password' ? state.inputCls : ''} focus:border-slate-100`} />
                <img src={revealPassword ? Eye : EyeOff} className="w-[20px] h-[20px] ml-4" alt="reveal" onClick={handleReveal} />
              </div>

              <Link to='' className='text-link text-right font-semibold text-sm'>Lupa Password?</Link>
            </div>
            <button type="submit" className='bg-primary max-w-[150px] rounded-md text-white font-semibold py-2'>Login</button>
          </form>
        </motion.div>
      </motion.div>

      <LoginFooter />

    </div>
  )
}

export default Login