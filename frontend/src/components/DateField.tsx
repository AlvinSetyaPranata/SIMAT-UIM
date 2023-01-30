import { FC } from 'react'


interface Props {
    title: string
    names: Array<string>
    readonly?: boolean
    defaultValue? : [number, number, number]
}

const DateField: FC<Props> = ({ title, names, readonly=false, defaultValue=[0, 0, 0] }) => {

    return (
        <div>
            <h3 className='font-semibold text-base'>{title}</h3>
            <div className='flex justify-start gap-4  mt-2'>                
                <input readOnly={readonly} name={names[0]} type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[90px] ' placeholder='DD' maxLength={2} defaultValue={defaultValue[0]}/>
                <input readOnly={readonly} name={names[1]} type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[90px] ' placeholder='MM' maxLength={2} defaultValue={defaultValue[1]}/>
                <input readOnly={readonly} name={names[2]} type="number" className='border-2 border-slate-c1 rounded-md p-2 text-sm w-[120px] ' placeholder='YYYY' min={4} defaultValue={defaultValue[2]}/>
            </div>
        </div>
    )
}

export default DateField