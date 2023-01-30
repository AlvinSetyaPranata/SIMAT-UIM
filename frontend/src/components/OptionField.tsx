import { FC } from 'react'

interface Props {
    title: string
    name: string
    items: Array<string>
    readonly?: boolean
    defaultChecked? : string
  }

const OptionField: FC<Props> = ({title, items, name, readonly, defaultChecked=''}) => {

  return (
    <div className='container '>
        <h3 className='font-semibold text-base'>{title}</h3>
        <select className='border-2 border-slate-c1 rounded-md p-2 w-full mt-2 text-base' name={name} disabled={readonly}>
            {items.map((item, index) => {
                    return <option key={index} value={item} defaultChecked={item === defaultChecked ? true : false}>{item}</option>
                })
            }
        </select>
    </div>
  )
}

export default OptionField