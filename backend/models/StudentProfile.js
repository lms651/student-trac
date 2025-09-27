 import mongoose from "mongoose"; 

const studentProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    middleName: {
        type: String,
        minlength: 1,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    publicStudentId: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 8
    },
    // for soft delete
    isDeleted: {  
        type: Date
    }
}, {
    // adds createdAt and updatedAt automatically
    timestamps: true 
})

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

export default StudentProfile;