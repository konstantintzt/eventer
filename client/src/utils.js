import jwt_decode from "jwt-decode"

export const invalidToken = () => {
    const token = localStorage.getItem("token")
    console.log(token)
    if (!token) return true
    try {
        const decoded = jwt_decode(token)
        return (Math.floor(Date.now() / 1000) > decoded.exp)
    } catch (err) {
        console.error(err)
        return true
    }
}

export const API_URL = "http://tzantchev.com/eventerapi/"
export const CLI_URL = "https://faf4-2607-f010-2a7-1007-f00-7a51-63da-1410.ngrok-free.app/"