export default function createProfile() {
    return (
        <div className="create-profile-section">
            <h1>Create Profile</h1>
            <form>
                <label htmlFor="firstName">First Name:</label>
                <input id="first-name" type="text" name="firstName" maxLength={255} placeholder="Sally" required/>

                <label htmlFor="middleName">Middle Name:</label>
                <input id="middle-name" type="text" name="middleName" maxLength={255} placeholder="Marie"/>

                <label htmlFor="lastName">Last Name:</label>
                <input id="last-name" type="text" name="lastName" maxLength={255} placeholder="Student" required/>

                <label htmlFor="publicStudentId">Student ID:</label>
                <input id="student-name" type="text" name="publicStudentId" maxLength={8} placeholder="U7711624" required/>

                <button type="submit">Save</button>
            </form>
                <button>Cancel</button> 
        </div> 
    )
}