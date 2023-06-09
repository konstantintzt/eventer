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

export const API_URL = "http://localhost:2902/"
export const CLI_URL = "http://localhost:3000/"