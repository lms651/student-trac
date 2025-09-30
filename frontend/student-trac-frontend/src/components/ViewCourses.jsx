// export default function ViewCourses() {
//     return (
//         <div className="view-courses-section">
//             <h1>Available Courses</h1>

//             <div className="all-course-display">All Courses
//                 <p>This will be a table that has all the info from the database and an 'add' button for the row</p>
//             </div>
//                 <button>Back</button> 
//         </div> 
//     )
// }

import React from "react";
//add prop onAddCourse
export default function AllCourses() {
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
              <th>Name</th>
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
                    // onClick={() => onAddCourse(course)}
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