import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Teachers = () => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [currentPopup, setCurrentPopup] = useState('');
    const [newTeacher, setNewTeacher] = useState({
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
        role: 'TEACHER',  // Setting the role to TEACHER
        teacher_number: ''
    });

    const filteredTeachers = teachers.filter((teacher: any) =>
        teacher.teacher_number.includes(searchTerm)
    );

    useEffect(() => {
        const getTeachers = async () => {
            const result = await fetch("http://localhost:3000/api/teachers");
            const payload = await result.json();
            console.log(payload);
            setTeachers(payload);
        };
        getTeachers();
    }, []);

    const openPopup = (popupType: string) => {
        setCurrentPopup(popupType);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setNewTeacher({
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
            role: 'TEACHER',  // Resetting the role to TEACHER
            teacher_number: ''
        });
    };

    const handleTeacherSubmit = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
        await fetch(`http://localhost:3000/api/teachers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...newTeacher, date_added: currentDate})
        });
        closePopup();
        const getTeachers = async () => {
            const result = await fetch("http://localhost:3000/api/teachers");
            const payload = await result.json();
            setTeachers(payload);
        };
        getTeachers();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewTeacher(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className="main">
                <div className="list-container">
                    <div className="flex">
                        <h2>All Teachers</h2>
                        {user.role === 'ADMIN' && <button onClick={() => openPopup('addTeacher')}>Add Teacher</button>}
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Teacher Number"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <ul className="list">
                        {filteredTeachers.map((teacher: any, index) => (
                            <li key={index} className="item">
                                {user.role === 'ADMIN' ? (
                                    <Link to={`/teachers/${teacher.id}`}>
                                        <div>
                                            <strong>{teacher.first_name} {teacher.last_name}</strong>
                                            <p>{teacher.teacher_number}</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div>
                                        <strong>{teacher.first_name} {teacher.last_name}</strong>
                                        <p>{teacher.teacher_number}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {showPopup && currentPopup === 'addTeacher' && user.role === 'ADMIN' && (
                    <div className="popup-overlay">
                        <div className="popup-content add">
                            <h3>Add Teacher</h3>
                            <input
                                type="text"
                                name="personal_identification_number"
                                placeholder="Personal Identification Number"
                                value={newTeacher.personal_identification_number}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="gender"
                                placeholder="Gender"
                                value={newTeacher.gender}
                                onChange={handleInputChange}
                            />
                            <input
                                type="date"
                                name="birth_date"
                                placeholder="Birth Date"
                                value={newTeacher.birth_date}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={newTeacher.phone_number}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={newTeacher.first_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newTeacher.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={newTeacher.address}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="degree"
                                placeholder="Degree"
                                value={newTeacher.degree}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="specialty"
                                placeholder="Specialty"
                                value={newTeacher.specialty}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={newTeacher.last_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="given_name"
                                placeholder="Given Name"
                                value={newTeacher.given_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={newTeacher.password}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="teacher_number"
                                placeholder="Teacher Number"
                                value={newTeacher.teacher_number}
                                onChange={handleInputChange}
                            />
                            <div className="button-group">
                                <button className="inputCancel" onClick={closePopup}>Cancel</button>
                                <button className="submit" onClick={handleTeacherSubmit}>Submit Teacher</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
