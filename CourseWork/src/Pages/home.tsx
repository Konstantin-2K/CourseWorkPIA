import { Link } from "react-router-dom";
const user = JSON.parse(sessionStorage.getItem('user') || '{}');

function HomePage() {
    return (
        <div className="home-container">
            <h1>Welcome to the Calium Student Information System</h1>
            <p>This website allows you to easily access and manage information about students.</p>

            <div className="info-sections">
                {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
                    <div className="info-section">
                        <h2>View Students</h2>
                        <p>Search, filter, and view detailed information about all registered students.</p>
                        <Link to="/students">
                            <button>See All Students</button>
                        </Link>
                    </div>
                )}
                {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
                    <div className="info-section">
                        <h2>View Teachers</h2>
                        <p>Search, filter, and view detailed information about all registered teachers.</p>
                        <Link to="/teachers">
                            <button>See All Teachers</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
