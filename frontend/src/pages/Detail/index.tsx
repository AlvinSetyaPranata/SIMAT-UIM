import { FC, useState, SyntheticEvent, useEffect, useContext } from 'react'
import DateField from '../../components/DateField'
import NormalField from '../../components/NormalField'
import OptionField from '../../components/OptionField'
import TextField from '../../components/TextField'
import { Link } from 'react-router-dom'
import { getToken, verifyToken } from '../../hooks/useToken'
import useGetData from '../../hooks/useGetData'
import { Context } from '../../Contexts/Globals'


const Detail: FC = () => {

  const [currentTabs, setCurrentTabs] = useState<number>(1)
  const [editState, setEditState] = useState<boolean>(false)
  const {navigate,} = useContext(Context)


  const fieldData = {
    fullname: ''
  }


  const activeTabs = 'text-primary bg-white'
  const InactiveTabs = 'text-white bg-primary hover:bg-[rgba(255,255,255,0.25)]'

  function getCurretnTab(id: number) {
    return currentTabs === id ? activeTabs : InactiveTabs
  }


  function handleEdit(event: SyntheticEvent<HTMLSelectElement>) {
    event.currentTarget.value === "edit" ? setEditState(true) : setEditState(false)
  }

  useEffect(() => {
    const {token, refresh} = getToken()
    const tokenValid = verifyToken()

    if (!tokenValid || !token || !refresh || !localStorage.getItem("username")) {
      navigate('/login')
    }

    const data: Promise<false|undefined> = useGetData("detail")

  }, [])


  return (
    <div className='h-max w-full p-6'>
      <div className='w-full bg-primary rounded-xl p-4 flex gap-8 justify-start items-center'>
        <button onClick={() => setCurrentTabs(1)} className={`min-w-[150px] py-3 rounded-xl text-lg font-bold ${getCurretnTab(1)}`}>Data diri</button>
        <button onClick={() => setCurrentTabs(2)} className={`min-w-[150px] py-3 rounded-xl text-lg font-bold ${getCurretnTab(2)}`}>Alamat</button>
        <button onClick={() => setCurrentTabs(3)} className={`min-w-[150px] py-3 rounded-xl text-lg font-bold ${getCurretnTab(3)}`}>Asal Sekolah</button>
        <button onClick={() => setCurrentTabs(4)} className={`min-w-[150px] py-3 rounded-xl text-lg font-bold ${getCurretnTab(4)}`}>Pilihan Jurusan</button>
        <select className='rounded-xl text-lg font-bold bg-white text-primary px-6 py-2 outline-primary ml-auto' onChange={handleEdit}>
          <option value="" defaultChecked={true}>Aksi</option>
          <option value="edit">Edit</option>
        </select>
      </div>


      <div className='grid place-items-center gap-24 mt-12'>

        {
          currentTabs === 1 &&
          <div className='w-full'>
            <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8' id='personal-data'>
              <NormalField name="fullName" title="Nama Lengkap" span={2} readonly={!editState} defaultValue={fieldData.fullname}/>
              <NormalField name="nik" title="NIK ( Nomer Induk Kependudukan )" readonly={!editState}/>
              <NormalField name="placeBirth" title="Tempat Lahir" readonly={!editState}/>
              <OptionField name="gender" title="Jenis Kelamin" items={["Pria", "Wanita"]} readonly={!editState}/>
              <DateField names={["dateBirth", "monthBirth", "yearBirth"]} title="Tanggal Lahir" readonly={!editState}/>
              <NormalField readonly={!editState} name="religion" title="Agama" />
              <NormalField readonly={!editState} name="email" type="email" title="Email" />
              <NormalField readonly={!editState} name="phoneNumber" type="number" title="Nomor Telepon" />
            </div>
          </div>
        }



        {
          currentTabs === 2 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-4 gap-x-6 gap-y-8' id='addr-data'>
              <TextField name="addr" title="Alamat" readonly={!editState}/>
              <NormalField readonly={!editState} name="postalCode" title="Kode Pos" />
              <NormalField readonly={!editState} name="province" title="Provinsi" />
              <NormalField readonly={!editState} name="districts" title="Kabupaten" />
              <NormalField readonly={!editState} name="subDistricts" title="Kecamatan" />
            </div>
          </div>

        }

        {
          currentTabs === 3 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8' id='education-data'>
              <OptionField name="lastEdu" title="Pendidikan Terakhir" items={["SMA", "SMK", "MA"]} readonly={!editState}/>
              <NormalField readonly={!editState} name="schoolName" title="Nama Sekolah" />
              <NormalField readonly={!editState} name="schoolAddr" title="Alamat Sekolah" />
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
          editState &&
          <div className='flex w-full gap-4 justify-end'>
            <Link to="/login" className='bg-cancel-btn px-8 py-4 rounded-md text-white font-semibold'>Batalkan Perubahan</Link>
            <button type="submit" className='bg-accept-btn px-8 py-4 rounded-md text-white font-semibold disabled:opacity-50'>Simpan Perubahan</button>
          </div>
        }



      </div>

    </div>
  )
}

export default Detail