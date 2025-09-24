import { useCities } from "../context/CitiesProvider.jsx";
import CityItem from "./CityItem.jsx";
import styles from "./CityList.module.css";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

function CityList() {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return (
			<Message
				message={"Add your first city by clicking on a city on the map"}
			/>
		);
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem key={city.id} city={city} />
			))}
		</ul>
	);
}

export default CityList;
