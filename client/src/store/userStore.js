import {makeAutoObservable} from "mobx";


export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._emails = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setEmails(data) {
        this._emails = data
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
    get emails(){
        return this._emails
    }
}