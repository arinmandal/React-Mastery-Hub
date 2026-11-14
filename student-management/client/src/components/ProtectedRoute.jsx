import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
	const { user } = useAuth();
	const token = localStorage.getItem("token");

	if (!user || !token) {
		return <Navigate to='/login' replace />;
	}

	if (role && user.role !== role) {
		return <Navigate to='/dashboard' replace />;
	}

	return children;
}
