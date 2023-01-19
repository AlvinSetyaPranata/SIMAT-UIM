import { FC } from 'react'


interface Props {
    title: string
}

const DateField: FC<Props> = ({ title }) => {


    return (
        <div>
            <h3 className='font-semibold text-base'>{title}</h3>
            <div className='flex justify-start gap-4  mt-2'>                
                <input type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[60px] ' placeholder='DD' maxLength={2} />
                <input type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[60px] ' placeholder='MM' maxLength={2} />
                <input type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[80px] ' maxLength={4} placeholder='YYYY' />
            </div>
        </div>
    )
}

export default DateField