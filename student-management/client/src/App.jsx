import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminCourses from "./pages/AdminCourses";
import AdminProfile from "./pages/AdminProfile";
import AdminEnrollments from "./pages/AdminEnrollments";

// Smart redirect helper for root '/'
function RootRedirect() {
	const { user } = useAuth();
	const token = localStorage.getItem("token");

	if (!user || !token) {
		return <Navigate to="/login" replace />;
	}

	return user.role === "admin" ? (
		<Navigate to="/admin/dashboard" replace />
	) : (
		<Navigate to="/student/dashboard" replace />
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Navbar />

				<Routes>
					{/* Root Redirect */}
					<Route path="/" element={<RootRedirect />} />

					{/* Public Authentication Routes */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Student Protected Routes */}
					<Route
						path="/student/dashboard"
						element={
							<ProtectedRoute role="student">
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					{/* Backward compatibility for /dashboard */}
					<Route
						path="/dashboard"
						element={<Navigate to="/student/dashboard" replace />}
					/>

					{/* Admin Protected Routes */}
					<Route
						path="/admin/dashboard"
						element={
							<ProtectedRoute role="admin">
								<AdminCourses />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/courses"
						element={
							<ProtectedRoute role="admin">
								<AdminCourses />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/enrollments"
						element={
							<ProtectedRoute role="admin">
								<AdminEnrollments />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/profile"
						element={
							<ProtectedRoute role="admin">
								<AdminProfile />
							</ProtectedRoute>
						}
					/>
					{/* Backward compatibility for /admin */}
					<Route
						path="/admin"
						element={<Navigate to="/admin/dashboard" replace />}
					/>

					{/* Catch-all Fallback */}
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
