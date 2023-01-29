

function getToken() {
    /** 
     * return's object that containing access and refresh token
     * for e.g
     * {access: <access_token>, refresh: <refresh_token>}
     * otherwise return {access: null, refresh: null}
    */

    const accessToken = localStorage.getItem("access")
    const refreshToken = localStorage.getItem("refresh")

    if (!accessToken && !refreshToken) {
        return {token: null, refresh: null}
    }

    return { token: localStorage.getItem("access"), refresh: localStorage.getItem("refresh") }
}


function RefreshToken() {
    const token: {token: null|string, refresh: null|string} = getToken()

    if (!token.refresh) return false

    const body = { 'refresh': token.refresh }

    const status = fetch("http://localhost:8000/api/user/auth/refresh/", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(body)
    }).then((res) => {
        if (res.status === 401) {
            return false
        }
        
        return res.json()
        
    })
        .then((data) => {
            if (!data) return false

            localStorage.setItem("access", data["access"])
            return true
        }) // return false if data is false or refresh token is expired!

    return status

}


// should called in every pages that need authenticated
// if token is expired then it will automatically refresh token
function verifyToken(){
    const {token, refresh} = getToken()
    
    if (!token || !refresh) {
        return false
    }

    const body = {'token' : token}

    const status = fetch('http://localhost:8000/api/user/auth/verify/', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(body)
    })
        .then((res) => {
            console.log(res.status)
            switch(res.status) {
                case 401:
                    const refresher: Promise<boolean>|boolean = RefreshToken()
                    if (!refresher) return false
                    return true
                    
                    
                case 200:
                    return true
                    

                case 500:
                    return false
                    

                default:
                    return false
                    
                }
        })

    return status
    }

function useToken() {

    function fetchToken(form: { username: string, password: string}, onSucess: () => void, onFailed: () => void) {
        const accessToken = localStorage.getItem("access")
        const refreshToken = localStorage.getItem("refresh")

        if (!accessToken && !refreshToken) {
            
            fetch("http://localhost:8000/api/user/auth/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'post',
                mode: 'cors',
                body: JSON.stringify(form)
            })
                .then((res) => res.status === 200 ? res.json() : false)
                .then((data) => {
                    // console.log(data)
                    if (data) {
                        localStorage.setItem("access", data["access"])
                        localStorage.setItem("refresh", data["refresh"])
                        localStorage.setItem("username", data["username"])
                        onSucess()
                        return
                    }
                    return onFailed()

                })
                .catch(() => {
                    alert("Server tidak merespon harap coba lagi nanti!")
                    return onFailed()
                })
            }
        }

    return fetchToken

}


export { useToken, getToken, RefreshToken, verifyToken }