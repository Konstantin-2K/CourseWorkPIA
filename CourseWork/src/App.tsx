import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Components/general_style.css'
import { Layout } from './Components/layout'
import HomePage from "./Pages/home.tsx";
import {Register} from "./Pages/register.tsx";
import {Students} from './Pages/students.tsx';
import {Student} from "./Pages/student.tsx";
import Contacts from "./Pages/contacts.tsx";
import Login from "./Pages/login.tsx";
import Logout from "./Pages/logout.tsx";
import Profile from "./Pages/profile.tsx";
import {Teachers} from "./Pages/teachers.tsx";
import {Teacher} from "./Pages/teacher.tsx";



function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path = {"/"} element={<Layout/>}>
                        <Route path = {"/register"} element={<Register/>}/>
                        <Route path = {"/login"} element={<Login/>}/>
                        <Route path = {"/"} element={<HomePage/>}/>
                        <Route path = {"/students"} element={<Students/>}/>
                        <Route path = {"/teachers"} element={<Teachers/>}/>
                        <Route path = {"/students/:id"} element={<Student/>}/>
                        <Route path = {"/teachers/:id"} element={<Teacher/>}/>
                        <Route path = {"/contacts"} element={<Contacts/>}/>
                        <Route path = {"/logout"} element={<Logout/>}/>
                        <Route path = {"/profile"} element={<Profile/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
