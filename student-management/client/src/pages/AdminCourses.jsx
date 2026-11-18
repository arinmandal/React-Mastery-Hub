import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
	BookOpen,
	PlusCircle,
	Edit,
	Trash2,
	Clock,
	IndianRupee,
	Search,
	XCircle,
	CheckCircle,
	AlertCircle,
	Users,
} from "lucide-react";

const initialForm = {
	title: "",
	description: "",
	duration: "",
	price: "",
};

export default function AdminCourses() {
	const [courses, setCourses] = useState([]);
	const [form, setForm] = useState(initialForm);
	const [editingId, setEditingId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	// Fetch all courses (GET /api/courses)
	const fetchCourses = async () => {
		setLoading(true);
		setError("");
		try {
			const res = await api.get("/courses");
			setCourses(res.data);
		} catch (err) {
			setError(err.response?.data?.message || "Failed to load courses");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	// Handle input changes
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Handle Create (POST /api/courses) or Update (PUT /api/courses/:id)
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (!form.title.trim()) {
			setError("Course title is required.");
			return;
		}

		setSubmitting(true);
		try {
			if (editingId) {
				// Update course
				await api.put(`/courses/${editingId}`, form);
				setSuccess("Course updated successfully!");
			} else {
				// Add new course
				await api.post("/courses", form);
				setSuccess("Course added successfully!");
			}

			setForm(initialForm);
			setEditingId(null);
			await fetchCourses();
		} catch (err) {
			setError(err.response?.data?.message || "Operation failed. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	// Populate form for editing
	const handleEdit = (course) => {
		setEditingId(course.id);
		setForm({
			title: course.title,
			description: course.description || "",
			duration: course.duration || "",
			price: course.price || "",
		});
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Cancel editing
	const handleCancelEdit = () => {
		setEditingId(null);
		setForm(initialForm);
		setError("");
	};

	// Delete course (DELETE /api/courses/:id)
	const handleDelete = async (id, title) => {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${title}"? This action cannot be undone.`
		);
		if (!confirmed) return;

		setError("");
		setSuccess("");
		try {
			await api.delete(`/courses/${id}`);
			setSuccess(`Course "${title}" was deleted successfully.`);
			await fetchCourses();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to delete course.");
		}
	};

	// Filter courses by search term
	const filteredCourses = courses.filter((c) =>
		c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	return (
		<div className="min-h-[85vh] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto space-y-8">
				{/* Top Header & Stats */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
							<BookOpen className="w-8 h-8 text-blue-600" />
							Admin Course Management
						</h1>
						<p className="text-slate-500 text-sm mt-1">
							Create, update, view, and delete courses across the platform.
						</p>
					</div>

					<div className="flex items-center gap-3">
						<Link
							to="/admin/enrollments"
							className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-lg border border-blue-200 transition-colors shadow-sm"
						>
							<Users className="w-4 h-4" />
							Student Enrollments
						</Link>
						<div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-center">
							<span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
								Total Courses
							</span>
							<span className="text-xl font-bold text-blue-600">
								{courses.length}
							</span>
						</div>
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

				{/* Course Form (Create / Update) */}
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
					<div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
						<h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
							<PlusCircle className="w-5 h-5 text-blue-600" />
							{editingId ? "Update Course Details" : "Add New Course"}
						</h2>
						{editingId && (
							<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
								Editing ID #{editingId}
							</span>
						)}
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Course Title <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="title"
									value={form.title}
									onChange={handleChange}
									placeholder="e.g. Master React & Node.js"
									required
									className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
								/>
							</div>

							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Description
								</label>
								<textarea
									name="description"
									value={form.description}
									onChange={handleChange}
									rows="3"
									placeholder="Provide a comprehensive summary of syllabus, outcomes, and goals..."
									className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Duration
								</label>
								<div className="relative">
									<input
										type="text"
										name="duration"
										value={form.duration}
										onChange={handleChange}
										placeholder="e.g. 6 Weeks / 40 Hours"
										className="w-full px-3.5 py-2.5 pl-9 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
									/>
									<Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Price (₹)
								</label>
								<div className="relative">
									<input
										type="number"
										step="0.01"
										min="0"
										name="price"
										value={form.price}
										onChange={handleChange}
										placeholder="e.g. 4999.00"
										className="w-full px-3.5 py-2.5 pl-9 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
									/>
									<IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
								</div>
							</div>
						</div>

						<div className="flex items-center gap-3 pt-3">
							<button
								type="submit"
								disabled={submitting}
								className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm disabled:opacity-50"
							>
								{submitting
									? "Saving..."
									: editingId
									? "Update Course"
									: "Publish Course"}
							</button>

							{editingId && (
								<button
									type="button"
									onClick={handleCancelEdit}
									className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-lg transition-colors"
								>
									Cancel Edit
								</button>
							)}
						</div>
					</form>
				</div>

				{/* Courses List Table / Cards */}
				<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
						<h2 className="text-lg font-semibold text-slate-800">
							Existing Courses List ({courses.length})
						</h2>

						<div className="relative w-full sm:w-64">
							<input
								type="text"
								placeholder="Search courses..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
						</div>
					</div>

					{loading ? (
						<div className="text-center py-12 text-slate-500 text-sm">
							Loading courses catalog...
						</div>
					) : filteredCourses.length === 0 ? (
						<div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
							<p className="text-slate-500 text-sm">
								{searchTerm
									? "No courses found matching your search term."
									: "No courses published yet. Use the form above to add your first course."}
							</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-left border-collapse">
								<thead>
									<tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
										<th className="py-3 px-4">Title & Description</th>
										<th className="py-3 px-4">Duration</th>
										<th className="py-3 px-4">Price</th>
										<th className="py-3 px-4 text-center">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100 text-sm">
									{filteredCourses.map((course) => (
										<tr
											key={course.id}
											className="hover:bg-slate-50/80 transition-colors"
										>
											<td className="py-4 px-4 max-w-sm">
												<div className="font-semibold text-slate-900">
													{course.title}
												</div>
												{course.description && (
													<p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
														{course.description}
													</p>
												)}
											</td>
											<td className="py-4 px-4 whitespace-nowrap text-slate-600">
												{course.duration ? (
													<span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-slate-100 rounded-md font-medium">
														<Clock className="w-3 h-3 text-slate-500" />
														{course.duration}
													</span>
												) : (
													<span className="text-slate-400 text-xs">N/A</span>
												)}
											</td>
											<td className="py-4 px-4 whitespace-nowrap font-medium text-slate-800">
												₹{Number(course.price || 0).toLocaleString("en-IN")}
											</td>
											<td className="py-4 px-4 whitespace-nowrap text-center">
												<div className="flex items-center justify-center gap-2">
													<button
														onClick={() => handleEdit(course)}
														title="Edit Course"
														className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-md text-xs font-medium transition-colors"
													>
														<Edit className="w-3.5 h-3.5" />
														Edit
													</button>
													<button
														onClick={() => handleDelete(course.id, course.title)}
														title="Delete Course"
														className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md text-xs font-medium transition-colors"
													>
														<Trash2 className="w-3.5 h-3.5" />
														Delete
													</button>
												</div>
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
