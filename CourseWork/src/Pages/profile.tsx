import { useState } from "react";

function Profile() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const [showPopup, setShowPopup] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        await fetch(`http://localhost:3000/api/change-password/${user.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: newPassword })
        });

        closePopup();
    };

    return (
        <>
            <div className="main">
            <div className="profile-container">
                <h2>Personal information</h2>
                <div className="profile-info">
                    {user.role === "STUDENT" && (
                        <div className="info-item">
                            <label>Faculty Number:</label>
                            <span>{user.faculty_number}</span>
                        </div>
                    )}
                    {user.role === "TEACHER" && (
                        <div className="info-item">
                            <label>Teacher Number:</label>
                            <span>{user.teacher_number}</span>
                        </div>
                    )}
                    {user.role === "STUDENT" && (
                        <div className="info-item">
                            <label>Year Enrolled:</label>
                            <span>{user.year_enrolled}</span>
                        </div>
                    )}
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
                    {(user.role === "STUDENT" || user.role === "TEACHER") && (
                        <div className="info-item">
                            <label>Degree:</label>
                            <span>{user.degree}</span>
                        </div>
                    )}
                    {(user.role === "STUDENT" || user.role === "TEACHER") && (
                        <div className="info-item">
                            <label>Specialty:</label>
                            <span>{user.specialty}</span>
                        </div>
                    )}
                    <button className="editButtonProfile" onClick={openPopup}>Change password</button>
                </div>
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content password add">
                        <h3>Change Password</h3>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={e => setShowPassword(e.target.checked)}
                            />
                            <label>Show Password</label>
                        </div>
                        <div className="button-group">
                            <button className="inputCancel" onClick={closePopup}>Close</button>
                            <button className="submit" onClick={handleChangePassword}>Change Password</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    );
}

export default Profile;
