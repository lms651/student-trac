 import mongoose from "mongoose"; 

const courseSchema = new mongoose.Schema({
    publicCourseId: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 10
    },
    courseName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 512
    },
    semester: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 48
    },
    year: {
        type: Number,
        required: true,
    },
    enabled: {  
        type: Boolean,
        default: false,
        required: true
    }
}, {
    // adds createdAt and updatedAt automatically
    timestamps: true 
})

const Course = mongoose.model("Course", courseSchema);

export default Course;