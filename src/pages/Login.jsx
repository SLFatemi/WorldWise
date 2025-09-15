import { useState } from "react";
import PageNav from "../components/PageNav.jsx";
import styles from "./Login.module.css";

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState("jack@example.com");
	const [password, setPassword] = useState("qwerty");

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form}>
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
					<button type={"button"}>Login</button>
				</div>
			</form>
		</main>
	);
}
