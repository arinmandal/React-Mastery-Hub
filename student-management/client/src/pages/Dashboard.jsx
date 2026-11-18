import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { BookOpen, CheckCircle, Clock, IndianRupee, Sparkles, GraduationCap } from "lucide-react";

export default function Dashboard() {
	const { user } = useAuth();
	const [myCourses, setMyCourses] = useState([]);
	const [allCourses, setAllCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadDashboardData = async () => {
			setLoading(true);
			setError("");
			try {
				const [myCoursesRes, allCoursesRes] = await Promise.all([
					api.get("/enrollments/my-courses").catch(() => ({ data: [] })),
					api.get("/courses").catch(() => ({ data: [] })),
				]);

				setMyCourses(myCoursesRes.data || []);
				setAllCourses(allCoursesRes.data || []);
			} catch (err) {
				setError(err.response?.data?.message || "Unable to load courses");
			} finally {
				setLoading(false);
			}
		};

		loadDashboardData();
	}, []);

	// Set of enrolled course IDs
	const enrolledCourseIds = new Set(myCourses.map((c) => c.id));

	return (
		<div className="min-h-[85vh] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto space-y-8">
				{/* Welcome Header */}
				<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 flex items-center gap-1">
								<GraduationCap className="w-3.5 h-3.5" />
								Student Portal
							</span>
						</div>
						<h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
							Welcome back, {user?.name || "Student"}!
						</h1>
						<p className="text-slate-500 text-sm mt-1">
							Track your enrolled subjects and browse available learning opportunities.
						</p>
					</div>

					<div className="flex items-center gap-3">
						<div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-center">
							<span className="text-xs font-medium text-blue-600 uppercase tracking-wider block">
								My Enrolled Courses
							</span>
							<span className="text-2xl font-bold text-blue-700">
								{myCourses.length}
							</span>
						</div>
					</div>
				</div>

				{error && (
					<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
						{error}
					</div>
				)}

				{/* Section 1: My Enrolled Courses (Assigned by Admin) */}
				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
							<Sparkles className="w-5 h-5 text-amber-500" />
							My Enrolled Courses ({myCourses.length})
						</h2>
					</div>

					{loading ? (
						<p className="text-slate-500 text-sm py-6">Loading enrolled courses...</p>
					) : myCourses.length === 0 ? (
						<div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
							<BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
							<p className="text-slate-600 font-medium">You are not enrolled in any course yet.</p>
							<p className="text-slate-400 text-xs mt-1">
								Once an administrator assigns a course to your account, it will appear here.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{myCourses.map((course) => (
								<div
									key={course.enrollment_id || course.id}
									className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
								>
									<div className="absolute top-0 right-0 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
										<CheckCircle className="w-3 h-3" />
										Active Enrollment
									</div>

									<div className="pt-2">
										<h3 className="text-lg font-bold text-slate-800 mb-2">
											{course.title}
										</h3>
										<p className="text-slate-600 text-sm mb-4 line-clamp-3">
											{course.description || "No description provided."}
										</p>
									</div>

									<div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
										<span className="flex items-center gap-1 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
											<Clock className="w-3.5 h-3.5 text-slate-400" />
											{course.duration || "Self-paced"}
										</span>
										{course.enrolled_at && (
											<span>Enrolled: {new Date(course.enrolled_at).toLocaleDateString()}</span>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</section>

				{/* Section 2: All Available Courses Catalog */}
				<section className="space-y-4 pt-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
							<BookOpen className="w-5 h-5 text-blue-600" />
							All Available Courses ({allCourses.length})
						</h2>
					</div>

					{loading ? (
						<p className="text-slate-500 text-sm py-6">Loading course catalog...</p>
					) : allCourses.length === 0 ? (
						<p className="text-slate-500 text-sm">No courses currently available in catalog.</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{allCourses.map((course) => {
								const isEnrolled = enrolledCourseIds.has(course.id);
								return (
									<div
										key={course.id}
										className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
									>
										<div>
											<div className="flex items-start justify-between gap-2 mb-2">
												<h3 className="text-lg font-bold text-slate-800">
													{course.title}
												</h3>
												{isEnrolled && (
													<span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">
														Enrolled
													</span>
												)}
											</div>
											<p className="text-slate-600 text-sm mb-4 line-clamp-3">
												{course.description || "No description provided."}
											</p>
										</div>

										<div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
											<span className="flex items-center gap-1 font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
												<Clock className="w-3.5 h-3.5 text-slate-400" />
												{course.duration || "Self-paced"}
											</span>
											<span className="font-bold text-slate-800 text-sm">
												₹{Number(course.price || 0).toLocaleString("en-IN")}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
