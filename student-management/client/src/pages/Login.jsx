import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, GraduationCap, ArrowRight, KeyRound } from "lucide-react";

export default function Login() {
	const navigate = useNavigate();
	const { loginUser } = useAuth();

	// Login mode: "student" or "admin"
	const [loginRole, setLoginRole] = useState("student");

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

	// Switch tab between student & admin
	const handleRoleSwitch = (role) => {
		setLoginRole(role);
		setError("");
		if (role === "admin") {
			// Clear or keep
			setForm({ email: "", password: "" });
		} else {
			setForm({ email: "", password: "" });
		}
	};

	// Quick fill demo admin credentials
	const fillAdminDemo = () => {
		setForm({
			email: "admin@example.com",
			password: "Admin@123",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await api.post("/auth/login", form);

			// Optional check: if trying to log in as admin from the admin tab
			if (loginRole === "admin" && response.data.user.role !== "admin") {
				setError("This account does not have administrator privileges. Please login under Student Portal.");
				setLoading(false);
				return;
			}

			loginUser(response.data);

			if (response.data.user.role === "admin") {
				navigate("/admin/dashboard");
			} else {
				navigate("/student/dashboard");
			}
		} catch (err) {
			setError(err.response?.data?.message || "Login failed. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
				{/* Role Selector Tabs */}
				<div className="flex bg-slate-100 p-1 rounded-xl">
					<button
						type="button"
						onClick={() => handleRoleSwitch("student")}
						className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
							loginRole === "student"
								? "bg-white text-blue-600 shadow-sm"
								: "text-slate-500 hover:text-slate-700 bg-transparent"
						}`}
					>
						<GraduationCap className="w-4 h-4" />
						Student Login
					</button>
					<button
						type="button"
						onClick={() => handleRoleSwitch("admin")}
						className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
							loginRole === "admin"
								? "bg-white text-blue-600 shadow-sm"
								: "text-slate-500 hover:text-slate-700 bg-transparent"
						}`}
					>
						<ShieldCheck className="w-4 h-4" />
						Admin Login
					</button>
				</div>

				{/* Header */}
				<div className="text-center">
					<div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${
						loginRole === "admin" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
					}`}>
						{loginRole === "admin" ? (
							<ShieldCheck className="w-6 h-6" />
						) : (
							<GraduationCap className="w-6 h-6" />
						)}
					</div>
					<h1 className="text-2xl font-bold text-slate-800">
						{loginRole === "admin" ? "Admin Portal Login" : "Student Login"}
					</h1>
					<p className="text-sm text-slate-500 mt-1">
						{loginRole === "admin"
							? "Log in with administrative credentials to manage courses & students"
							: "Access your enrolled courses and student dashboard"}
					</p>
				</div>

				{/* Admin Demo Helper */}
				{loginRole === "admin" && (
					<div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-center justify-between">
						<div>
							<p className="font-semibold">Demo Admin Account:</p>
							<p className="font-mono text-[11px] text-amber-700">admin@example.com / Admin@123</p>
						</div>
						<button
							type="button"
							onClick={fillAdminDemo}
							className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium transition-colors"
						>
							<KeyRound className="w-3 h-3" />
							Auto-fill
						</button>
					</div>
				)}

				{error && (
					<div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
						{error}
					</div>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
							Email Address
						</label>
						<input
							name="email"
							type="email"
							placeholder={loginRole === "admin" ? "admin@example.com" : "student@example.com"}
							value={form.email}
							onChange={handleChange}
							required
							className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
							Password
						</label>
						<input
							name="password"
							type="password"
							placeholder="Enter your password"
							value={form.password}
							onChange={handleChange}
							required
							className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{loading ? "Authenticating..." : `Login as ${loginRole === "admin" ? "Administrator" : "Student"}`}
						<ArrowRight className="w-4 h-4" />
					</button>
				</form>

				{/* Footer Navigation */}
				<div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
					{loginRole === "student" ? (
						<p>
							New student?{" "}
							<Link to="/register" className="text-blue-600 hover:underline font-semibold">
								Create an account here
							</Link>
						</p>
					) : (
						<p>
							Not an admin?{" "}
							<button
								type="button"
								onClick={() => handleRoleSwitch("student")}
								className="text-blue-600 hover:underline font-semibold bg-transparent border-none p-0 inline cursor-pointer"
							>
								Switch to Student Login
							</button>
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
