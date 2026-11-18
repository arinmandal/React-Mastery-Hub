import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, ShieldCheck, BookOpen, LogOut, IdCard } from "lucide-react";

export default function AdminProfile() {
	const { user, logoutUser } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutUser();
		navigate("/login");
	};

	return (
		<div className="min-h-[85vh] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto space-y-6">
				{/* Header Section */}
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
					<div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
						<div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
							{user?.name ? user.name.charAt(0).toUpperCase() : "A"}
						</div>
						<div className="text-center sm:text-left flex-1">
							<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
								<h1 className="text-2xl font-bold text-slate-800">
									{user?.name || "Administrator"}
								</h1>
								<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 self-center sm:self-auto">
									<ShieldCheck className="w-3.5 h-3.5" />
									{user?.role?.toUpperCase() || "ADMIN"}
								</span>
							</div>
							<p className="text-slate-500 text-sm">
								System Administrator &bull; Student Management Portal
							</p>
						</div>

						<div className="flex gap-2">
							<Link
								to="/admin/courses"
								className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
							>
								<BookOpen className="w-4 h-4" />
								Manage Courses
							</Link>
						</div>
					</div>
				</div>

				{/* Account Details Card */}
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
					<h2 className="text-lg font-semibold text-slate-800 mb-5 border-b border-slate-100 pb-3">
						Account Details
					</h2>

					<dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
							<div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
								<User className="w-5 h-5" />
							</div>
							<div>
								<dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
									Full Name
								</dt>
								<dd className="text-sm font-semibold text-slate-800 mt-0.5">
									{user?.name || "N/A"}
								</dd>
							</div>
						</div>

						<div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
							<div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
								<Mail className="w-5 h-5" />
							</div>
							<div>
								<dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
									Email Address
								</dt>
								<dd className="text-sm font-semibold text-slate-800 mt-0.5">
									{user?.email || "N/A"}
								</dd>
							</div>
						</div>

						<div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
							<div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
								<ShieldCheck className="w-5 h-5" />
							</div>
							<div>
								<dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
									Assigned Role
								</dt>
								<dd className="text-sm font-semibold text-slate-800 mt-0.5 capitalize">
									{user?.role || "Admin"}
								</dd>
							</div>
						</div>

						<div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
							<div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
								<IdCard className="w-5 h-5" />
							</div>
							<div>
								<dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">
									Account ID
								</dt>
								<dd className="text-sm font-semibold text-slate-800 mt-0.5">
									#{user?.id || "1"}
								</dd>
							</div>
						</div>
					</dl>

					<div className="mt-8 pt-5 border-t border-slate-100 flex justify-between items-center">
						<span className="text-xs text-slate-400">
							Active session authenticated via JWT
						</span>
						<button
							onClick={handleLogout}
							className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-medium rounded-lg transition-colors"
						>
							<LogOut className="w-4 h-4" />
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
