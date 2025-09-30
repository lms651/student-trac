import React from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ViewProfile() {
    const { studentId } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = React.useState(null);
    const [enrollments, setEnrollments] = React.useState([]);

  React.useEffect(() => {
    // Fetch student profile
    const fetchProfile = async () => {
      try {
        const profileRes = await fetch(`http://localhost:4000/students/${studentId}`);
        const data = await profileRes.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch enrollments
    const fetchEnrollments = async () => {
      try {
        const enrollmentRes = await fetch(`http://localhost:4000/enrollments/${studentId}`);
        if (enrollmentRes.ok) {
          const data = await enrollmentRes.json();
          setEnrollments(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchEnrollments();
  }, [studentId]);

    return (
        <div className="view-profile-section">
            <h1>My Profile</h1>
            <div>My Information:
                <p>{profile ? `${profile.firstName} ${profile.middleName} ${profile.lastName}` : "Loading..."}</p>
                <p>  Student ID: {profile ? profile.publicStudentId : "Loading..."}</p>
            </div>
            <div className="my-course-display">My Enrollments:
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
                </tr>
                </thead>
                <tbody>
                {enrollments.map((e) => (
                    <tr key={e._id}>
                    <td>{e.course.publicCourseId}</td>
                    <td>{e.course.courseName}</td>
                    <td>{e.course.semester}</td>
                    <td>{e.course.year}</td>
                    <td>{e.GPA}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
                <button type="button" onClick={() => navigate(`/edit/${studentId}`)}>Edit Profile</button> 
                <button>Delete Profile</button> 
        </div> 
    )
}