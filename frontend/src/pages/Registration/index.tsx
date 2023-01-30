import { ChangeEvent, SyntheticEvent, FC, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DateField from '../../components/DateField'
import FormTitle from '../../components/FormTitle'
import NormalField from '../../components/NormalField'
import OptionField from '../../components/OptionField'
import TextField from '../../components/TextField'
import { useToken } from '../../hooks/useToken'

const Registration: FC = () => {

    const tokenFetcher = useToken()

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

    const formStorage: regisForm = {
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

    const [active, setActive] = useState<boolean>(true)

    const majors: Array<string> = [
        "TIDAK ADA",
        "TEKNIK INFORMATIKA",
        "SISTEM INFORMASI",
        "HUKUM",
        "KEBIDANAN",
        "PERIKANAN",
        "EKONOMI"
    ]

    function toogleAgreement(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setActive(false)
        } else {
            setActive(true)
        }
    }



    function handleSubmit(event: any) {
        event.preventDefault()

        const elements = document.querySelectorAll("input, select") as any
        let password: string = ""

        try{
            elements.forEach((e: HTMLInputElement) => {
                let name = e.name
                let value = e.value

                if (!value) {
                    throw new Error(`${name} Harap Diisi`)
                }
                
                else if (name === "password") {
                    password = e.value
                }
                
                else if (name === "confirm-password" && value !== password) {
                    throw new Error(`Password tidak sama`)
                }

                else if (name) return
    
                formStorage[name] = value
            })
        } catch (e) {
            alert(`${e} Harap Diisi`)
            return
        }

        fetch("http://localhost:8000/api/user/register/", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            method: "post",
            mode: "cors",
            body: JSON.stringify(formStorage)
        })
            .then(res => {                
                const resJson = res.json()
                
                if (res.status == 400) {
                    alert("Masalah ditemukan harap hubungi petugas BAAK!")
                    return false
                }
                return resJson
            })
            .then(resData => {
                if (resData) {
                    const success = tokenFetcher({username: formStorage.username, password: formStorage.password})
                
                    if (success){
                        navigate("/dashboard/detail")
                        localStorage.setItem("username", resData["username"])
                        return
                    }

                    alert("Something wrong!")
                } 
            })
    }


    const navigate = useNavigate()

    return (
        <div className='container w-[1200px] py-12 mx-auto'>

            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/login")}>
                <path d="M38 13.5C38.8284 13.5 39.5 12.8284 39.5 12C39.5 11.1716 38.8284 10.5 38 10.5V13.5ZM0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM38 10.5L2 10.5V13.5L38 13.5V10.5Z" fill="black" />
            </svg>


            <form onSubmit={handleSubmit}>
                <div className='grid place-items-center gap-24 mt-12'>
                    <div className='w-full'>
                        <FormTitle title="Data diri" />
                        <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8 mt-8' id='personal-data'>
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
                    <div className='w-full' >
                        <FormTitle title="Data Alamat Asal" />
                        <div className='w-full h-max grid grid-cols-4 gap-x-6 gap-y-8 mt-8' id='addr-data'>
                            <TextField name="addr" title="Alamat" />
                            <NormalField name="postalCode" title="Kode Pos" />
                            <NormalField name="province" title="Provinsi" />
                            <NormalField name="districts" title="Kabupaten" />
                            <NormalField name="subDistricts" title="Kecamatan" />
                        </div>
                    </div>

                    <div className='w-full' >
                        <FormTitle title="Data Pendidikan" />
                        <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8 mt-8' id='education-data'>
                            <OptionField name="lastEdu" title="Pendidikan Terakhir" items={["SMA", "SMK", "MA"]} />
                            <NormalField name="schoolName" title="Nama Sekolah" />
                            <NormalField name="schoolAddr" title="Alamat Sekolah" />
                        </div>
                    </div>

                    <div className='w-full' >
                        <FormTitle title="Data Pilihan Program Studi" />
                        <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8 mt-8' id='majority-data'>
                            <OptionField name="firstOpt" title="Pilihan Pertama" items={majors} />
                            <OptionField name="secondOpt" title="Pilihan Kedua" items={majors} />
                            <OptionField name="lastOpt" title="Pilihan Terakhir" items={majors} />
                        </div>
                    </div>

                    <div className='w-full' >
                        <FormTitle title="Data Akun" />
                        <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8 mt-8' id='majority-data'>
                            <NormalField type='text' name='username' title='Username' />
                            <NormalField type='password' name='password' title='Password' />
                            <NormalField  type='password' name='confirm-password' title='Konfirmasi Password' />
                        </div>
                    </div>

                    <div className='w-full flex items-center gap-4'>
                        <input type="checkbox" className='w-[20px] h-[20px]' required onChange={toogleAgreement} />
                        <span className='font-bold'>Saya mengisi form ini atas diri saya sendiri, saya akan menerima segala konsekuensi apa bila ada kesalahan dalam pengisian. secara sengaja atau tidak</span>
                    </div>

                    <div className='flex w-full gap-4 justify-end'>
                        <Link to="/login" className='bg-cancel-btn px-8 py-4 rounded-md text-white font-semibold'>Batalkan Perubahan</Link>
                        <button type="submit" onClick={handleSubmit} className='bg-accept-btn px-8 py-4 rounded-md text-white font-semibold disabled:opacity-50' disabled={active}>Simpan Perubahan</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Registration