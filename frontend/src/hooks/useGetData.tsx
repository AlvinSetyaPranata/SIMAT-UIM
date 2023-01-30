/* 
* for fetching api
* @params :type = path that needed to fetch
*
*/

// return's status code
// for more details checkout in useToken

import { getToken, RefreshToken } from "./useToken"


function useGetData(param: string,  onComplete: (res: any) => void) {

    const username = localStorage.getItem("username")
    const {token,} = getToken()

    if (!username || !token) {
        const res = new Promise(() => false)
        onComplete(res)
        return
    }
    
    const body = {"username" : username}

   fetch(`http://localhost:8000/api/user/${param}/`, {
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : "JWT " + token
        },
        method: "post",
        mode: "cors",
        body: JSON.stringify(body)
    })
        .then((res) => {
            switch(res.status) {
                case 401: 
                // token expired
                    RefreshToken(() => true, () => false)
                    const token: {token: null|string, refresh: null|string} = getToken() 
                    
                    if (!token.token){
                        // redirect to login
                        return false
                    }
                    useGetData(param, onComplete)
                    return true

                case 200:
                    return res

                case 500:
                    return false
            }
        })
        .then((data: any) => data ? data.json() : false)
        .then((result: any) => onComplete(result) )
}


// function useGetData(resource: string, onComplete: () => void){
//     const {token,} = getToken()

//     if (!token) {
//         return false
//     }

//     let data = {}

//     fetchData(resource, token, onComplete)

    
//     return data
// } 



export default useGetData