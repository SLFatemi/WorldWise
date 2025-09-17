import MapC from "../components/MapC.jsx";
import Sidebar from "../components/Sidebar.jsx";
import styles from "./AppLayout.module.css";

function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<MapC />
		</div>
	);
}

export default AppLayout;
