import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
	const navigate = useNavigate();
	const { loginUser } = useAuth();

	const [form, setForm] = useState({
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
			const response = await api.post("/auth/login", form);

			loginUser(response.data);

			if (response.data.user.role === "admin") {
				navigate("/admin");
			} else {
				navigate("/dashboard");
			}
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='auth-container'>
			<form className='auth-card' onSubmit={handleSubmit}>
				<h1>Welcome Back</h1>
				<p>Login to your account</p>

				{error && <p className='error'>{error}</p>}

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
					required
				/>

				<button disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</button>

				<p>
					New student? <Link to='/register'>Register here</Link>
				</p>
			</form>
		</div>
	);
}
