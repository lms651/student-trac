export default function ViewProfile() {
    return (
        <div className="view-profile-section">
            <h1>My Profile</h1>
            <div>My Information
                <p>First name + middleName + lastName to be fetched</p>
                <p>Student ID: to be fetched</p>
            </div>
            <div className="my-course-display">My Courses
                <ul>
                    <li>example course 1!</li>
                    <li>example course 2!</li>
                </ul>
            </div>
                <button>Edit Info</button> 
                <button>Add Courses</button>
                <button>Delete Profile</button> 
        </div> 
    )
}