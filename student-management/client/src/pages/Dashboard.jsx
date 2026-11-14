import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
	const { user } = useAuth();
	const [courses, setCourses] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await api.get("/courses");
				setCourses(response.data);
			} catch (err) {
				setError(err.response?.data?.message || "Unable to load courses");
			}
		};

		fetchCourses();
	}, []);

	return (
		<main className='container'>
			<h1>Student Dashboard</h1>
			<p>Welcome, {user?.name}!</p>

			<h2>Available Courses</h2>

			{error && <p className='error'>{error}</p>}

			<div className='course-grid'>
				{courses.length === 0 && !error && <p>No courses available yet.</p>}

				{courses.map((course) => (
					<article className='course-card' key={course.id}>
						<h3>{course.title}</h3>
						<p>{course.description}</p>
						<p>Duration: {course.duration}</p>
						<strong>Price: ₹{course.price}</strong>
					</article>
				))}
			</div>
		</main>
	);
}
