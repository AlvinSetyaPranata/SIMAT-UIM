import { ChangeEvent, MouseEventHandler,  FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DateField from '../../components/DateField'
import FormTitle from '../../components/FormTitle'
import NormalField from '../../components/NormalField'
import OptionField from '../../components/OptionField'
import TextField from '../../components/TextField'

const Registration: FC = () => {


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
        const inputs = document.getElementsByTagName("input")
        const options = document.getElementsByTagName("select")

        Array.from(inputs).forEach(e => {
            console.log(e.value)
        })

        Array.from(options).forEach(e => {
            console.log(e.value)
        })
    }

    const navigate = useNavigate()

    return (
        <div className='container w-[1200px] py-12 mx-auto'>

            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/login")}>
                <path d="M38 13.5C38.8284 13.5 39.5 12.8284 39.5 12C39.5 11.1716 38.8284 10.5 38 10.5V13.5ZM0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM38 10.5L2 10.5V13.5L38 13.5V10.5Z" fill="black" />
            </svg>


            <div className='grid place-items-center gap-16 mt-12'>
                <div className='w-full'>
                    <FormTitle title="Data diri" />
                    <div className='w-full h-max grid grid-cols-3 gap-x-6 gap-y-8 mt-8'>
                        <NormalField title="Nama Lengkap" span={2} />
                        <NormalField title="NIK ( Nomer Induk Kependudukan )" />
                        <NormalField title="Tempat Lahir" />
                        <OptionField title="Jenis Kelamin" items={["Pria", "Wanita"]} />
                        <DateField title="Tanggal Lahir" />
                        <NormalField title="Agama" />
                        <NormalField type="email" title="Email" />
                        <NormalField type="number" title="Nomor Telepon" />
                    </div>
                </div>
                <div className='w-full'>
                    <FormTitle title="Data Alamat Asal" />
                    <div className='w-full h-max grid grid-cols-4 gap-x-6 gap-y-8 mt-8'>
                        <TextField title="Alamat" />
                        <NormalField title="Kode Pos" />
                        <NormalField title="Provinsi" />
                        <NormalField title="Kabupaten" />
                        <NormalField title="Kecamatan" />
                    </div>
                </div>

                <div className='w-full'>
                    <FormTitle title="Data Pendidikan" />
                    <div className='w-full h-max grid grid-cols-4 gap-x-6 gap-y-8 mt-8'>
                        <OptionField title="Pendidikan Terakhir" items={["SMA", "SMK", "MA"]} />
                        <NormalField title="Nama Sekolah" />
                        <NormalField title="Alamat Sekolah" />
                    </div>
                </div>

                <div className='w-full'>
                    <FormTitle title="Data Pilihan Program Studi" />
                    <div className='w-full h-max grid grid-cols-4 gap-x-6 gap-y-8 mt-8'>
                        <OptionField title="Pilihan Pertama" items={majors} />
                        <OptionField title="Pilihan Kedua" items={majors}/>
                        <OptionField title="Pilihan Terakhir" items={majors}/>
                    </div>
                </div>

                <div className='w-full flex items-center gap-4'>
                    <input type="checkbox" className='w-[20px] h-[20px]' required onChange={toogleAgreement} />
                    <span className='font-bold'>Saya mengisi form ini atas diri saya sendiri, saya akan menerima segala konsekuensi apa bila ada kesalahan dalam pengisian. secara sengaja atau tidak</span>
                </div>

                <div className='flex w-full gap-4 justify-end'>
                    <Link to="/login" className='bg-cancel-btn px-8 py-4 rounded-md text-white font-semibold'>Batalkan Perubahan</Link>
                    <button onClick={handleSubmit} className='bg-accept-btn px-8 py-4 rounded-md text-white font-semibold disabled:opacity-50' disabled={active}>Simpan Perubahan</button>
                </div>
            </div>
        </div>
    )
}

export default Registration