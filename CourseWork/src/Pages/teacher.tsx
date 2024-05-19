import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export const Teacher = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState({} as any);
    const [editable, setEditable] = useState(false); // State to track if fields are editable
    const [editedTeacher, setEditedTeacher] = useState({} as any); // State to store edited teacher data
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const navigate = useNavigate();

    useEffect(() => {
        const getTeachers = async () => {
            const result = await fetch(`http://localhost:3000/api/teachers/${id}`);
            const payload = await result.json();
            console.log(payload);
            setTeacher(payload);
            setEditedTeacher(payload);
        };
        getTeachers();
    }, [id]);

    const deleteTeacher = async (id: number) => {
        await fetch(`http://localhost:3000/api/teachers/${id}`, {
            method: "DELETE"
        });
        navigate("/teachers");
    };

    const handleEditClick = () => {
        setEditable(true);
    };

    const handleSaveClick = async () => {
        await fetch(`http://localhost:3000/api/teachers/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedTeacher)
        });
        setEditable(false);
        setTeacher(editedTeacher);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedTeacher({ ...editedTeacher, [name]: value });
    };

    return (
        <>
            <div className="profile-container">
                <h2>Personal information</h2>
                <div className="profile-info">
                    <div className="info-item">
                        <label>Teacher number:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="teacher_number"
                                value={editedTeacher.teacher_number || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.teacher_number
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Personal Identification Number:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="personal_identification_number"
                                value={editedTeacher.personal_identification_number || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.personal_identification_number
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Gender:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="gender"
                                value={editedTeacher.gender || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.gender
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Birth Date:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="birth_date"
                                value={editedTeacher.birth_date || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.birth_date
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Phone Number:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="phone_number"
                                value={editedTeacher.phone_number || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.phone_number
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Full Name:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="first_name"
                                value={editedTeacher.first_name || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            `${teacher.first_name} ${teacher.given_name} ${teacher.last_name}`
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="email"
                                value={editedTeacher.email || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.email
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Address:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="address"
                                value={editedTeacher.address || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.address
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Degree:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="degree"
                                value={editedTeacher.degree || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.degree
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Specialty:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="specialty"
                                value={editedTeacher.specialty || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            teacher.specialty
                        )}</span>
                    </div>
                    {(user.role === "ADMIN") &&
                        <button className="delButtonTeacher" onClick={() => deleteTeacher(teacher.id)}>Delete
                            teacher</button>}
                    {(user.role === "ADMIN") && editable &&
                        <button className="saveButton" onClick={handleSaveClick}>Save</button>}
                    {(user.role === "ADMIN" && !editable) &&
                        <button className="editButtonTeacher" onClick={handleEditClick}>Edit</button>}
                </div>
            </div>
        </>
    );
}
