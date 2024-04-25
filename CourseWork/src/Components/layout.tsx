import {Link, Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <>
            <nav className="navbar">
                <div>
                    <span>contact@calium.edu</span>
                    <span style={{marginLeft: '10px'}}>+1-2476-254-254</span>
                </div>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/students"}>Students</Link></li>
                    <li><Link to={"/contacts"}>Contacts</Link></li>
                    <li><Link to={"/profile"}>Profile</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                    <li><Link to={"/register"}>Register</Link></li>
                    <li><Link to={"/"}>Logout</Link></li>
                </ul>
            </nav>
            <Outlet/>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Your University Name. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}
