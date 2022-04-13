import {makeAutoObservable} from "mobx";


export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._emails = []
        this._users = []
        this._selectedUsers = []
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

    setUsers(data) {
        this._users = data
    }

    setSelectedUsers(user_id) {

        if (this._selectedUsers.every(id => id !== user_id)) {
            this._selectedUsers.push(user_id)
        } else {
            this._selectedUsers = this._selectedUsers.filter(id => id !== user_id)
        }
        console.log(Array.from(this.selectedUsers))
    }

    clearSelectedUsers() {
        this._selectedUsers = []
    }

    selectAll() {
        this._selectedUsers = this._users.map(u => u.id)
    }

    unselectAll() {
        this._selectedUsers = []
    }


    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get emails() {
        return this._emails
    }

    get users() {
        return this._users
    }

    get selectedUsers() {
        return this._selectedUsers
    }
}