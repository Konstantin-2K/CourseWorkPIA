import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Teachers = () => {
    const [teachers, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeachers = teachers.filter((teacher: any) =>
        teacher.teacher_number.includes(searchTerm)
    );

    useEffect(() => {
        const getTeachers = async () => {
            const result = await fetch("http://localhost:3000/api/teachers")
            const payload = await result.json();
            console.log(payload);
            setStudents(payload);
        };
        getTeachers().then();
    }, [])


    return (
        <>
            <div className="list-container">
                <h2>All Teachers</h2>
                <input
                    type="text"
                    placeholder="Search by Teacher Number"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <ul className="list">
                    {filteredTeachers.map((teacher: any, index) => (
                        <li key={index} className="item">
                            <Link to={`/teachers/${teacher.id}`}>
                                <div>
                                    <strong>{teacher.first_name} {teacher.last_name}</strong>
                                    <p>{teacher.teacher_number}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
