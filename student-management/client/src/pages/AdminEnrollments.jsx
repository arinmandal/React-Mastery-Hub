import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
	UserPlus,
	Users,
	BookOpen,
	Trash2,
	Calendar,
	Search,
	AlertCircle,
	CheckCircle,
	XCircle,
	ShieldCheck,
	ArrowLeft,
} from "lucide-react";

export default function AdminEnrollments() {
	const [enrollments, setEnrollments] = useState([]);
	const [students, setStudents] = useState([]);
	const [courses, setCourses] = useState([]);

	const [selectedStudent, setSelectedStudent] = useState("");
	const [selectedCourse, setSelectedCourse] = useState("");

	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	// Load data from API
	const loadData = async () => {
		setLoading(true);
		setError("");
		try {
			const [enrollmentsRes, studentsRes, coursesRes] = await Promise.all([
				api.get("/enrollments"),
				api.get("/enrollments/students"),
				api.get("/courses"),
			]);

			setEnrollments(enrollmentsRes.data);
			setStudents(studentsRes.data);
			setCourses(coursesRes.data);
		} catch (err) {
			setError(err.response?.data?.message || "Failed to load enrollment data.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	// Handle assigning course to student
	const handleAssignCourse = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (!selectedStudent || !selectedCourse) {
			setError("Please select both a student and a course.");
			return;
		}

		setSubmitting(true);
		try {
			const res = await api.post("/enrollments", {
				student_id: Number(selectedStudent),
				course_id: Number(selectedCourse),
			});

			setSuccess(res.data.message || "Course assigned to student successfully!");
			setSelectedStudent("");
			setSelectedCourse("");
			await loadData();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to assign course to student.");
		} finally {
			setSubmitting(false);
		}
	};

	// Handle removing an enrollment
	const handleDeleteEnrollment = async (enrollmentId, studentName, courseTitle) => {
		const confirmed = window.confirm(
			`Are you sure you want to unenroll ${studentName} from "${courseTitle}"?`
		);
		if (!confirmed) return;

		setError("");
		setSuccess("");
		try {
			const res = await api.delete(`/enrollments/${enrollmentId}`);
			setSuccess(res.data.message || "Enrollment removed successfully.");
			await loadData();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to delete enrollment.");
		}
	};

	// Filter enrollments by student name, email, or course title
	const filteredEnrollments = enrollments.filter((item) => {
		const term = searchTerm.toLowerCase();
		return (
			item.student_name?.toLowerCase().includes(term) ||
			item.student_email?.toLowerCase().includes(term) ||
			item.course_title?.toLowerCase().includes(term)
		);
	});

	return (
		<div className="min-h-[85vh] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto space-y-8">
				{/* Header & Tabs */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
							<Users className="w-8 h-8 text-blue-600" />
							Student Course Enrollments
						</h1>
						<p className="text-slate-500 text-sm mt-1">
							Assign specific courses to students and manage enrollment records.
						</p>
					</div>

					{/* Navigation tabs */}
					<div className="flex items-center gap-2">
						<Link
							to="/admin/courses"
							className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 shadow-sm transition-colors"
						>
							<BookOpen className="w-4 h-4 text-blue-600" />
							Course Catalog
						</Link>
						<Link
							to="/admin/profile"
							className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 shadow-sm transition-colors"
						>
							<ShieldCheck className="w-4 h-4 text-purple-600" />
							Admin Profile
						</Link>
					</div>
				</div>

				{/* Stat Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
						<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
							Total Enrollments
						</span>
						<span className="text-2xl font-bold text-blue-600 mt-1 block">
							{enrollments.length}
						</span>
					</div>
					<div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
						<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
							Registered Students
						</span>
						<span className="text-2xl font-bold text-emerald-600 mt-1 block">
							{students.length}
						</span>
					</div>
					<div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
						<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
							Published Courses
						</span>
						<span className="text-2xl font-bold text-purple-600 mt-1 block">
							{courses.length}
						</span>
					</div>
				</div>

				{/* Alerts */}
				{error && (
					<div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
						<AlertCircle className="w-5 h-5 flex-shrink-0" />
						<span className="flex-1">{error}</span>
						<button onClick={() => setError("")} className="hover:opacity-75">
							<XCircle className="w-4 h-4" />
						</button>
					</div>
				)}

				{success && (
					<div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">
						<CheckCircle className="w-5 h-5 flex-shrink-0" />
						<span className="flex-1">{success}</span>
						<button onClick={() => setSuccess("")} className="hover:opacity-75">
							<XCircle className="w-4 h-4" />
						</button>
					</div>
				)}

				{/* Assign Course Form */}
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
					<div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
						<h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
							<UserPlus className="w-5 h-5 text-blue-600" />
							Assign Course to a Specific Student
						</h2>
					</div>

					<form onSubmit={handleAssignCourse} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Select Student */}
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Select Student <span className="text-red-500">*</span>
								</label>
								<select
									value={selectedStudent}
									onChange={(e) => setSelectedStudent(e.target.value)}
									required
									className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
								>
									<option value="">-- Choose a registered student --</option>
									{students.map((student) => (
										<option key={student.id} value={student.id}>
											{student.name} ({student.email})
										</option>
									))}
								</select>
								{students.length === 0 && (
									<p className="text-xs text-amber-600 mt-1">
										No students found. Register student accounts first.
									</p>
								)}
							</div>

							{/* Select Course */}
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Select Course <span className="text-red-500">*</span>
								</label>
								<select
									value={selectedCourse}
									onChange={(e) => setSelectedCourse(e.target.value)}
									required
									className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
								>
									<option value="">-- Choose a course --</option>
									{courses.map((course) => (
										<option key={course.id} value={course.id}>
											{course.title} {course.duration ? `(${course.duration})` : ""} - ₹{course.price}
										</option>
									))}
								</select>
								{courses.length === 0 && (
									<p className="text-xs text-amber-600 mt-1">
										No courses found. Add courses in Course Management first.
									</p>
								)}
							</div>
						</div>

						<div className="pt-2">
							<button
								type="submit"
								disabled={submitting || students.length === 0 || courses.length === 0}
								className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm disabled:opacity-50"
							>
								<UserPlus className="w-4 h-4" />
								{submitting ? "Assigning Course..." : "Assign Course to Student"}
							</button>
						</div>
					</form>
				</div>

				{/* Enrollments Table */}
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
						<h2 className="text-lg font-semibold text-slate-800">
							Active Student Enrollments ({enrollments.length})
						</h2>

						<div className="relative w-full sm:w-72">
							<input
								type="text"
								placeholder="Search by student or course..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
						</div>
					</div>

					{loading ? (
						<div className="text-center py-12 text-slate-500 text-sm">
							Loading enrollments list...
						</div>
					) : filteredEnrollments.length === 0 ? (
						<div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
							<p className="text-slate-500 text-sm">
								{searchTerm
									? "No enrollments found matching your search."
									: "No student course enrollments yet. Use the form above to assign courses."}
							</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-left border-collapse">
								<thead>
									<tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
										<th className="py-3 px-4">Student</th>
										<th className="py-3 px-4">Enrolled Course</th>
										<th className="py-3 px-4">Duration & Price</th>
										<th className="py-3 px-4">Date Enrolled</th>
										<th className="py-3 px-4 text-center">Action</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100 text-sm">
									{filteredEnrollments.map((item) => (
										<tr
											key={item.id}
											className="hover:bg-slate-50/80 transition-colors"
										>
											<td className="py-4 px-4 whitespace-nowrap">
												<div className="font-semibold text-slate-900">
													{item.student_name}
												</div>
												<div className="text-xs text-slate-500">
													{item.student_email}
												</div>
											</td>
											<td className="py-4 px-4">
												<span className="font-medium text-blue-600">
													{item.course_title}
												</span>
											</td>
											<td className="py-4 px-4 whitespace-nowrap text-slate-600">
												<div className="text-xs">
													{item.course_duration || "Self-paced"}
												</div>
												<div className="font-medium text-slate-800 text-xs mt-0.5">
													₹{Number(item.course_price || 0).toLocaleString("en-IN")}
												</div>
											</td>
											<td className="py-4 px-4 whitespace-nowrap text-slate-500 text-xs">
												<span className="inline-flex items-center gap-1">
													<Calendar className="w-3.5 h-3.5 text-slate-400" />
													{new Date(item.enrolled_at).toLocaleDateString()}
												</span>
											</td>
											<td className="py-4 px-4 whitespace-nowrap text-center">
												<button
													onClick={() =>
														handleDeleteEnrollment(
															item.id,
															item.student_name,
															item.course_title
														)
													}
													title="Unenroll student"
													className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md text-xs font-medium transition-colors"
												>
													<Trash2 className="w-3.5 h-3.5" />
													Unenroll
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
