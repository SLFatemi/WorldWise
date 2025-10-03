import MapC from "../components/MapC";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
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
