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

    if (!username || !token) return false
    
    const body = {"username" : username}

    const data = fetch(`http://localhost:8000/api/user/${param}/`, {
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authentication" : "JWT " + token
        },
        method: "post",
        mode: "cors",
        body: JSON.stringify(body)
    }).then((res) => res.json())

    return data
}


async function useGetData(resource: string){
    const {token, refresh} = getToken()

    if (!token) {
        return false
    }

    const res: Promise<void>|boolean = fetchData(resource, token)

    res.then((response) => {
        switch(response.status) {
            case 1: 
            // token expired
                RefreshToken()
                const token: {token: null|string, refresh: null|string} = getToken() 
                
                if (!token.token){
                    // redirect to login
                    return false
                }
                return fetchData(resource, token)

            default:
                return res
        }
    })


} 


export default useGetData