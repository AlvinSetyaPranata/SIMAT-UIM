import { FC, useState } from 'react'
import Eye from '../assets/eye.png'
import EyeOff from '../assets/eye-off.png'

interface Props {
  title: string
  name: string
  required?: boolean
  span?: number
  type?: string
  readonly?: boolean
  externalStyle?: string
  defaultValue?: string
  displayEye?: boolean
}


const NormalField: FC<Props> = ({ title, name, span = 0, type = "text", required = true, readonly = false, externalStyle = '', defaultValue = '', displayEye = true}) => {

  const [reveal, setReveal] = useState(true)

  return (
    <div className={`container w-full ${span !== 0 ? `col-span-${span}` : ''}`}>
      <div className='w-full flex'>
        <h3 className='font-semibold text-base'>{title}</h3>
        <span className={`text-red-500 text-xl ml-2 ${readonly ? 'hidden' : ''}`}>*</span>
      </div>
      <div className='w-full flex items-center'>
        <input name={name} type={type === 'password' && reveal ? 'password' : 'text'} className={`border-2 border-slate-c1 rounded-md p-2 w-full mt-2 text-base ${externalStyle}`} required={required} readOnly={readonly} value={defaultValue}/>
        {
          type === "password" && displayEye && <img src={reveal === false ? Eye : EyeOff} alt="reveal-icon" onClick={() => reveal === false ? setReveal(true) : setReveal(false)} className='w-[25px] h-[25px] ml-4' />
        }
      </div>
    </div>
  )
}

export default NormalField