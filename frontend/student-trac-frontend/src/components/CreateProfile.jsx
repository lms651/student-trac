import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateProfile() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        publicStudentId: ""
    })

    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error("Failed to create profile");
            }

            const profile = await response.json();
            toastr.success("Profile Created!", "Success");
            navigate(`/profile/${profile._id}`); // <-- use profile._id, not studentId

        } catch (err) {
            toastr.error("Could not create profile. Please try again.", "Error");
        }
    }

    return (
        <div className="create-profile-section">
            <h1>Create Profile</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input id="first-name" type="text" name="firstName" maxLength={255} placeholder="Sally" value={formData.firstName} onChange={handleChange} required/>

                <label htmlFor="middleName">Middle Name:</label>
                <input id="middle-name" type="text" name="middleName" maxLength={255} placeholder="Marie" value={formData.middleName} onChange={handleChange}/>

                <label htmlFor="lastName">Last Name:</label>
                <input id="last-name" type="text" name="lastName" maxLength={255} placeholder="Student" value={formData.lastName} onChange={handleChange} required/>

                <label htmlFor="publicStudentId">Student ID:</label>
                <input id="student-name" type="text" name="publicStudentId" maxLength={8} placeholder="U7711624" value={formData.publicStudentId} onChange={handleChange} required/>

                <button type="submit">Save</button>
            </form>
                <button type="button" onClick={() => navigate("/")}>Cancel</button> 
        </div> 
    )
}