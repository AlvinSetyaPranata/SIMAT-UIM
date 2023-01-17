import Logo from '../assets/login-decor.png'


function LoginFooter() {
  return (
    <div className="login w-full absolute bottom-0 left-0">
      <h2 className='font-semibold text-white relative text-right mr-10 top-[60px] text-sm'>© 2023 Universitas Islam Madura. Copyright All rights reserved</h2>
      <img src={Logo} alt="logo" className='w-full h-[80px] hidden md:block' />
    </div>
  )
}

export default LoginFooter