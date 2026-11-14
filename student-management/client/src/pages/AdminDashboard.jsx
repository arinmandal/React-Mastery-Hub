import { useEffect, useState } from "react";
import api from "../services/api";

const initialForm = {
	title: "",
	description: "",
	duration: "",
	price: "",
};

export default function AdminDashboard() {
	const [courses, setCourses] = useState([]);
	const [form, setForm] = useState(initialForm);
	const [editingId, setEditingId] = useState(null);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const fetchCourses = async () => {
		try {
			const response = await api.get("/courses");
			setCourses(response.data);
		} catch (err) {
			setError("Could not load courses");
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");

		try {
			if (editingId) {
				await api.put(`/courses/${editingId}`, form);
				setMessage("Course updated successfully");
			} else {
				await api.post("/courses", form);
				setMessage("Course added successfully");
			}

			setForm(initialForm);
			setEditingId(null);
			await fetchCourses();
		} catch (err) {
			setError(err.response?.data?.message || "Operation failed");
		}
	};

	const handleEdit = (course) => {
		setForm({
			title: course.title,
			description: course.description || "",
			duration: course.duration || "",
			price: course.price,
		});

		setEditingId(course.id);
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this course?")) {
			return;
		}

		try {
			await api.delete(`/courses/${id}`);
			setMessage("Course deleted successfully");
			await fetchCourses();
		} catch (err) {
			setError("Failed to delete course");
		}
	};

	return (
		<main className='container'>
			<h1>Admin Dashboard</h1>
			<p>Manage your courses here.</p>

			{message && <p className='success'>{message}</p>}
			{error && <p className='error'>{error}</p>}

			<form className='course-form' onSubmit={handleSubmit}>
				<h2>{editingId ? "Edit Course" : "Add New Course"}</h2>

				<input
					name='title'
					placeholder='Course Title'
					value={form.title}
					onChange={handleChange}
					required
				/>

				<textarea
					name='description'
					placeholder='Course Description'
					value={form.description}
					onChange={handleChange}
				/>

				<input
					name='duration'
					placeholder='Duration (e.g. 3 months)'
					value={form.duration}
					onChange={handleChange}
				/>

				<input
					name='price'
					type='number'
					min='0'
					step='0.01'
					placeholder='Course Price'
					value={form.price}
					onChange={handleChange}
				/>

				<button type='submit'>
					{editingId ? "Update Course" : "Add Course"}
				</button>

				{editingId && (
					<button
						type='button'
						onClick={() => {
							setEditingId(null);
							setForm(initialForm);
						}}>
						Cancel Edit
					</button>
				)}
			</form>

			<h2>All Courses ({courses.length})</h2>

			<div className='course-grid'>
				{courses.map((course) => (
					<article className='course-card' key={course.id}>
						<h3>{course.title}</h3>
						<p>{course.description}</p>
						<p>{course.duration}</p>
						<strong>₹{course.price}</strong>

						<div className='actions'>
							<button onClick={() => handleEdit(course)}>Edit</button>

							<button
								className='delete-btn'
								onClick={() => handleDelete(course.id)}>
								Delete
							</button>
						</div>
					</article>
				))}
			</div>
		</main>
	);
}
