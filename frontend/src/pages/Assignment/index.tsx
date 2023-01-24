import { FC } from 'react'
import Table from '../../components/Table'


const Assignment: FC = () => {
    
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