import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/userStore";

export const Context = createContext(null)

ReactDOM.render(
    <BrowserRouter>
        <Context.Provider value={{
            user: new UserStore()
        }}><App/></Context.Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
;

