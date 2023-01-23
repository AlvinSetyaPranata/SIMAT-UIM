import { FC, useState } from 'react'
import DateField from '../../components/DateField'
import FormTitle from '../../components/FormTitle'
import NormalField from '../../components/NormalField'
import OptionField from '../../components/OptionField'
import TextField from '../../components/TextField'
import { Link } from 'react-router-dom'


const Detail: FC = () => {

  const [currentTabs, setCurrentTabs] = useState<number>(1)

  const activeTabs = 'text-primary bg-white'
  const InactiveTabs = 'text-white bg-primary hover:bg-[rgba(255,255,255,0.25)]'

  function getCurretnTab(id: number) {
    return currentTabs === id ? activeTabs : InactiveTabs
  }

  return (
    <div className='h-max w-full p-6'>
      <div className='w-full bg-primary rounded-md p-4 flex gap-6 justify-start items-center'>
        <button onClick={() => setCurrentTabs(1)} className={`min-w-[150px] py-3 rounded-xl text-lg font-bold ${getCurretnTab(1)}`}>Data diri</button>
        <button onClick={() => setCurrentTabs(2)} className={`min-w-[150px] py-3 rounded-xl text-lg font-bold ${getCurretnTab(2)}`}>Alamat</button>
        <button onClick={() => setCurrentTabs(3)} className={`min-w-[150px] py-3 rounded-xl text-lg font-bold ${getCurretnTab(3)}`}>Data diri</button>
      </div>


      <div className='grid place-items-center gap-24 mt-12'>

        {
          currentTabs === 1 &&
          <div className='w-full'>
            <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8' id='personal-data'>
              <NormalField name="fullName" title="Nama Lengkap" span={2} />
              <NormalField name="nik" title="NIK ( Nomer Induk Kependudukan )" />
              <NormalField name="placeBirth" title="Tempat Lahir" />
              <OptionField name="gender" title="Jenis Kelamin" items={["Pria", "Wanita"]} />
              <DateField names={["dateBirth", "monthBirth", "yearBirth"]} title="Tanggal Lahir" />
              <NormalField name="religion" title="Agama" />
              <NormalField name="email" type="email" title="Email" />
              <NormalField name="phoneNumber" type="number" title="Nomor Telepon" />
            </div>
          </div>
        }



        {
          currentTabs === 2 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-4 gap-x-6 gap-y-8' id='addr-data'>
              <TextField name="addr" title="Alamat" />
              <NormalField name="postalCode" title="Kode Pos" />
              <NormalField name="province" title="Provinsi" />
              <NormalField name="districts" title="Kabupaten" />
              <NormalField name="subDistricts" title="Kecamatan" />
            </div>
          </div>

        }

        {
          currentTabs === 3 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8' id='education-data'>
              <OptionField name="lastEdu" title="Pendidikan Terakhir" items={["SMA", "SMK", "MA"]} />
              <NormalField name="schoolName" title="Nama Sekolah" />
              <NormalField name="schoolAddr" title="Alamat Sekolah" />
            </div>
          </div>

        }


        {
          currentTabs === 4 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8' id='majority-data'>
              <OptionField name="firstOpt" title="Pilihan Pertama" items={[]} />
              <OptionField name="secondOpt" title="Pilihan Kedua" items={[]} />
              <OptionField name="lastOpt" title="Pilihan Terakhir" items={[]} />
            </div>
          </div>
        }

        {
          currentTabs === 5 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8' id='majority-data'>
              <NormalField type='text' name='username' title='Username' />
              <NormalField type='password' name='password' title='Password' />
              <NormalField type='password' name='confirm-password' title='Konfirmasi Password' />
            </div>
          </div>
        }

        <div className='flex w-full gap-4 justify-end'>
          <Link to="/login" className='bg-cancel-btn px-8 py-4 rounded-md text-white font-semibold'>Batalkan Perubahan</Link>
          <button type="submit" className='bg-accept-btn px-8 py-4 rounded-md text-white font-semibold disabled:opacity-50'>Simpan Perubahan</button>
        </div>
      </div>

    </div>
  )
}

export default Detail