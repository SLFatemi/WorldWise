import CountryItem from "./CountryItem.jsx";
import styles from "./CountryList.module.css";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

function CountryList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return (
			<Message
				message={"Add your first city by clicking on a city on the map"}
			/>
		);
	const contries = [
		...new Set(
			cities.map((city) => {
				return { country: city.country, emoji: city.emoji };
			}),
		),
	];
	return (
		<ul className={styles.countryList}>
			{contries.map((country) => (
				<CountryItem key={country.id} country={country} />
			))}
		</ul>
	);
}

export default CountryList;
