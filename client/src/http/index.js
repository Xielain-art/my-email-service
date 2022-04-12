import axios from "axios";


const authInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        'authorization': localStorage.getItem('token')
    }
})
const unAuthInstance = axios.create({
    baseURL: 'http://localhost:5000/api/'
})
export {authInstance, unAuthInstance}

