import { FC, useState, SyntheticEvent, useContext, useEffect } from 'react'
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
  
  const { navigate, transition, tokenStatus, setTokenStatus } = useContext(Context)
  
  const activeTabs = 'text-primary bg-white'
  const InactiveTabs = 'text-white bg-primary hover:bg-[rgba(255,255,255,0.25)]'
  

  interface regisForm {
    fullName: string
    nik: number
    placeBirth: string
    gender: string
    dateBirth: number
    monthBirth: number
    yearBirth: number
    religion: string
    email: string
    phoneNumber: number
    addr: string
    postalCode: number
    province: string
    districts: string
    subDistricts: string
    lastEdu: string
    schoolName: string
    schoolAddr: string
    firstOpt: string
    secondOpt: string
    lastOpt: string
    username: string
    password: string
  }

  const fieldData: regisForm = {
    fullName: '',
    nik: 0,
    placeBirth: '',
    gender: '',
    dateBirth: 0,
    monthBirth: 0,
    yearBirth: 0,
    religion: '',
    email: '',
    phoneNumber: 0,
    addr: '',
    postalCode: 0,
    province: '',
    districts: '',
    subDistricts: '',
    lastEdu: '',
    schoolName: '',
    schoolAddr: '',
    firstOpt: '',
    secondOpt: '',
    lastOpt: '',
    username: '',
    password: ''
  }

  const [data, setData] = useState<regisForm>(fieldData)

  const majors: Array<string> = [
    "TIDAK ADA",
    "TEKNIK INFORMATIKA",
    "SISTEM INFORMASI",
    "HUKUM",
    "KEBIDANAN",
    "PERIKANAN",
    "EKONOMI"
  ]


  function getCurretnTab(id: number) {
    return currentTabs === id ? activeTabs : InactiveTabs
  }


  function handleEdit(event: SyntheticEvent<HTMLSelectElement>) {
    event.currentTarget.value === "edit" ? setEditState(true) : setEditState(false)
  }

  useEffect(() => {
    const { token, refresh } = getToken()
    verifyToken(setTokenStatus)


    if (!tokenStatus || !token || !refresh || !localStorage.getItem("username")) {
      navigate('/login')
    }
    
    useGetData("detail", setData)

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
              <NormalField name="fullName" title="Nama Lengkap" span={2} readonly={!editState} defaultValue={data!.fullName} />
              <NormalField name="nik" type="number" title="NIK ( Nomer Induk Kependudukan )" readonly={!editState} defaultValue={data!.nik}/>
              <NormalField name="placeBirth" title="Tempat Lahir" readonly={!editState} defaultValue={data!.placeBirth}/>
              <OptionField name="gender" title="Jenis Kelamin" items={["Pria", "Wanita"]} readonly={!editState} defaultChecked={data!.gender}/>
              <DateField names={["dateBirth", "monthBirth", "yearBirth"]} title="Tanggal Lahir" readonly={!editState} defaultValue={[data!.dateBirth, data!.monthBirth, data!.yearBirth]}/>
              <NormalField readonly={!editState} name="religion" title="Agama" defaultValue={data!.religion}/>
              <NormalField readonly={!editState} name="email" type="email" title="Email" defaultValue={data!.email}/>
              <NormalField readonly={!editState} name="phoneNumber" type="number" title="Nomor Telepon" defaultValue={data!.phoneNumber}/>
            </div>
          </div>
        }



        {
          currentTabs === 2 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-4 gap-x-6 gap-y-8' id='addr-data'>
              <TextField name="addr" title="Alamat" readonly={!editState} defaultValue={data!.addr}/>
              <NormalField readonly={!editState} name="postalCode" title="Kode Pos" defaultValue={data!.postalCode}/>
              <NormalField readonly={!editState} name="province" title="Provinsi" defaultValue={data!.province}/>
              <NormalField readonly={!editState} name="districts" title="Kabupaten" defaultValue={data!.districts}/>
              <NormalField readonly={!editState} name="subDistricts" title="Kecamatan" defaultValue={data!.subDistricts}/>
            </div>
          </div>

        }

        {
          currentTabs === 3 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8' id='education-data'>
              <OptionField name="lastEdu" title="Pendidikan Terakhir" items={["SMA", "SMK", "MA"]} readonly={!editState} defaultChecked={data!.lastEdu}/>
              <NormalField readonly={!editState} name="schoolName" title="Nama Sekolah" defaultValue={data!.schoolName}/>
              <NormalField readonly={!editState} name="schoolAddr" title="Alamat Sekolah" defaultValue={data!.schoolAddr}/>
            </div>
          </div>

        }


        {
          currentTabs === 4 &&
          <div className='w-full' >
            <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8' id='majority-data'>
              <OptionField name="firstOpt" title="Pilihan Pertama" items={majors} defaultChecked={data!.firstOpt}/>
              <OptionField name="secondOpt" title="Pilihan Kedua" items={majors} defaultChecked={data!.secondOpt}/>
              <OptionField name="lastOpt" title="Pilihan Terakhir" items={majors} defaultChecked={data!.lastOpt}/>
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