import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
	const { user, logoutUser } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutUser();
		navigate("/login");
	};

	return (
		<nav className='navbar'>
			<Link className='brand' to='/'>
				Student Portal
			</Link>

			<div className='nav-links'>
				{user && (
					<>
						<span>{user.name}</span>
						<button onClick={handleLogout}>Logout</button>
					</>
				)}

				{!user && (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/register'>Register</Link>
					</>
				)}
			</div>
		</nav>
	);
}
