import React from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ViewProfile() {
    const { studentId } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = React.useState(null);
    const [enrollments, setEnrollments] = React.useState([]);
    const [deleteWarned, setDeleteWarned] = React.useState(false);


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

  const handleDelete = async () => {
    if (!deleteWarned) {
      toastr.warning("Click Delete Profile again to confirm deletion", "Warning");
      setDeleteWarned(true);
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/students/${studentId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete profile");

      toastr.success("Profile deleted!", "Success");
      navigate("/"); // back to landing page
    } catch (err) {
      toastr.error("Could not delete profile. Try again.", "Error");
      console.error(err);
    }
  };

    return (
        <div className="view-profile-section">
            <h1>Student Profile</h1>
            <div><b>Student Name:</b>
                <p>{profile ? `${profile.firstName} ${profile.middleName} ${profile.lastName}` : "Loading..."}</p>
                <p><b>Student ID:</b></p>
                <p>{profile ? profile.publicStudentId : "Loading..."}</p>
            </div>
            <div className="my-course-display"><b>Student Enrollments:</b>
              {enrollments.length === 0 ? (
                <p>No enrollments yet</p>
                  ) : (
                  <table>
                      <thead>
                      <tr>
                          <th>Course ID</th>
                          <th>Course Name</th>
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
                <button type="button" onClick={handleDelete}>Delete Profile</button> 
        </div> 
    )
}