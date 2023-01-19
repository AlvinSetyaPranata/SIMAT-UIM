import { FC } from 'react'

interface Props {
    title: string,
    span?: number,
    type?: string
}


const NormalField: FC<Props> = ({title, span=0, type="text"}) => {
  return (
    <div className={`container w-full ${span!==0 ? `col-span-${span}` : ''}`}>
        <h3 className='font-semibold text-base'>{title}</h3>
        <input type={type} className='border-2 border-slate-c1 rounded-md p-2 w-full mt-2 text-base'/>
    </div>
  )
}

export default NormalField