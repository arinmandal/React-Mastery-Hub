import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Navbar />

				<Routes>
					<Route path='/' element={<Navigate to='/login' />} />

					<Route path='/login' element={<Login />} />

					<Route path='/register' element={<Register />} />

					<Route
						path='/dashboard'
						element={
							<ProtectedRoute role='student'>
								<Dashboard />
							</ProtectedRoute>
						}
					/>

					<Route
						path='/admin'
						element={
							<ProtectedRoute role='admin'>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>

					<Route path='*' element={<Navigate to='/login' />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
