function Profile() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return (
        <>
            <div className="profile-container">
                <h2>Personal information</h2>
                <div className="profile-info">
                    <div className="info-item">
                        <label>Faculty Number:</label>
                        <span>{user.faculty_number}</span>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Profile;
