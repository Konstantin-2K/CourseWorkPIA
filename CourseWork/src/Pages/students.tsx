import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Students = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [currentPopup, setCurrentPopup] = useState('');
    const [currentStudentId, setCurrentStudentId] = useState<number | null>(null);
    const [grade, setGrade] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');
    const [grades, setGrades] = useState<any[]>([]);
    const [absences, setAbsences] = useState<any[]>([]);
    const [editGradeId, setEditGradeId] = useState<number | null>(null);
    const [editGrade, setEditGrade] = useState('');
    const [editSubject, setEditSubject] = useState('');
    const [editAbsenceId, setEditAbsenceId] = useState<number | null>(null);
    const [editAbsenceSubject, setEditAbsenceSubject] = useState('');
    const [editAbsenceDate, setEditAbsenceDate] = useState('');
    const [newStudent, setNewStudent] = useState({
        faculty_number: '',
        year_enrolled: '',
        personal_identification_number: '',
        gender: '',
        birth_date: '',
        phone_number: '',
        first_name: '',
        email: '',
        address: '',
        degree: '',
        specialty: '',
        last_name: '',
        given_name: '',
        password: '',
        role: 'STUDENT'
    });
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    const filteredStudents = students.filter((student: any) =>
        student.faculty_number.includes(searchTerm)
    );

    useEffect(() => {
        const getStudents = async () => {
            const result = await fetch("http://localhost:3000/api/students");
            const payload = await result.json();
            console.log(payload);
            setStudents(payload);
        };
        getStudents().then();
    }, []);

    const openPopup = (id: number | string, popupType: string) => {
        if (typeof id === 'number') {
            setCurrentStudentId(id);
        }
        setCurrentPopup(popupType);
        setShowPopup(true);
        if (popupType === "viewGrades") {
            fetchGrades(id as number);
        } else if (popupType === "viewAbsences") {
            fetchAbsences(id as number);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setGrade('');
        setSubject('');
        setDate('');
        setGrades([]);
        setAbsences([]);
        setEditGradeId(null);
        setEditAbsenceId(null);
        setNewStudent({
            faculty_number: '',
            year_enrolled: '',
            personal_identification_number: '',
            gender: '',
            birth_date: '',
            phone_number: '',
            first_name: '',
            email: '',
            address: '',
            degree: '',
            specialty: '',
            last_name: '',
            given_name: '',
            password: '',
            role: 'STUDENT'
        });
    };

    const handleGradeSubmit = async () => {
        if (currentStudentId !== null) {
            const currentDate = new Date().toISOString().split('T')[0];
            await fetch(`http://localhost:3000/api/grades/${currentStudentId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    grade,
                    subject,
                    added_by: `${user.first_name} ${user.last_name}`,
                    date_added: currentDate
                })
            });
            closePopup();
        }
    };

    const handleAbsenceSubmit = async () => {
        if (currentStudentId !== null) {
            const currentDate = new Date().toISOString().split('T')[0];
            await fetch(`http://localhost:3000/api/absences/${currentStudentId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date_of_absence: date,
                    subject,
                    date: currentDate,
                    added_by: `${user.first_name} ${user.last_name}`
                })
            });
            closePopup();
        }
    };

    const handleStudentSubmit = async () => {
        await fetch(`http://localhost:3000/api/students`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        });
        const result = await fetch("http://localhost:3000/api/students");
        const payload = await result.json();
        setStudents(payload);
        closePopup();
    };

    const fetchGrades = async (id: number) => {
        const result = await fetch(`http://localhost:3000/api/grades/${id}`);
        const payload = await result.json();
        setGrades(payload);
    };

    const fetchAbsences = async (id: number) => {
        const result = await fetch(`http://localhost:3000/api/absences/${id}`);
        const payload = await result.json();
        setAbsences(payload);
    };

    const deleteGrade = async (gradeId: number) => {
        await fetch(`http://localhost:3000/api/grades/${gradeId}`, {
            method: "DELETE"
        });
        if (currentStudentId !== null) {
            fetchGrades(currentStudentId);
        }
    };

    const deleteAbsence = async (absenceId: number) => {
        await fetch(`http://localhost:3000/api/absences/${absenceId}`, {
            method: "DELETE"
        });
        if (currentStudentId !== null) {
            fetchAbsences(currentStudentId);
        }
    };

    const handleEditGradeClick = (grade: any) => {
        setEditGradeId(grade.id);
        setEditGrade(grade.grade);
        setEditSubject(grade.subject);
    };

    const handleSaveGradeClick = async () => {
        if (editGradeId !== null) {
            const currentDate = new Date().toISOString().split('T')[0];
            await fetch(`http://localhost:3000/api/grades/${editGradeId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    grade: editGrade,
                    date_added: currentDate,
                    subject: editSubject,
                    added_by: `${user.first_name} ${user.last_name}`
                })
            });
            if (currentStudentId !== null) {
                fetchGrades(currentStudentId);
            }
            setEditGradeId(null);
        }
    };

    const handleEditAbsenceClick = (absence: any) => {
        setEditAbsenceId(absence.id);
        setEditAbsenceDate(absence.date_of_absence);
        setEditAbsenceSubject(absence.subject);
    };

    const handleSaveAbsenceClick = async () => {
        if (editAbsenceId !== null) {
            const currentDate = new Date().toISOString().split('T')[0];
            await fetch(`http://localhost:3000/api/absences/${editAbsenceId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: currentDate,
                    date_of_absence: editAbsenceDate,
                    subject: editAbsenceSubject,
                    added_by: `${user.first_name} ${user.last_name}`
                })
            });
            if (currentStudentId !== null) {
                fetchAbsences(currentStudentId);
            }
            setEditAbsenceId(null);
        }
    };

    const formatDate = (dateString: string) => {
        const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setNewStudent(prevState => ({...prevState, [name]: value}));
    };

    return (
        <>
            <div className="main">
                <div className="list-container">
                    <div className="flex">
                        <h2>All Students</h2>
                        {user.role === 'ADMIN' && <button onClick={() => openPopup('addStudent', 'addStudent')}>Add Student</button>}
                    </div>
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
                                <div className="userButtons">
                                    <button onClick={() => openPopup(student.id, 'addGrade')}>Add Grade</button>
                                    <button onClick={() => openPopup(student.id, 'viewGrades')}>View Grades</button>
                                    <button onClick={() => openPopup(student.id, 'addAbsence')}>Add Absence</button>
                                    <button onClick={() => openPopup(student.id, 'viewAbsences')}>View Absences</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {showPopup && currentPopup === 'addGrade' && (
                    <div className="popup-overlay">
                        <div className="popup-content add">
                            <h3>Add Grade</h3>
                            <input
                                type="text"
                                placeholder="Grade"
                                value={grade}
                                onChange={e => setGrade(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                            />
                            <div className="button-group">
                                <button className="inputCancel" onClick={closePopup}>Cancel</button>
                                <button className="submit" onClick={handleGradeSubmit}>Submit Grade</button>
                            </div>
                        </div>
                    </div>
                )}

                {showPopup && currentPopup === 'viewGrades' && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h3>Grades</h3>
                            <table className="grades-table">
                                <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Grade</th>
                                    <th>Added By</th>
                                    <th>Date Added</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {grades.map((grade: any) => (
                                    <tr key={grade.id} className="grade-item">
                                        {editGradeId === grade.id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={editSubject}
                                                        onChange={e => setEditSubject(e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={editGrade}
                                                        onChange={e => setEditGrade(e.target.value)}
                                                    />
                                                </td>
                                                <td>{grade.added_by}</td>
                                                <td>{formatDate(grade.date_added)}</td>
                                                <td>
                                                    <div className="grade-actions">
                                                        <button className="save" onClick={handleSaveGradeClick}>Save
                                                        </button>
                                                        <button className="cancel"
                                                                onClick={() => setEditGradeId(null)}>Cancel
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{grade.subject}</td>
                                                <td>{grade.grade}</td>
                                                <td>{grade.added_by}</td>
                                                <td>{formatDate(grade.date_added)}</td>
                                                <td>
                                                    <div className="grade-actions">
                                                        <button className="editButton"
                                                                onClick={() => handleEditGradeClick(grade)}>Edit
                                                        </button>
                                                        <button className="delButton"
                                                                onClick={() => deleteGrade(grade.id)}>Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button className="cancel" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}

                {showPopup && currentPopup === 'addAbsence' && (
                    <div className="popup-overlay">
                        <div className="popup-content add">
                            <h3>Add Absence</h3>
                            <input
                                type="date"
                                placeholder="Date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                            />
                            <div className="button-group">
                                <button className="inputCancel" onClick={closePopup}>Cancel</button>
                                <button className="submit" onClick={handleAbsenceSubmit}>Submit Absence</button>
                            </div>
                        </div>
                    </div>
                )}

                {showPopup && currentPopup === 'viewAbsences' && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h3>Absences</h3>
                            <table className="absences-table">
                                <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Date of Absence</th>
                                    <th>Date added</th>
                                    <th>Added By</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {absences.map((absence: any) => (
                                    <tr key={absence.id} className="absence-item">
                                        {editAbsenceId === absence.id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={editAbsenceSubject}
                                                        onChange={e => setEditAbsenceSubject(e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        value={editAbsenceDate}
                                                        onChange={e => setEditAbsenceDate(e.target.value)}
                                                    />
                                                </td>
                                                <td>{formatDate(absence.date)}</td>
                                                <td>{absence.added_by}</td>
                                                <td>
                                                    <div className="absence-actions">
                                                        <button className="save" onClick={handleSaveAbsenceClick}>Save
                                                        </button>
                                                        <button className="cancel"
                                                                onClick={() => setEditAbsenceId(null)}>Cancel
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{absence.subject}</td>
                                                <td>{formatDate(absence.date_of_absence)}</td>
                                                <td>{formatDate(absence.date)}</td>
                                                <td>{absence.added_by}</td>
                                                <td>
                                                    <div className="absence-actions">
                                                        <button className="editButton"
                                                                onClick={() => handleEditAbsenceClick(absence)}>Edit
                                                        </button>
                                                        <button className="delButton"
                                                                onClick={() => deleteAbsence(absence.id)}>Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button className="cancel" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}

                {showPopup && currentPopup === 'addStudent' && (
                    <div className="popup-overlay">
                        <div className="popup-content add addUser">
                            <h3>Add Student</h3>
                            <input
                                type="text"
                                placeholder="Faculty Number"
                                name="faculty_number"
                                value={newStudent.faculty_number}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Year Enrolled"
                                name="year_enrolled"
                                value={newStudent.year_enrolled}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Personal Identification Number"
                                name="personal_identification_number"
                                value={newStudent.personal_identification_number}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Gender"
                                name="gender"
                                value={newStudent.gender}
                                onChange={handleInputChange}
                            />
                            <input
                                type="date"
                                placeholder="Birth Date"
                                name="birth_date"
                                value={newStudent.birth_date}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                name="phone_number"
                                value={newStudent.phone_number}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={newStudent.first_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={newStudent.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={newStudent.address}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Degree"
                                name="degree"
                                value={newStudent.degree}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Specialty"
                                name="specialty"
                                value={newStudent.specialty}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                value={newStudent.last_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Given Name"
                                name="given_name"
                                value={newStudent.given_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={newStudent.password}
                                onChange={handleInputChange}
                            />
                            <div className="button-group">
                                <button className="inputCancel" onClick={closePopup}>Cancel</button>
                                <button className="submit" onClick={handleStudentSubmit}>Add Student</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
