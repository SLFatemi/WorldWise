import MapC from "../components/MapC.jsx";
import Sidebar from "../components/Sidebar.jsx";
import User from "../components/User.jsx";
import styles from "./AppLayout.module.css";

function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<MapC />
			<User />
		</div>
	);
}

export default AppLayout;
