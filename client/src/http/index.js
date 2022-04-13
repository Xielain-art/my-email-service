import axios from "axios";


const authInstance = axios.create({
    baseURL: '/api',
    headers: {
        'authorization': localStorage.getItem('token')
    }
})
const unAuthInstance = axios.create({
    baseURL: '/api'
})
export {authInstance, unAuthInstance}

