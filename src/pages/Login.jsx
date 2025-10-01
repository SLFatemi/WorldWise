/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonC from "../components/ButtonC.jsx";
import PageNav from "../components/PageNav.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import styles from "./Login.module.css";

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState("jack@example.com");
	const [password, setPassword] = useState("qwerty");
	const navigate = useNavigate();
	const { login, isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) navigate("/app", { replace: true });
	}, [isAuthenticated]);

	function handleLogin(e) {
		e.preventDefault();
		if (!email || !password) return;
		login(email, password);
	}

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handleLogin}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<ButtonC type={"primary"}>Login</ButtonC>
				</div>
			</form>
		</main>
	);
}
