import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesProvider.jsx";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

function CityItem({ city }) {
	const { cityName, emoji, date, id, position } = city;
	const { lat, lng } = position;
	const { currentCity } = useCities();
	const isCurrent = id === currentCity.id;
	return (
		<li>
			<Link
				className={`${styles.cityItem} ${isCurrent ? styles["cityItem--active"] : ""}`}
				to={`${id}?lat=${lat}&lng=${lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button type={"button"} className={styles.deleteBtn}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
