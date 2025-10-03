import { useCities } from "../context/CitiesProvider";
import type { Country } from "../types";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return (
			<Message
				message={"Add your first city by clicking on a city on the map"}
			/>
		);
	const countries: Country[] = [
		...new Map(
			cities.map((city) => [
				city.id,
				{ country: city.country, emoji: city.emoji, id: city.id },
			]),
		).values(),
	];
	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem key={country.id} country={country} />
			))}
		</ul>
	);
}

export default CountryList;
