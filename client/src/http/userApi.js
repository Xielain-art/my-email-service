import {authInstance, unAuthInstance} from "./index";
import jwtDecode from "jwt-decode";

const userApi = {
    async register(body) {
        const {data} = await unAuthInstance.post('user/register', body)
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    },
    async login(body) {
        const {data} = await unAuthInstance.post('user/login', body)
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    },
    async check() {
        const {data} = await authInstance.get('user/isAuth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    },
    async getEmails() {
        const {data} = await authInstance.get('user/getEmails')
        return data
    },
    async getUsers() {
        const {data} = await authInstance.get('user/getUsers')
        return data
    },
    async sendEmail(title, body, forIds) {
        const {data} = await authInstance.post('user/sendEmail', {title, body, forIds})
        return data
    }
}

export {
    userApi
}