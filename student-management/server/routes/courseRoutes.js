
const express = require("express");
const router = express.Router();

const {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const {
    verifyToken,
    adminOnly
} = require("../middleware/authMiddleware");

router.get("/", verifyToken, getCourses);

router.post("/", verifyToken, adminOnly, addCourse);

router.put("/:id", verifyToken, adminOnly, updateCourse);

router.delete("/:id", verifyToken, adminOnly, deleteCourse);

module.exports = router;
