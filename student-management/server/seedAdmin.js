
require("dotenv").config();

const db = require("./config/db");
const bcrypt = require("bcryptjs");

async function createAdmin() {
    const email = "admin@example.com";
    const password = "Admin@123";

    try {
        const [existing] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            `INSERT INTO users (name, email, password, role)
             VALUES (?, ?, ?, 'admin')`,
            ["Administrator", email, hashedPassword]
        );

        console.log("Admin account created!");

    } catch (error) {
        console.error(error);
    } finally {
        await db.end();
    }
}

createAdmin();
