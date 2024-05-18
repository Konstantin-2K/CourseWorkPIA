import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export const Student = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({} as any);
    const [editable, setEditable] = useState(false); // State to track if fields are editable
    const [editedStudent, setEditedStudent] = useState({} as any); // State to store edited student data
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const navigation = useNavigate();

    useEffect(() => {
        const getStudents = async () => {
            const result = await fetch(`http://localhost:3000/api/students/${id}`);
            const payload = await result.json();
            console.log(payload);
            setStudent(payload);
            setEditedStudent(payload);
        };
        getStudents();
    }, [id]);

    const deleteStudent = async (id: number) => {
        await fetch(`http://localhost:3000/api/students/${id}`, {
            method: "DELETE"
        })
        navigation("/students");
    }

    const handleEditClick = () => {
        setEditable(true);
    };

    const handleSaveClick = async () => {
        await fetch(`http://localhost:3000/api/students/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedStudent)
        });
        setEditable(false);
        setStudent(editedStudent);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedStudent({ ...editedStudent, [name]: value });
    };

    return (
        <>
            <div className="profile-container">
                <h2>Personal information</h2>
                <div className="profile-info">
                    <div className="info-item">
                        <label>Faculty Number:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="faculty_number"
                                value={editedStudent.faculty_number || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.faculty_number
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Year Enrolled:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="year_enrolled"
                                value={editedStudent.year_enrolled || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.year_enrolled
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Personal Identification Number:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="personal_identification_number"
                                value={editedStudent.personal_identification_number || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.personal_identification_number
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Gender:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="gender"
                                value={editedStudent.gender || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.gender
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Birth Date:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="birth_date"
                                value={editedStudent.birth_date || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.birth_date
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Phone Number:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="phone_number"
                                value={editedStudent.phone_number || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.phone_number
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Full Name:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="first_name"
                                value={editedStudent.first_name || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            `${student.first_name} ${student.given_name} ${student.last_name}`
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="email"
                                value={editedStudent.email || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.email
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Address:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="address"
                                value={editedStudent.address || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.address
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Degree:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="degree"
                                value={editedStudent.degree || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.degree
                        )}</span>
                    </div>
                    <div className="info-item">
                        <label>Specialty:</label>
                        <span>{editable ? (
                            <input
                                type="text"
                                name="specialty"
                                value={editedStudent.specialty || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            student.specialty
                        )}</span>
                    </div>
                    {(user.role == "ADMIN") &&
                        <button className="delButtonUser" onClick={() => deleteStudent(student.id)}>Delete student</button>}
                    {(user.role === "ADMIN") && editable &&
                        <button className="saveButton" onClick={handleSaveClick}>Save</button>}
                    {(user.role === "ADMIN" && !editable) &&
                        <button className="editButtonUser" onClick={handleEditClick}>Edit</button>}
                </div>
            </div>
        </>
    )
}
