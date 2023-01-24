import { FC } from 'react'
import NormalField from '../../components/NormalField'


const Account: FC = () => {

    return (
        <div className='container mx-auto py-16'>
            <div className='w-[80%] h-max grid grid-cols-2 gap-8'>
                <NormalField readonly={true} name="username" title="Username" />
                <NormalField readonly={true} displayEye={false} name="password" type='password' title="Password" defaultValue='tanya ke bagian baak ya ^-^'/>
            </div>

            <h2 className='font-bold text-xl text-slate-400 mt-16'>Informasi anda harap untuk dijaga dengan baik ya ^_^  </h2>
        </div>
    )
}


export default Account