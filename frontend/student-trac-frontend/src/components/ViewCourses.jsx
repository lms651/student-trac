import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AllCourses() {
    const navigate = useNavigate();
    const { studentId } = useParams();
    
    
    const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:4000/courses"); // only enabled courses
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async (courseId) => {
  try {
    const res = await fetch(`http://localhost:4000/enrollments/${studentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to enroll");
    }

    toastr.success("Course added!", "Success");

    // go back to student profile
    navigate(`/profile/${studentId}`);

  } catch (err) {
    console.error(err);
    toastr.error(err.message, "Error");
  }
};

  return (
    <div className="all-courses-section">
      <h2>All Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div className="table-wrapper">

        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.publicCourseId}</td>
                <td>{course.courseName}</td>
                <td>{course.semester}</td>
                <td>{course.year}</td>
                <td>
                  <button 
                    style={{ backgroundColor: "green", color: "white" }} 
                    onClick={() => handleAddCourse(course._id)} 
                  >+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        </div>
      )}
    </div>
  )
}