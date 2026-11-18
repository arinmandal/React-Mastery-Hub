import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role, allowedRoles }) {
	const { user } = useAuth();
	const token = localStorage.getItem("token");

	// If no token or user in state, redirect to login
	if (!user || !token) {
		return <Navigate to="/login" replace />;
	}

	// Normalize allowed roles
	const roles = allowedRoles || (role ? [role] : null);

	// If role restriction exists and user's role is not authorized
	if (roles && !roles.includes(user.role)) {
		// Redirect student away from admin routes
		if (user.role === "student") {
			return <Navigate to="/student/dashboard" replace />;
		}
		// Redirect admin away from student-only routes
		if (user.role === "admin") {
			return <Navigate to="/admin/dashboard" replace />;
		}
		return <Navigate to="/login" replace />;
	}

	return children;
}
