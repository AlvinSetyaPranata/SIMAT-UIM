import { useState, Dispatch } from "react"


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


function RefreshToken(onSuccess: () => void, onFailed: () => void) {
    const token: {token: null|string, refresh: null|string} = getToken()

    if (!token.refresh) return false

    const body = { 'refresh': token.refresh }

    fetch("http://localhost:8000/api/user/auth/refresh/", {
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
            if (!data) return onFailed()

            localStorage.setItem("access", data["access"])
            onSuccess()
        })


}


// should called in every pages that need authenticated
// if token is expired then it will automatically refresh token

function verifyToken(setStatus: Dispatch<React.SetStateAction<boolean|string>>){
    const {token, refresh} = getToken()
    
    if (!token || !refresh) {
        return false
    }

    const body = {'token' : token}

    fetch('http://localhost:8000/api/user/auth/verify/', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(body)
    })
        .then((res) => {
            switch(res.status) {
                case 401:
                    return RefreshToken(() => setStatus(true), () => setStatus(false))
                    
                    
                case 200:
                    setStatus(true)
                    return

                case 500:
                    setStatus(false)
                    return


                default:
                    setStatus(false)
                    return
                    
                }
        })

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

            return onFailed()
        }

    return fetchToken

}


export { useToken, getToken, RefreshToken, verifyToken }