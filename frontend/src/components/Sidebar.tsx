import { FC } from "react"
import Logo from "../assets/logo-uim.png"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"



const Sidebar: FC<{active: boolean}> = ({active}) => {

    const currentLoc = useLocation()
    const navigate = useNavigate()

    const variants = {
        'buttonInitial': {
            x: '0'
        },

        'buttonAnimate': {
            x: '20px',
            transition: {
                ease: 'linear',
                duration: 0.3
            }
        }
    }

    const baseButton = "w-full flex flex-start items-center py-3 px-4 rounded-md"


    function getCurrentLoc(pathId: string) {
        return currentLoc.pathname === pathId
    }




    return (
        <div className={`container left-0 top-0 h-screen bg-primary w-[300px] py-6 flex flex-col justify-between transition-transfrom duration-500 ease-in sticky ${!active ? 'w-[100px] transition-transfrom duration-500 ease-out' : ''}`}>
            
            <div className='flex flex-col items-center w-full gap-8 overflow-hidden mt-24 px-2' >
                <motion.button onClick={() => navigate("/detail")}
                    initial={active ? 'buttonInitial' : ''}
                    animate={getCurrentLoc('/detail') && active ? 'buttonAnimate' : ''}
                    variants={variants}
                    className={`${baseButton} ${!active ? 'w-fit' : ''} ${getCurrentLoc('/detail') ? 'bg-white' : ''}`}>
                    <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M12.6446 12.5002C11.0404 12.5002 9.66717 11.929 8.52481 10.7866C7.38245 9.64426 6.81127 8.271 6.81127 6.66683C6.81127 5.06266 7.38245 3.6894 8.52481 2.54704C9.66717 1.40468 11.0404 0.833496 12.6446 0.833496C14.2488 0.833496 15.622 1.40468 16.7644 2.54704C17.9068 3.6894 18.4779 5.06266 18.4779 6.66683C18.4779 8.271 17.9068 9.64426 16.7644 10.7866C15.622 11.929 14.2488 12.5002 12.6446 12.5002ZM0.977936 24.1668V20.0835C0.977936 19.2571 1.19085 18.4973 1.61669 17.8041C2.04155 17.1119 2.60641 16.5835 3.31127 16.2189C4.81821 15.4654 6.34946 14.9001 7.90502 14.5229C9.46058 14.1466 11.0404 13.9585 12.6446 13.9585C14.2488 13.9585 15.8286 14.1466 17.3842 14.5229C18.9397 14.9001 20.471 15.4654 21.9779 16.2189C22.6828 16.5835 23.2477 17.1119 23.6725 17.8041C24.0984 18.4973 24.3113 19.2571 24.3113 20.0835V24.1668H0.977936Z" className={getCurrentLoc("/detail") ? 'fill-primary' : 'fill-white'} />
                    </svg>
                    <h3 className={`font-semibold text-lg ml-4 ${!active ? 'hidden' : ''} ${getCurrentLoc('/detail') ? 'text-primary' : 'text-white'}`}>Detail Mahasiswa</h3>
                </motion.button>

                <motion.button onClick={() => navigate("/assignments")}
                    initial={active ? 'buttonInitial' : ''}
                    animate={getCurrentLoc('/assignments') && active ? 'buttonAnimate' : ''}
                    variants={variants}
                    className={`${baseButton} ${!active ? 'w-fit' : ''} ${getCurrentLoc('/assignments') ? 'bg-white' : 'bg-primary'}`}>
                    <svg width={30} height={30} viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M17.6567 0L0.156738 6.91492L17.6567 16.1346L25.9918 11.7434L18.1726 9.22439C18.0115 9.30575 17.8353 9.34819 17.6567 9.3486C17.3387 9.3486 17.0337 9.21549 16.8089 8.97855C16.584 8.74161 16.4577 8.42025 16.4577 8.08517C16.4577 7.75009 16.584 7.42873 16.8089 7.19179C17.0337 6.95485 17.3387 6.82174 17.6567 6.82174L17.4584 7.50099L18.8476 7.95132L18.8482 7.95575L20.8982 8.61628L32.5702 12.4002V13.3593C32.4088 13.475 32.2766 13.6305 32.1852 13.8123C32.0937 13.9941 32.0458 14.1967 32.0456 14.4024C32.0458 14.6129 32.0959 14.8199 32.1914 15.0048C32.2868 15.1897 32.4246 15.3465 32.5921 15.461C32.0463 17.6345 32.0456 22.5659 32.0456 24.5098C33.2447 25.3306 33.2447 25.3606 34.4437 24.5098C34.4437 22.5661 34.4431 17.6357 33.8974 15.4617C34.065 15.3471 34.2028 15.1901 34.2982 15.0051C34.3937 14.8201 34.4437 14.6129 34.4437 14.4023C34.4437 14.1964 34.3959 13.9935 34.3045 13.8115C34.213 13.6294 34.0808 13.4737 33.9191 13.3579V11.3506L29.4733 9.90925L35.1567 6.91492L17.6567 0ZM7.43638 12.5861L6.45291 18.8038C8.41452 19.0741 10.761 20.2755 12.9182 21.696C14.145 22.504 15.294 23.3908 16.2273 24.2513C16.7978 24.7772 17.2748 25.2818 17.6567 25.7783C18.0387 25.2817 18.5157 24.7772 19.0862 24.2513C20.0194 23.3908 21.1684 22.504 22.3953 21.696C24.5524 20.2755 26.899 19.0741 28.8606 18.8038L27.8769 12.5861H27.4086L17.6567 17.7238L7.90476 12.5861H7.43638Z" className={getCurrentLoc('/assignments') ? 'fill-primary' : 'fill-white'} />
                    </svg>
                    <h3 className={`font-semibold text-white text-lg ml-4 ${getCurrentLoc('/assignments') ? 'text-primary' : 'text-white'} ${!active ? 'hidden' : ''}`}>Histori Kelulusan</h3>
                </motion.button>


                <motion.button onClick={() => navigate("/payments")}
                    initial={active ? 'buttonInitial' : ''}
                    animate={getCurrentLoc('/payments') && active ? 'buttonAnimate' : ''}
                    variants={variants}
                    className={`${baseButton} ${!active ? 'w-fit' : ''} ${getCurrentLoc('/payments') ? 'bg-white' : 'bg-primary'}`}
                >
                    <svg width={25} height={25} viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M26.7246 6.20833H25.1526V4.75C25.1526 3.58968 24.6558 2.47688 23.7714 1.65641C22.887 0.835936 21.6874 0.375 20.4367 0.375H4.71701C3.46627 0.375 2.26676 0.835936 1.38236 1.65641C0.497952 2.47688 0.00109863 3.58968 0.00109863 4.75V22.25C0.00109863 23.4103 0.497952 24.5231 1.38236 25.3436C2.26676 26.1641 3.46627 26.625 4.71701 26.625H26.7246C27.9753 26.625 29.1748 26.1641 30.0592 25.3436C30.9436 24.5231 31.4405 23.4103 31.4405 22.25V10.5833C31.4405 9.42301 30.9436 8.31021 30.0592 7.48974C29.1748 6.66927 27.9753 6.20833 26.7246 6.20833ZM4.71701 3.29167H20.4367C20.8536 3.29167 21.2535 3.44531 21.5483 3.7188C21.8431 3.99229 22.0087 4.36323 22.0087 4.75V6.20833H4.71701C4.3001 6.20833 3.90026 6.05469 3.60546 5.7812C3.31066 5.50771 3.14504 5.13677 3.14504 4.75C3.14504 4.36323 3.31066 3.99229 3.60546 3.7188C3.90026 3.44531 4.3001 3.29167 4.71701 3.29167ZM28.2966 17.875H26.7246C26.3077 17.875 25.9078 17.7214 25.613 17.4479C25.3182 17.1744 25.1526 16.8034 25.1526 16.4167C25.1526 16.0299 25.3182 15.659 25.613 15.3855C25.9078 15.112 26.3077 14.9583 26.7246 14.9583H28.2966V17.875ZM28.2966 12.0417H26.7246C25.4738 12.0417 24.2743 12.5026 23.3899 13.3231C22.5055 14.1435 22.0087 15.2563 22.0087 16.4167C22.0087 17.577 22.5055 18.6898 23.3899 19.5103C24.2743 20.3307 25.4738 20.7917 26.7246 20.7917H28.2966V22.25C28.2966 22.6368 28.1309 23.0077 27.8361 23.2812C27.5413 23.5547 27.1415 23.7083 26.7246 23.7083H4.71701C4.3001 23.7083 3.90026 23.5547 3.60546 23.2812C3.31066 23.0077 3.14504 22.6368 3.14504 22.25V8.87708C3.65006 9.0419 4.18165 9.12574 4.71701 9.125H26.7246C27.1415 9.125 27.5413 9.27865 27.8361 9.55214C28.1309 9.82563 28.2966 10.1966 28.2966 10.5833V12.0417Z" className={getCurrentLoc('/payments') ? 'fill-primary' : 'fill-white'} />
                    </svg>
                    <h3 className={`font-semibold text-white text-lg ml-4 ${getCurrentLoc('/payments') ? 'text-primary' : 'text-white'} ${!active ? 'hidden' : ''}`}>Histori Pembayaran</h3>
                </motion.button>


                <motion.button onClick={() => navigate("/account")}
                    initial={active ? 'buttonInitial' : ''}
                    animate={getCurrentLoc('/account') && active ? 'buttonAnimate' : ''}
                    variants={variants}
                    className={`${baseButton} ${!active ? 'w-fit' : ''} ${getCurrentLoc('/account') ? 'bg-white' : 'bg-primary'}`}>
                    <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M12.5833 0.833496C11.0362 0.833496 9.5525 1.44808 8.45853 2.54204C7.36457 3.636 6.74999 5.11973 6.74999 6.66683C6.74999 8.21393 7.36457 9.69766 8.45853 10.7916C9.5525 11.8856 11.0362 12.5002 12.5833 12.5002C14.1304 12.5002 15.6142 11.8856 16.7081 10.7916C17.8021 9.69766 18.4167 8.21393 18.4167 6.66683C18.4167 5.11973 17.8021 3.636 16.7081 2.54204C15.6142 1.44808 14.1304 0.833496 12.5833 0.833496ZM22.7917 12.5002C22.7025 12.4985 22.6157 12.5283 22.5463 12.5843C22.477 12.6403 22.4296 12.7189 22.4125 12.8064L22.1354 14.7314C21.6979 14.921 21.275 15.1543 20.8958 15.4168L19.0875 14.6877C18.9271 14.6877 18.7375 14.6877 18.6354 14.8772L17.1771 17.4002C17.0896 17.5606 17.1187 17.7502 17.2646 17.8668L18.8104 19.0627C18.7522 19.547 18.7522 20.0366 18.8104 20.521L17.2646 21.7168C17.199 21.773 17.1546 21.8499 17.1387 21.9348C17.1228 22.0196 17.1364 22.1074 17.1771 22.1835L18.6354 24.7064C18.7229 24.896 18.9125 24.896 19.0875 24.896L20.8958 24.1668C21.275 24.4293 21.6833 24.6772 22.1354 24.8522L22.4125 26.7772C22.4417 26.9522 22.5875 27.0835 22.7917 27.0835H25.7083C25.8687 27.0835 26.0292 26.9522 26.0583 26.7772L26.3354 24.8522C26.7729 24.6627 27.1667 24.4293 27.5604 24.1668L29.3542 24.896C29.5437 24.896 29.7333 24.896 29.8354 24.7064L31.2937 22.1835C31.3345 22.1074 31.348 22.0196 31.3321 21.9348C31.3162 21.8499 31.2718 21.773 31.2062 21.7168L29.6458 20.521C29.675 20.2731 29.7042 20.0397 29.7042 19.7918C29.7042 19.5439 29.6896 19.3106 29.6458 19.0627L31.1917 17.8668C31.2572 17.8106 31.3016 17.7337 31.3175 17.6489C31.3334 17.564 31.3199 17.4763 31.2792 17.4002L29.8208 14.8772C29.7333 14.6877 29.5437 14.6877 29.3542 14.6877L27.5604 15.4168C27.1667 15.1543 26.7729 14.9064 26.3208 14.7314L26.0437 12.8064C26.0345 12.7233 25.9954 12.6465 25.9337 12.5901C25.872 12.5337 25.7919 12.5018 25.7083 12.5002H22.7917ZM12.5833 15.4168C6.13749 15.4168 0.916656 18.0272 0.916656 21.2502V24.1668H15.0333C14.3825 22.8001 14.0437 21.3057 14.0417 19.7918C14.0446 18.3267 14.3629 16.8793 14.975 15.5481C14.2021 15.4606 13.4 15.4168 12.5833 15.4168ZM24.25 17.6043C25.4604 17.6043 26.4375 18.5814 26.4375 19.7918C26.4375 21.0022 25.4604 21.9793 24.25 21.9793C23.025 21.9793 22.0625 21.0022 22.0625 19.7918C22.0625 18.5814 23.0396 17.6043 24.25 17.6043Z" className={getCurrentLoc('/account') ? 'fill-primary' : 'fill-white'} />
                    </svg>
                    <h3 className={`font-semibold text-white text-lg ml-4 ${getCurrentLoc('/account') ? 'text-primary' : 'text-white'}  ${!active ? 'hidden' : ''}`}>Pengaturan Akun</h3>
                </motion.button>


                <motion.button onClick={() => navigate("/about")}
                    initial={ active ? 'buttonInitial' : ''}
                    animate={getCurrentLoc('/about') && active ? 'buttonAnimate' : ''}
                    variants={variants}
                    className={`${baseButton} ${!active ? 'w-fit' : ''} ${getCurrentLoc('/about') ? 'bg-white' : 'bg-primary'}`}>
                    <svg width="32" height="28" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M15.5 0.916504C23.5544 0.916504 30.0833 7.44546 30.0833 15.4998C30.0833 23.5542 23.5544 30.0832 15.5 30.0832C7.44561 30.0832 0.916656 23.5542 0.916656 15.4998C0.916656 7.44546 7.44561 0.916504 15.5 0.916504ZM15.5 3.83317C12.4058 3.83317 9.43833 5.06233 7.25041 7.25026C5.06249 9.43818 3.83332 12.4056 3.83332 15.4998C3.83332 18.594 5.06249 21.5615 7.25041 23.7494C9.43833 25.9373 12.4058 27.1665 15.5 27.1665C18.5942 27.1665 21.5616 25.9373 23.7496 23.7494C25.9375 21.5615 27.1667 18.594 27.1667 15.4998C27.1667 12.4056 25.9375 9.43818 23.7496 7.25026C21.5616 5.06233 18.5942 3.83317 15.5 3.83317ZM15.4854 12.5832C16.2992 12.5832 16.9583 13.2423 16.9583 14.0561V21.5286C17.2363 21.6891 17.4536 21.9369 17.5764 22.2335C17.6993 22.53 17.7208 22.8589 17.6377 23.169C17.5546 23.479 17.3716 23.753 17.1169 23.9485C16.8622 24.1439 16.5502 24.2498 16.2292 24.2498H15.5146C15.3211 24.2498 15.1296 24.2117 14.9509 24.1377C14.7722 24.0637 14.6098 23.9552 14.4731 23.8184C14.3363 23.6817 14.2278 23.5193 14.1538 23.3406C14.0798 23.1619 14.0417 22.9703 14.0417 22.7769V15.4998C13.6549 15.4998 13.2839 15.3462 13.0105 15.0727C12.737 14.7992 12.5833 14.4283 12.5833 14.0415C12.5833 13.6547 12.737 13.2838 13.0105 13.0103C13.2839 12.7368 13.6549 12.5832 14.0417 12.5832H15.4854ZM15.5 8.20817C15.8868 8.20817 16.2577 8.36182 16.5312 8.63531C16.8047 8.9088 16.9583 9.27973 16.9583 9.6665C16.9583 10.0533 16.8047 10.4242 16.5312 10.6977C16.2577 10.9712 15.8868 11.1248 15.5 11.1248C15.1132 11.1248 14.7423 10.9712 14.4688 10.6977C14.1953 10.4242 14.0417 10.0533 14.0417 9.6665C14.0417 9.27973 14.1953 8.9088 14.4688 8.63531C14.7423 8.36182 15.1132 8.20817 15.5 8.20817Z" className={getCurrentLoc('/about') ? 'fill-primary' : 'fill-white'} />
                    </svg>
                    <h3 className={`font-semibold text-white text-lg ml-4 ${getCurrentLoc('/about') ? 'text-primary' : 'text-white'} ${!active ? 'hidden' : ''}`}>Tentang Applikasi</h3>
                </motion.button>
            </div>

            <div className="grid place-items-center pb-2">
                <img src={Logo} alt="logo" className={`w-[100px] h-[100px] ${!active ? 'w-[75px] h-[75px]' : ''}`} />
                <h2 className={`font-bold text-2xl text-white mt-4 ${!active ? 'hidden' : ''}`}>SIMAT - UIM</h2>
                <span className={`font-semibold text-xl text-white ${!active ? 'hidden' : ''}`}>Dashboard</span>
            </div>
        </div>

    )
}


export default Sidebar