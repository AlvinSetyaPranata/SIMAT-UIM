import { FC } from 'react'
import SamplePic from '../assets/sample-pic.png'

const Navbar: FC = () => {
    
    return (
        <div className='w-full flex justify-between py-6 px-16 items-center box-border'>
            <div className='flex items-center gap-12'>
                <img src={SamplePic} className="rounded-full w-[140px]" alt="picture" />
                <div>
                    <h2 className='text-3xl font-bold'>Halo, kak Alvin</h2>
                    <p className='text-slate-400 text-xl font-semibold'>Selamat datang di dashboardmu!</p>
                </div>
            </div>

            <button className='px-24 font-semibold py-4 text-xl rounded-md bg-cancel-btn text-white h-fit'>Logout</button>
        </div>
    )
}

export default Navbar