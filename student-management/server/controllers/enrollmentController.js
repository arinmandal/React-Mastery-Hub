const db = require("../config/db");

// Get all student course enrollments (Admin only)
exports.getAllEnrollments = async (req, res) => {
    try {
        const [enrollments] = await db.execute(
            `SELECT e.id, e.student_id, e.course_id, e.enrolled_at,
                    u.name AS student_name, u.email AS student_email,
                    c.title AS course_title, c.duration AS course_duration, c.price AS course_price
             FROM enrollments e
             JOIN users u ON e.student_id = u.id
             JOIN courses c ON e.course_id = c.id
             ORDER BY e.enrolled_at DESC`
        );

        res.json(enrollments);
    } catch (error) {
        console.error("Failed to fetch enrollments:", error);
        res.status(500).json({ message: "Failed to fetch student enrollments" });
    }
};

// Get list of all registered students (Admin only)
exports.getStudents = async (req, res) => {
    try {
        const [students] = await db.execute(
            `SELECT id, name, email, created_at
             FROM users
             WHERE role = 'student'
             ORDER BY name ASC`
        );

        res.json(students);
    } catch (error) {
        console.error("Failed to fetch students:", error);
        res.status(500).json({ message: "Failed to fetch student list" });
    }
};

// Assign/Enroll a specific student in a course (Admin only)
exports.assignCourse = async (req, res) => {
    try {
        const { student_id, course_id } = req.body;

        if (!student_id || !course_id) {
            return res.status(400).json({
                message: "Both student_id and course_id are required."
            });
        }

        // Check if student exists
        const [student] = await db.execute(
            "SELECT id, name, email FROM users WHERE id = ? AND role = 'student'",
            [student_id]
        );

        if (student.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Check if course exists
        const [course] = await db.execute(
            "SELECT id, title FROM courses WHERE id = ?",
            [course_id]
        );

        if (course.length === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check for duplicate enrollment
        const [existing] = await db.execute(
            "SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?",
            [student_id, course_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "This student is already enrolled in this course."
            });
        }

        // Insert enrollment
        const [result] = await db.execute(
            "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)",
            [student_id, course_id]
        );

        res.status(201).json({
            message: `Successfully enrolled ${student[0].name} in "${course[0].title}"`,
            enrollmentId: result.insertId
        });
    } catch (error) {
        console.error("Failed to assign course:", error);
        res.status(500).json({ message: "Failed to assign course to student" });
    }
};

// Unenroll/Remove course from student (Admin only)
exports.deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM enrollments WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Enrollment record not found" });
        }

        res.json({ message: "Student successfully removed from course." });
    } catch (error) {
        console.error("Failed to delete enrollment:", error);
        res.status(500).json({ message: "Failed to remove enrollment" });
    }
};

// Get current logged-in student's enrolled courses (Student only)
exports.getMyEnrollments = async (req, res) => {
    try {
        const studentId = req.user.id;

        const [courses] = await db.execute(
            `SELECT e.id AS enrollment_id, e.enrolled_at,
                    c.id, c.title, c.description, c.duration, c.price
             FROM enrollments e
             JOIN courses c ON e.course_id = c.id
             WHERE e.student_id = ?
             ORDER BY e.enrolled_at DESC`,
            [studentId]
        );

        res.json(courses);
    } catch (error) {
        console.error("Failed to fetch my courses:", error);
        res.status(500).json({ message: "Failed to fetch your enrolled courses" });
    }
};
