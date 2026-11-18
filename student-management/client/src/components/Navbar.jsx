import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, User, LogOut, ShieldCheck } from "lucide-react";

export default function Navbar() {
	const { user, logoutUser } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutUser();
		navigate("/login");
	};

	const homeRoute = !user
		? "/login"
		: user.role === "admin"
		? "/admin/dashboard"
		: "/student/dashboard";

	return (
		<nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 px-4 sm:px-8 py-3.5 flex justify-between items-center">
			<Link
				to={homeRoute}
				className="flex items-center gap-2 text-xl font-bold text-blue-600 tracking-tight"
			>
				<BookOpen className="w-6 h-6" />
				<span>Student Portal</span>
			</Link>

			<div className="flex items-center gap-4 sm:gap-6">
				{user ? (
					<>
						{user.role === "admin" ? (
							<div className="flex items-center gap-3 sm:gap-4 text-sm">
								<Link
									to="/admin/courses"
									className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
								>
									Courses
								</Link>
								<Link
									to="/admin/enrollments"
									className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
								>
									Enrollments
								</Link>
								<Link
									to="/admin/profile"
									className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors"
								>
									<User className="w-4 h-4" />
									<span>Profile</span>
								</Link>
							</div>
						) : (
							<Link
								to="/student/dashboard"
								className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
							>
								My Dashboard
							</Link>
						)}

						<div className="h-4 w-px bg-slate-200 hidden sm:block" />

						<div className="flex items-center gap-3">
							<span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700">
								{user.name}
								{user.role === "admin" && (
									<span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 font-bold flex items-center gap-0.5">
										<ShieldCheck className="w-3 h-3" />
										Admin
									</span>
								)}
							</span>

							<button
								onClick={handleLogout}
								className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-sm font-medium rounded-lg transition-colors"
							>
								<LogOut className="w-4 h-4" />
								<span className="hidden sm:inline">Logout</span>
							</button>
						</div>
					</>
				) : (
					<div className="flex items-center gap-3 text-sm">
						<Link
							to="/login"
							className="px-3.5 py-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
						>
							Register
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
