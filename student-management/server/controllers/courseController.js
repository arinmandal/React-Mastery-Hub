
const db = require("../config/db");

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const [courses] = await db.execute(
            "SELECT * FROM courses ORDER BY created_at DESC"
        );

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};

// Add course
exports.addCourse = async (req, res) => {
    try {
        const { title, description, duration, price } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Course title is required"
            });
        }

        await db.execute(
            `INSERT INTO courses
            (title, description, duration, price)
            VALUES (?, ?, ?, ?)`,
            [title, description || "", duration || "", price || 0]
        );

        res.status(201).json({
            message: "Course added successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to add course" });
    }
};

// Update course
exports.updateCourse = async (req, res) => {
    try {
        const { title, description, duration, price } = req.body;
        const { id } = req.params;

        const [result] = await db.execute(
            `UPDATE courses
             SET title = ?, description = ?, duration = ?, price = ?
             WHERE id = ?`,
            [title, description, duration, price, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json({ message: "Course updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Failed to update course" });
    }
};

// Delete course
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM courses WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json({ message: "Course deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete course" });
    }
};
