import mongoose from "mongoose";
import dotenv from "dotenv";
import StudentProfile from "../models/StudentProfile.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

dotenv.config();

const testConnectDB = async () => { 
  try {
    await mongoose.connect(
      `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env.TEST_DBNAME}`
    );
    console.log("Connected to Tests MongoDB"); 
  } catch (err) {
    console.error("DB Test connection failed:", err.message); 
    process.exit(1);
  }
}

beforeAll(async () => {
  await testConnectDB();
})

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // clean test db
  await mongoose.connection.close();
})

describe("StudentProfile Model", () => {
    it("should create a student profile with all required and optional fields", async () => {
        const student = await StudentProfile.create({
        firstName: "Lori",
        middleName: "M",
        lastName: "Schmidt",
        publicStudentId: "U712",
        isDeleted: null
        })

        expect(student._id).toBeDefined();
        expect(student.firstName).toBe("Lori");
        expect(student.middleName).toBe("M");
        expect(student.lastName).toBe("Schmidt");
        expect(student.publicStudentId).toBe("U712");
        expect(student.isDeleted).toBeNull();
    })

    it("should throw an error if a required field is missing", async () => {
        let error;
        try {
            const student = await StudentProfile.create({
            firstName: null,
            middleName: "M",
            lastName: "Schmidt",
            publicStudentId: "U713",
            isDeleted: null
            })
        } catch (err) {
                error = err;
            }
        // Confirm error was thrown and specifically on which field
        expect(error).toBeDefined();
        expect(error.errors.firstName).toBeDefined();

        // Confirm student was not saved
        const student = await StudentProfile.findOne({ publicStudentId: "U713" });
        expect(student).toBeNull();
    })

    it("should throw an error if publicStudentId is not unique", async () => {
        let error;

        try {
            await StudentProfile.create({
                firstName: "Another",
                lastName: "Student",
                publicStudentId: "U712",// same as first test
            })
        } catch (err) {
            error = err;
        }

        // Confirm error was thrown
        expect(error).toBeDefined();
        expect(error.code).toBe(11000); // Mongo's duplicate key error code

        // Confirm student was not saved
        const student = await StudentProfile.findOne({ firstName: "Another" });
        expect(student).toBeNull();
    })
  
    it("should throw an error if there is a domain violation", async () => {
        let error;
        try {
            const student = await StudentProfile.create({
            firstName: "Sarah",
            middleName: "M",
            lastName: "Schmidt",
            publicStudentId: "U77116242", // 9 digits
            isDeleted: null
            })
        } catch (err) {
                error = err;
            }
        // Confirm error was thrown and specifically on which field
        expect(error).toBeDefined(); 
        expect(error.errors.publicStudentId).toBeDefined();

        // Confirm student was not saved
        const student = await StudentProfile.findOne({ firstName: "Sarah" });
        expect(student).toBeNull();
    })
})

describe("Course Model", () => {
    it("should create a course with all required and optional fields", async () => {
        const course = await Course.create({
            publicCourseId: "METCS601",
            courseName: "Web App Development",
            semester: "Summer",
            year: 2025,
            enabled: true
            })
        expect(course._id).toBeDefined();
        expect(course.publicCourseId).toBe("METCS601");
        expect(course.courseName).toBe("Web App Development");
        expect(course.semester).toBe("Summer");
        expect(course.year).toBe(2025);
        expect(course.enabled).toBe(true);
    })

    it("should throw an error if a required field is missing", async () => {
        let error;
        try {
            await Course.create({
                courseName: "No Public Course ID",
                semester: "Spring",
                year: 2025
                // missing publicCourseId
            })
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.publicCourseId).toBeDefined();

        // Confirm course wasn't saved
        const course = await Course.findOne({ courseName: "No Public Course ID" });
        expect(course).toBeNull();
    })

    it("should throw an error if publicCourseId is not unique", async () => {
        let error;
            try {
                await Course.create({
                    publicCourseId: "METCS601", // same as first test
                    courseName: "Duplicate Course",
                    semester: "Fall",
                    year: 2025
                });
            } catch (err) {
                error = err;
                }

        expect(error).toBeDefined();
        expect(error.code).toBe(11000); // Mongo duplicate key
    })

    
    it("should throw an error if a domain violation occurs", async () => {
        let error;
        try {
            await Course.create({
                publicCourseId: "METCS123456789", // too long
                courseName: "Long Public Course ID",
                semester: "Spring",
                year: 2025
            })
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.publicCourseId).toBeDefined();

        // Confirm it wasn't saved
        const course = await Course.findOne({ courseName: "Long Public Course ID" });
        expect(course).toBeNull();
    })
})

describe("Enrollment Model", () => {
    let student;
    let course;

    beforeEach(async () => {
        await StudentProfile.deleteMany({});
        await Course.deleteMany({});
        await Enrollment.deleteMany({});

        student = await StudentProfile.create({
            firstName: "Test",
            lastName: "Student",
            publicStudentId: "U999",
        })

        course = await Course.create({
            publicCourseId: "TEST101",
            courseName: "Test Course",
            semester: "Fall",
            year: 2025,
        })
    })

    it("should create an enrollment with a student and course", async () => {
        const enrollment = await Enrollment.create({
            courses: [
                {
                student: student._id,
                course: course._id,
                dateEnrolled: new Date(),
                }
            ]
        })

    expect(enrollment._id).toBeDefined();
    expect(enrollment.courses[0].student.toString()).toBe(student._id.toString());
    expect(enrollment.courses[0].course.toString()).toBe(course._id.toString());
    expect(enrollment.courses[0].GPA).toBe(0.0); // default
    })

    it("should allow a student to enroll in multiple courses", async () => {
        const student = await StudentProfile.create({
            firstName: "Sally",
            lastName: "Student",
            publicStudentId: "U888",
        })

        const course1 = await Course.create({
            publicCourseId: "CS101",
            courseName: "Intro to CS",
            semester: "Fall",
            year: 2025
        })

        const course2 = await Course.create({
            publicCourseId: "CS102",
            courseName: "Data Structures",
            semester: "Fall",
            year: 2025
        })

        const enrollment = await Enrollment.create({
            courses: [
                { student: student._id, course: course1._id, dateEnrolled: new Date() },
                { student: student._id, course: course2._id, dateEnrolled: new Date() }
            ]
        })

    expect(enrollment._id).toBeDefined();
    expect(enrollment.courses.length).toBe(2);

    // First course
    expect(enrollment.courses[0].student.toString()).toBe(student._id.toString());
    expect(enrollment.courses[0].course.toString()).toBe(course1._id.toString());

    // Second course
    expect(enrollment.courses[1].student.toString()).toBe(student._id.toString());
    expect(enrollment.courses[1].course.toString()).toBe(course2._id.toString());
    })

    it("should not allow the same student to enroll in the same course twice", async () => {
        let error;

        try {
            await Enrollment.create({
                courses: [
                { student: student._id, course: course._id, dateEnrolled: new Date() },
                { student: student._id, course: course._id, dateEnrolled: new Date() }
                ]
            })
        } catch (err) {
        error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.courses.message).toBe("Duplicate course enrollment is not allowed.");
    })
})


