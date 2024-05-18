import {useEffect, useState} from "react";

export const Absences = () => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const [absences, setAbsences] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAbsences = absences.filter((absence: any) =>
        absence.subject.includes(searchTerm)
    );

    useEffect(() => {
        const getAbsences = async () => {
            const result = await fetch(`http://localhost:3000/api/absences/${user.id}`);
            const payload = await result.json();
            setAbsences(payload);
        };
        getAbsences();
    }, []);

    const formatDate = (dateString: string) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div className="list-container">
                <h2>All Absences</h2>
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
                            <th>Date of absence</th>
                            <th>Date added</th>
                            <th>Added by</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAbsences.map((absence: any, index) => (
                            <tr key={index}>
                                <td>{absence.subject}</td>
                                <td>{formatDate(absence.date_of_absence)}</td>
                                <td>{formatDate(absence.date)}</td>
                                <td>{absence.added_by}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};
