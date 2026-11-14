import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await api.post("/auth/register", form);
			alert("Registration successful! Please login.");
			navigate("/login");
		} catch (err) {
			setError(err.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<form className='auth-card' onSubmit={handleSubmit}>
				<h1>Student Registration</h1>
				<p>Create your student account</p>

				{error && <p className='error'>{error}</p>}

				<input
					name='name'
					placeholder='Full Name'
					value={form.name}
					onChange={handleChange}
					required
				/>

				<input
					name='email'
					type='email'
					placeholder='Email Address'
					value={form.email}
					onChange={handleChange}
					required
				/>

				<input
					name='password'
					type='password'
					placeholder='Password'
					value={form.password}
					onChange={handleChange}
					minLength={4}
					required
				/>

				<button disabled={loading}>
					{loading ? "Registering..." : "Register"}
				</button>

				<p>
					Already registered? <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
}
