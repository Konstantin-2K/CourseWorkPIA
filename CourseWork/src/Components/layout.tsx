import {Link, Outlet } from "react-router-dom"



export const Layout = () => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    return (
        <>
            <nav className="navbar">
                <div>
                    {user.first_name ? (
                        <span>Welcome, {user.first_name} {user.last_name}!</span>
                    ) : (
                        <span>contact@calium.edu</span>
                    )}
                </div>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    {(user.role == "ADMIN" || user.role == "TEACHER") &&
                        <li><Link to={"/students"}>Students</Link></li>}
                    {(user.role == "ADMIN") && <li><Link to={"/teachers"}>Teachers</Link></li>}
                    {(user.role == "STUDENT") && <li><Link to={"/grades"}>Grades</Link></li>}
                    {(user.role == "STUDENT") && <li><Link to={"/absences"}>Absences</Link></li>}
                    <li><Link to={"/contacts"}>Contacts</Link></li>
                    {user.first_name && <li><Link to={"/profile"}>Profile</Link></li>}
                    {!user.first_name && <li><Link to={"/login"}>Login</Link></li>}
                    {!user.first_name && <li><Link to={"/register"}>Register</Link></li>}
                    {user.first_name && <li><Link to={"/logout"}>Logout</Link></li>}
                </ul>
            </nav>
            <Outlet/>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Calium. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}
