import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Students = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter((student: any) =>
        student.faculty_number.includes(searchTerm)
    );

    useEffect(() => {
        const getStudents = async () => {
            const result = await fetch("http://localhost:3000/api/students")
            const payload = await result.json();
            console.log(payload);
            setStudents(payload);
        };
        getStudents().then();
    }, [])


    return (
        <>
            <div className="list-container">
                <h2>All Students</h2>
                <input
                    type="text"
                    placeholder="Search by Faculty Number"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <ul className="list">
                    {filteredStudents.map((student: any, index) => (
                        <li key={index} className="item">
                            <Link to={`/students/${student.id}`}>
                            <div>
                                <strong>{student.first_name} {student.last_name}</strong>
                                <p>{student.faculty_number}</p>
                            </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
