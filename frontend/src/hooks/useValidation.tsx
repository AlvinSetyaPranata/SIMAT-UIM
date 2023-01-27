
function validateLogin(data: any, onSuccess: () => void, onError: (obj: {type: string, msg: string}) => void){
    if (data.status === 0) return

    switch(data.status) {
        case 1:
            return onError({type: "password", msg: "Password salah"})

        default:
            return onSuccess()

    }

} 



function useValidation(type: string){
    if (type === "login") {
        return validateLogin
    }


    return () => false
}


export default useValidation