import { FC } from 'react'


interface Props {
    title: string
}


const FormTitle: FC<Props> = ({title}) => {
  return (
    <div className='w-full bg-form-bg p-4 rounded-md'>
        <h3 className='text-form-text text-base font-bold'>{title}</h3>
    </div>
  )
}

export default FormTitle