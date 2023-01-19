import { FC } from 'react'

interface Props {
    title: string,
    items: Array<string>
}

const OptionField: FC<Props> = ({title, items}) => {


  return (
    <div className='container '>
        <h3 className='font-semibold text-base'>{title}</h3>
        <select className='border-2 border-slate-c1 rounded-md p-2 w-full mt-2 text-base'>
            {items.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                })
            }
        </select>
    </div>
  )
}

export default OptionField