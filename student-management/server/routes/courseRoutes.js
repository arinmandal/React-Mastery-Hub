
const express = require("express");
const router = express.Router();

const {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById
} = require("../controllers/courseController");

const {
    verifyToken,
    adminOnly
} = require("../middleware/authMiddleware");

router.get("/", verifyToken, getCourses);

router.post("/", verifyToken, adminOnly, addCourse);

router.put("/:id", verifyToken, adminOnly, updateCourse);

router.delete("/:id", verifyToken, adminOnly, deleteCourse);

router.get("/:id", verifyToken, getCourseById);

module.exports = router;
