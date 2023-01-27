
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
        return 100
    }

    return { token: localStorage.getItem("access"), refresh: localStorage.getItem("refresh") }
}


function RefreshToken() {
    const refresh = localStorage.getItem("refresh")

    if (!refresh) return 100

    const body = { 'refresh': refresh }

    fetch("http://localhost:8000/api/user/auth/refresh/", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(body)
    }).then((res) => res.json())
        .then((data) => localStorage.setItem("access", data["access"]))

}

function useToken() {

    function fetchToken(form: { username: string, password: string }) {
        const accessToken = localStorage.getItem("access")
        const refreshToken = localStorage.getItem("refresh")

        // console.log(accessToken)

        if (!accessToken && !refreshToken) {
            const status = fetch("http://localhost:8000/api/user/auth/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'post',
                mode: 'cors',
                body: JSON.stringify(form)
            })
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) return res.json()

                    return false
                })
                .then((data) => {

                    console.log(data)
                    if (data) {
                        localStorage.setItem("access", data["access"])
                        localStorage.setItem("refresh", data["refresh"])
                        return true
                    }

                })
                .catch(() => {
                    alert("Server tidak merespon harap coba lagi nanti!")
                    return false
                })

                return status
            }
        }

    return fetchToken

}


export { useToken, getToken, RefreshToken }