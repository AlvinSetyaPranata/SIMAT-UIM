/* 
* for fetching api
* @params :type = path that needed to fetch
*
*/

// return's status code
// for more details checkout in useToken

import { getToken, RefreshToken } from "./useToken"


function fetchData(param: string, body: {}) {
    
    const data = fetch(`http://localhost:8000/api/user/${param}/`, {
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        method: "post",
        mode: "cors",
        body: JSON.stringify(body)
    }).then((res) => res.json())

    return data
}


async function useGetData(type_data: string, token: {}){
    const res = fetchData(type_data, {})

    res.then((response) => {
        switch(response.status) {
            case 1: 
            // token expired
                RefreshToken()
                const token: number|{} = getToken() 
                
                if (token === 100){
                    return 100
                }
                return fetchData(type_data, token)

            default:
                return res
        }
    })


} 


export default useGetData