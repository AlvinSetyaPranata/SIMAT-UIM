import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '../../hooks/useToken'

const About: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const tokenValid = verifyToken()
    
        console.log(tokenValid)
    
        if (!tokenValid) {
          navigate('/login')
        }
      }, [])


    return (
        <div className='container mx-auto grid place-items-center'>
            <h1 className='text-4xl font-bold text-center'>Sistem Informasi Akademik Terpadu</h1>
            <p className='font-semibold text-slate-300 text-2xl text-center mt-2'>Sweet Manggo - v.4.0</p>
            <h2 className='text-xl mt-4 font-semibold'>©2023 Universitas Islam Madura. Copyright All rights reserved</h2>


            <div className='mt-24 flex flex-col items-center gap-12'>
                <h1 className='font-bold text-3xl'>Designed and Created by</h1>
                <div className='flex items-center gap-6'>
                    <img src="/developer.png" alt="developer-img" className='w-[150px]' />
                    <div>
                        <h3 className='font-bold text-3xl'>Sanscode Group</h3>
                        <p className='font-semibold text-xl text-slate-400'>Learn from zero to hero</p>
                        <button className='mt-8 text-blue-400 font-semibold text-lg' onClick={() => {window.location.href = "https://pamekasancode.github.io/"}}>Out sites</button>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default About