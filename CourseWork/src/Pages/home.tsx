function HomePage() {
    return (
        <div className="home-container">
            <h1>Welcome to the Calium Student Information System</h1>
            <p>This website allows you to easily access and manage information about students.</p>

            <div className="info-sections">
                <div className="info-section">
                    <h2>View Students</h2>
                    <p>Search, filter, and view detailed information about all registered students.</p>
                    <button>See All Students</button>
                </div>
                <div className="info-section">
                    <h2>Add Student</h2>
                    <p>Add new students to the system with basic and contact details.</p>
                    <button>Add New Student</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
