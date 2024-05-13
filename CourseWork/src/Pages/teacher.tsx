import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export const Teacher = () => {
    const {id} = useParams();
    const [teacher, setTeacher] = useState([] as any);
    const navigation = useNavigate();

    useEffect(() => {
        const getTeachers = async () => {
            const result = await fetch(`http://localhost:3000/api/teachers/${id}`)
            const payload = await result.json();
            console.log(payload);
            setTeacher(payload);
        };
        getTeachers().then();
    }, []);

    const deleteTeacher = (id: number) => {
        fetch(`http://localhost:3000/api/teachers/${id}`, {
            method: "DELETE"
        })
        navigation("/teachers")
    }

    return (
        <>
            <div className="profile-container">
                <h2>Personal information</h2>
                <div className="profile-info">
                    <div className="info-item">
                        <label>Personal Identification Number:</label>
                        <span>{teacher.personal_identification_number}</span>
                    </div>
                    <div className="info-item">
                        <label>Gender:</label>
                        <span>{teacher.gender}</span>
                    </div>
                    <div className="info-item">
                        <label>Birth Date:</label>
                        <span>{teacher.birth_date}</span>
                    </div>
                    <div className="info-item">
                        <label>Phone Number:</label>
                        <span>{teacher.phone_number}</span>
                    </div>
                    <div className="info-item">
                        <label>Full Name:</label>
                        <span>{teacher.first_name} {teacher.given_name} {teacher.last_name}</span>
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        <span>{teacher.email}</span>
                    </div>
                    <div className="info-item">
                        <label>Address:</label>
                        <span>{teacher.address}</span>
                    </div>
                    <div className="info-item">
                        <label>Degree:</label>
                        <span>{teacher.degree}</span>
                    </div>
                    <div className="info-item">
                        <label>Specialty:</label>
                        <span>{teacher.specialty}</span>
                    </div>
                    <button className="delButton" onClick={() => deleteTeacher(teacher.id)}>Delete teacher</button>
                </div>
            </div>
        </>
    )
}
