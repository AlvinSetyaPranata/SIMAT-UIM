import { FC } from 'react'
import Table from '../../components/Table'


const Payment: FC = () => {

    const Head = ["No", "Keperluan", "Biaya", "Kurangan", "Status"]
    const Body = [
        ["1", "PKKMB", "200.000", "0", "Lunas"],
        ["2", "Semester II", "200.000", "100.000", "Belum Lunas"],
    ]

    return (
        <div className='container mx-auto min-h-screen'>
            <Table HeadItems={Head} BodyItems={Body} ShouldMarked={["Lunas", "Belum Lunas"]} />
        </div>
    )
}


export default Payment