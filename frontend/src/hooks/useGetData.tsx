/* 
* for fetching api
* @params :type = path that needed to fetch
*
*/

// return's status code
// for more details checkout in useToken

import { getToken, RefreshToken } from "./useToken"


function fetchData(param: string, token: string) {

    const username = localStorage.getItem("username")

    if (!username || !token) return new Promise(() => false)
    
    const body = {"username" : username}

    const data = fetch(`http://localhost:8000/api/user/${param}/`, {
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
                    fetchData(param, token.token)
                    return true

                case 200:
                    return res

                case 500:
                    return false
            }
        })
        .then((data: any) => data ? data.json() : false)

    return data
}


async function useGetData(resource: string, onSuccess: () => void, onFailed: () => void){
    const {token, refresh} = getToken()

    if (!token) {
        return false
    }

    let data = {}

    const res: Promise<any> = fetchData(resource, token)

    res.then((status) => {data = status})
    
    return data
} 



export default useGetData