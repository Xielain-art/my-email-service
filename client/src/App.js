import {Route, Routes, useNavigate} from 'react-router-dom'
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import IndexPage from "./pages/IndexPage";
import {INDEX_PAGE, LOGIN_PAGE, REGISTER_PAGE, SEND_EMAILS} from "./utils/routes";
import {observer} from "mobx-react-lite";
import SendEmailsPage from "./pages/SendEmailsPage";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {useHttp} from "./hooks/htt.hook";
import {userApi} from "./http/userApi";
import jwtDecode from "jwt-decode";

const App = observer(function App() {
        const {user} = useContext(Context)
        useEffect(() => {
            if (localStorage.getItem('token')) {
                user.setIsAuth(true)
                user.setUser(jwtDecode(localStorage.getItem('token')))
            }
        }, [user.isAuth])

        return (
            <Routes>
                <Route path={'/'}
                       element={<Layout/>}>
                    <Route path={LOGIN_PAGE}
                           element={<AuthPage/>}/>
                    <Route path={REGISTER_PAGE}
                           element={<AuthPage/>}/>
                    <Route path={SEND_EMAILS}
                           element={<SendEmailsPage/>}/>
                    {user.isAuth && <Route index
                                           path={INDEX_PAGE}
                                           element={<IndexPage/>}/>}
                    <Route path='*'
                           element={user.isAuth ? <IndexPage/> : <AuthPage/>}/>
                </Route>
            </Routes>);
    }
)
export default App;
