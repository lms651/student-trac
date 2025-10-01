import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditInfo() {
    const navigate = useNavigate();
    const { studentId } = useParams();

    const [profile, setProfile] = React.useState(null);
    const [enrollments, setEnrollments] = React.useState([]);

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
            const res = await fetch(`http://localhost:4000/students/${studentId}`);
            const data = await res.json();
            setProfile(data);
            } catch (err) {
            console.error(err);
            }
        };

        const fetchEnrollments = async () => {
            try {
            const res = await fetch(`http://localhost:4000/enrollments/${studentId}`);
            if (res.ok) {
                const data = await res.json();
                setEnrollments(data);
            }
            } catch (err) {
            console.error(err);
            }
        };

        fetchProfile();
        fetchEnrollments();
    }, [studentId]);

    const handleChange = (event) => {
        setProfile({ ...profile, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/students/${studentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile)
            });

            if (!res.ok) throw new Error("Failed to update profile");
        
            toastr.success("Profile updated!", "Success");
            navigate(`/profile/${studentId}`); // redirect to the profile view page on submit

        } catch (err) {
            toastr.error("Could not update profile. Try again.", "Error");
        }
    }

    const handleDeleteCourse = async (courseId) => {
        try {
            const res = await fetch(`http://localhost:4000/enrollments/${studentId}/${courseId}`, {
            method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete course");

            // Remove the course from state to update the table immediately
            setEnrollments(enrollments.filter(enrollment => enrollment.course._id !== courseId));
            toastr.success("Course removed", "Success");
        } catch (err) {
            toastr.error("Could not remove course", "Error");
        }
    }

    return (
        <div className="edit-info-section">
            <h1>Edit Information</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input id="first-name" type="text" name="firstName" maxLength={255} value={profile?.firstName || ""} onChange={handleChange} required/>

                <label htmlFor="middleName">Middle Name:</label>
                <input id="middle-name" type="text" name="middleName" maxLength={255} value={profile?.middleName || ""} onChange={handleChange}/>

                <label htmlFor="lastName">Last Name:</label>
                <input id="last-name" type="text" name="lastName" maxLength={255} value={profile?.lastName || ""} onChange={handleChange} required/>

                <label htmlFor="publicStudentId">Student ID:</label>
                <input id="student-name" type="text" name="publicStudentId" maxLength={8} value={profile?.publicStudentId || ""} onChange={handleChange} required/>

                <button type="submit">Save</button>
            </form>
                
            <div id="edit-my-courses-table">
            <b>Edit Enrollments</b>
            {enrollments.length === 0 ? (
                <p>No enrollments yet</p>
            ) : (
                <table>
                <thead>
                    <tr>
                    <th>Course ID</th>
                    <th>Name</th>
                    <th>Semester</th>
                    <th>Year</th>
                    <th>GPA</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map((enrollment) => (
                    <tr key={enrollment._id}>
                        <td>{enrollment.course.publicCourseId}</td>
                        <td>{enrollment.course.courseName}</td>
                        <td>{enrollment.course.semester}</td>
                        <td>{enrollment.course.year}</td>
                        <td>{enrollment.GPA}</td>
                        <td><button style= {{ backgroundColor: "#c71616ff", color: "white", cursor: "pointer" }}
                        onClick={() => handleDeleteCourse(enrollment.course._id)}
                        >X</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </div>
                <button type="button" onClick={()=> navigate(`/profile/${studentId}/courses`)}>Add Courses</button>
                <button type="button" onClick={() => navigate(`/profile/${studentId}`)}>Cancel</button>
        </div> 
    )
}