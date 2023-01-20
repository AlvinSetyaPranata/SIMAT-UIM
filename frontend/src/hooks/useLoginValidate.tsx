import { useReducer } from "react"


interface initialState {
    inputCls: string,
    spanCls: string,
    type: string,
    msg: string
}


function reducerFunction(state: initialState, action: {type: string, msg?: string}) {

    console.log(action.type)
    switch(action.type) {
        case "UNREGISTERED_USERNAME":
            return {inputCls: 'border-red-200', spanCls: 'opacity-100', type: 'username', msg: 'Username tidak ditemukan!'}
            
            default:
                return state
    }

}


function useLoginValidate() {


    const [state, dispatch] = useReducer(reducerFunction, {inputCls: '', spanCls: '', type: '', msg: ''})

    interface responseType {
        status: number
        msg: string
    }

    function sendPost(form: {username: string, password: string}) {

        // if (state.type !== "") return

        fetch('http://localhost:8000/api/user/auth/', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'post',
          mode: 'cors',
          body: JSON.stringify(form)
        })
          .then((data) => data.json())
          .then((data) => validation(data))
    }


    function validation(res: responseType) {
        console.log(res)
        if (res.status === 1) {
            if (res.msg === "User Not Found") {
                dispatch({type: "UNREGISTERED_USERNAME", msg: "Username tidak ditemukan"})
            }
        }
    }


    
    return [sendPost, state] as const

}

export default useLoginValidate