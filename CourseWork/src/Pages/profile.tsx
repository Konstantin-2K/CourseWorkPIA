function Profile() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return (
        <>
            <div className="profile-container">
                <h2>Personal information</h2>
                <div className="profile-info">
                    {(user.role == "STUDENT") && <div className="info-item">
                        <label>Faculty Number:</label>
                        <span>{user.faculty_number}</span>
                    </div>}
                    {(user.role == "TEACHER") && <div className="info-item">
                        <label>Teacher Number:</label>
                        <span>{user.teacher_number}</span>
                    </div>}
                    {(user.role == "STUDENT") && <div className="info-item">
                        <label>Year Enrolled:</label>
                        <span>{user.year_enrolled}</span>
                    </div>}
                    <div className="info-item">
                        <label>Personal Identification Number:</label>
                        <span>{user.personal_identification_number}</span>
                    </div>
                    <div className="info-item">
                        <label>Gender:</label>
                        <span>{user.gender}</span>
                    </div>
                    <div className="info-item">
                        <label>Birth Date:</label>
                        <span>{user.birth_date}</span>
                    </div>
                    <div className="info-item">
                        <label>Phone Number:</label>
                        <span>{user.phone_number}</span>
                    </div>
                    <div className="info-item">
                        <label>Full Name:</label>
                        <span>{user.first_name} {user.given_name} {user.last_name}</span>
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        <span>{user.email}</span>
                    </div>
                    <div className="info-item">
                        <label>Address:</label>
                        <span>{user.address}</span>
                    </div>
                    {(user.role == "STUDENT" || user.role == "TEACHER") && <div className="info-item">
                        <label>Degree:</label>
                        <span>{user.degree}</span>
                    </div>}
                    {(user.role == "STUDENT" || user.role == "TEACHER") && <div className="info-item">
                        <label>Specialty:</label>
                        <span>{user.specialty}</span>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default Profile;
