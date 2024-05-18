import {useEffect, useState} from "react";

export const Grades = () => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const [grades, setGrades] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGrades = grades.filter((grade: any) =>
        grade.subject.includes(searchTerm)
    );

    useEffect(() => {
        const getGrades = async () => {
            const result = await fetch(`http://localhost:3000/api/grades/${user.id}`);
            const payload = await result.json();
            setGrades(payload);
        };
        getGrades();
    }, []);

    const formatDate = (dateString: string) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div className="list-container">
                <h2>All Grades</h2>
                <input
                    type="text"
                    placeholder="Search by Subject"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>Date added</th>
                            <th>Added by</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredGrades.map((grade: any, index) => (
                            <tr key={index}>
                                <td>{grade.subject}</td>
                                <td>{grade.grade}</td>
                                <td>{formatDate(grade.date_added)}</td>
                                <td>{grade.added_by}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};
