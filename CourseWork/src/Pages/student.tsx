import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const Student = () => {
    const {id} = useParams();
    const [student, setStudent] = useState([] as any);

    useEffect(() => {
        const getStudents = async () => {
            const result = await fetch(`http://localhost:3000/api/students/${id}`)
            const payload = await result.json();
            console.log(payload);
            setStudent(payload);
        };
        getStudents().then();
    }, []);


    return (
        <>
            <div className="profile-container">
                <h2>Personal information</h2>
                <div className="profile-info">
                    <div className="info-item">
                        <label>Faculty Number:</label>
                        <span>{student.faculty_number}</span>
                    </div>
                    <div className="info-item">
                        <label>Year Enrolled:</label>
                        <span>{student.year_enrolled}</span>
                    </div>
                    <div className="info-item">
                        <label>Personal Identification Number:</label>
                        <span>{student.personal_identification_number}</span>
                    </div>
                    <div className="info-item">
                        <label>Gender:</label>
                        <span>{student.gender}</span>
                    </div>
                    <div className="info-item">
                        <label>Birth Date:</label>
                        <span>{student.birth_date}</span>
                    </div>
                    <div className="info-item">
                        <label>Phone Number:</label>
                        <span>{student.phone_number}</span>
                    </div>
                    <div className="info-item">
                        <label>Full Name:</label>
                        <span>{student.first_name} {student.given_name} {student.last_name}</span>
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        <span>{student.email}</span>
                    </div>
                    <div className="info-item">
                        <label>Address:</label>
                        <span>{student.address}</span>
                    </div>
                    <div className="info-item">
                        <label>Degree:</label>
                        <span>{student.degree}</span>
                    </div>
                    <div className="info-item">
                        <label>Specialty:</label>
                        <span>{student.specialty}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
