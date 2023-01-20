import { FC } from 'react'


interface Props {
    title: string
    name: string
}


const TextField: FC<Props> = ({title, name}) => {
  return (
    <div className='col-span-3'>
        <h3 className='font-semibold text-base'>{title}</h3>
        <textarea className='mt-2 rounded-md border-2 border-slate-c1 p-2 w-full' name={name}/>
    </div>
  )
}

export default TextField