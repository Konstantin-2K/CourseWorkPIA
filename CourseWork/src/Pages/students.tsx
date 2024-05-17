import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

    const openPopup = (id: number, popupType: string) => {
        setCurrentStudentId(id);
        setCurrentPopup(popupType);
        setShowPopup(true);
        if (popupType === "viewGrades") {
            fetchGrades(id);
        } else if (popupType === "viewAbsences") {
            fetchAbsences(id);
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
    };


    const handleGradeSubmit = async () => {
        if (currentStudentId !== null) {
            await fetch(`http://localhost:3000/api/grades/${currentStudentId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grade, subject })
            });
            closePopup();
        }
    };

    const handleAbsenceSubmit = async () => {
        if (currentStudentId !== null) {
            await fetch(`http://localhost:3000/api/absences/${currentStudentId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date, subject })
            });
            closePopup();
        }
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
            await fetch(`http://localhost:3000/api/grades/${editGradeId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grade: editGrade, subject: editSubject })
            });
            if (currentStudentId !== null) {
                fetchGrades(currentStudentId);
            }
            setEditGradeId(null);
        }
    };

    const handleEditAbsenceClick = (absence: any) => {
        setEditAbsenceId(absence.id);
        setEditAbsenceDate(absence.date);
        setEditAbsenceSubject(absence.subject);
    };

    const handleSaveAbsenceClick = async () => {
        if (editAbsenceId !== null) {
            await fetch(`http://localhost:3000/api/absences/${editAbsenceId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: editAbsenceDate, subject: editAbsenceSubject })
            });
            if (currentStudentId !== null) {
                fetchAbsences(currentStudentId);
            }
            setEditAbsenceId(null);
        }
    };

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
                    <div className="popup-content">
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
                            <button className="submit" onClick={handleGradeSubmit}>Submit Grade</button>
                            <button className="cancel" onClick={closePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showPopup && currentPopup === 'viewGrades' && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Grades</h3>
                        <ul className="grades-list">
                            {grades.map((grade: any) => (
                                <li key={grade.id} className="grade-item">
                                    {editGradeId === grade.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editSubject}
                                                onChange={e => setEditSubject(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                value={editGrade}
                                                onChange={e => setEditGrade(e.target.value)}
                                            />
                                            <div className="grade-actions">
                                                <button className="save" onClick={handleSaveGradeClick}>Save</button>
                                                <button className="cancel" onClick={() => setEditGradeId(null)}>Cancel</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="grade-details">
                                                <span className="grade-subject">{grade.subject}:</span>
                                                <span className="grade-grade">{grade.grade}</span>
                                            </div>
                                            <div className="grade-actions">
                                                <button className="edit" onClick={() => handleEditGradeClick(grade)}>Edit</button>
                                                <button className="delete" onClick={() => deleteGrade(grade.id)}>Delete</button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <button className="cancel" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}

            {showPopup && currentPopup === 'addAbsence' && (
                <div className="popup-overlay">
                    <div className="popup-content">
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
                            <button className="submit" onClick={handleAbsenceSubmit}>Submit Absence</button>
                            <button className="cancel" onClick={closePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showPopup && currentPopup === 'viewAbsences' && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Absences</h3>
                        <ul className="absences-list">
                            {absences.map((absence: any) => (
                                <li key={absence.id} className="absence-item">
                                    {editAbsenceId === absence.id ? (
                                        <>
                                            <input
                                                type="date"
                                                value={editAbsenceDate}
                                                onChange={e => setEditAbsenceDate(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                value={editAbsenceSubject}
                                                onChange={e => setEditAbsenceSubject(e.target.value)}
                                            />
                                            <div className="absence-actions">
                                                <button className="save" onClick={handleSaveAbsenceClick}>Save</button>
                                                <button className="cancel" onClick={() => setEditAbsenceId(null)}>Cancel</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="absence-details">
                                                <span className="absence-date">{absence.date}:</span>
                                                <span className="absence-subject">{absence.subject}</span>
                                            </div>
                                            <div className="absence-actions">
                                                <button className="edit" onClick={() => handleEditAbsenceClick(absence)}>Edit</button>
                                                <button className="delete" onClick={() => deleteAbsence(absence.id)}>Delete</button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <button className="cancel" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};
