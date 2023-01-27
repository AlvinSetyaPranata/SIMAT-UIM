import { FC, useState } from 'react'

interface Props {
    desc: string
    duration?: number
}


const Popup: FC<Props> = ({desc, duration = 1000}) => {

    const [isTimeout, setIsTimeout] = useState(false)

    setTimeout(() => setIsTimeout(true), 1000)


    return (
        <div className={`fixed bg-cancel-btn w-[300px] py-4 left-1/2 -translate-x-1/2 top-5  ${isTimeout ? 'translate-y-[-100px] opacity-0 transition-all duration-500' : ''}`}>
            <h2 className='font-bold text-white text-xl text-center'>{desc}</h2>
        </div>
    )
}

export default Popup