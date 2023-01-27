import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/Table'
import { verifyToken } from '../../hooks/useToken'


const Payment: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const tokenValid = verifyToken()
    
        console.log(tokenValid)
    
        if (!tokenValid) {
          navigate('/login')
        }
      }, [])

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