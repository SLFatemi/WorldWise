import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import styles from "./User.module.css";

function User() {
	const { user, isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();
	if (!isAuthenticated) return null;

	function handleClick() {
		logout();
		navigate("/");
	}

	return (
		<div className={styles.user}>
			<img src={user?.avatar} alt={user?.name} />
			<span>Welcome, {user?.name}</span>
			<button type={"button"} onClick={handleClick}>
				Logout
			</button>
		</div>
	);
}

export default User;
