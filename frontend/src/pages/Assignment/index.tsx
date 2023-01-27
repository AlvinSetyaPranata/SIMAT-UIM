import { FC, useEffect, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/Table'
import { verifyToken } from '../../hooks/useToken'


const Assignment: FC = () => {

    const [isPending, startTransition] = useTransition()
    const navigate = useNavigate()

    const colsName = [
        "Mata Kuliah",
        "SKS",
        "Bobot",
        "Huruf",
        "Indeks",
        "(SKS x Nilai Index)",
        "Predikat",
        "Status"
    ]

    const bodyContent = [
        ["Bahasa Indonesia", "2", "93", "A", "3.75", "3.75", "A", "LULUS"],
        ["Matematika Komputasi", "3", "96", "A", "2.75", "2.75", "D", "TIDAK LULUS"],
    ]

    useEffect(() => {
        const tokenValid = verifyToken()
        
        if (!tokenValid) {
          navigate('/login')
        }
      }, [])

    
    return (
        <div className='container mx-auto w-full min-h-screen'>
            <div className='w-full flex justify-between items-center box-border mb-4'>
                <h2 className='text-slate-400 font-semibold text-xl'>Semester 2</h2>
                <h2 className='text-slate-400 font-semibold text-xl'>TI-B</h2>
            </div>

            <Table HeadItems={colsName} BodyItems={bodyContent} ShouldMarked={["LULUS", "TIDAK LULUS"]} />

        </div>
    )
}


export default Assignment