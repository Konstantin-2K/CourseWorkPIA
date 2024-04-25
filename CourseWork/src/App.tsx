import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Components/general_style.css'
import { Layout } from './Components/layout'
import HomePage from "./Pages/home.tsx";
import {Register} from "./Pages/register.tsx";
import {Students} from './Pages/students.tsx';
import {Student} from "./Pages/student.tsx";
import Contacts from "./Pages/contacts.tsx";
import Login from "./Pages/login.tsx";

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
                        <Route path = {"/students/:id"} element={<Student/>}/>
                        <Route path = {"/contacts"} element={<Contacts/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
