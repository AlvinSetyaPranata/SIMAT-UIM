import { FC } from 'react'


interface Props {
    title: string
    names: Array<string>
}

const DateField: FC<Props> = ({ title, names }) => {


    return (
        <div>
            <h3 className='font-semibold text-base'>{title}</h3>
            <div className='flex justify-start gap-4  mt-2'>                
                <input name={names[0]} type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[60px] ' placeholder='DD' maxLength={2} />
                <input name={names[1]} type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[60px] ' placeholder='MM' maxLength={2} />
                <input name={names[2]} type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[80px] ' placeholder='YYYY' min={4}/>
            </div>
        </div>
    )
}

export default DateField