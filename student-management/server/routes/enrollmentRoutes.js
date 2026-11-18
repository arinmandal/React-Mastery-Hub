const express = require("express");
const router = express.Router();

const {
    getAllEnrollments,
    getStudents,
    assignCourse,
    deleteEnrollment,
    getMyEnrollments
} = require("../controllers/enrollmentController");

const {
    verifyToken,
    adminOnly
} = require("../middleware/authMiddleware");

// Student: Get my enrolled courses
router.get("/my-courses", verifyToken, getMyEnrollments);

// Admin: Get all student course enrollments
router.get("/", verifyToken, adminOnly, getAllEnrollments);

// Admin: Get all registered students
router.get("/students", verifyToken, adminOnly, getStudents);

// Admin: Assign course to a specific student
router.post("/", verifyToken, adminOnly, assignCourse);

// Admin: Remove a course enrollment
router.delete("/:id", verifyToken, adminOnly, deleteEnrollment);

module.exports = router;
