import { useEffect, useState } from "react";
import useUrlPosition from "../hooks/useUrlPosition.jsx";
import BackButton from "./BackButton.jsx";
import ButtonC from "./ButtonC.jsx";
import styles from "./FormC.module.css";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}
const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function FormC() {
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");

	const { mapLat, mapLng } = useUrlPosition();
	const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [errorGeoCoding, setErrorGeoCoding] = useState("");
	const countryEmoji = convertToEmoji(country.countryCode ?? "");

	useEffect(() => {
		async function fetchCity() {
			try {
				setIsLoadingGeoCoding(true);
				setErrorGeoCoding("");
				const res = await fetch(
					`${URL}?latitude=${mapLat}&longitude=${mapLng}`,
				);
				if (!res.ok) throw new Error(`an Error occurred${res.status}`);
				const data = await res.json();
				if (!data.countryCode) throw new Error(`That's not a city`);
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName || data.locality || "");
			} catch (err) {
				setErrorGeoCoding(err.message);
			} finally {
				setIsLoadingGeoCoding(false);
			}
			return null;
		}

		fetchCity();
	}, [mapLat, mapLng]);

	if (isLoadingGeoCoding) return <Spinner />;
	if (errorGeoCoding) return <Message message={errorGeoCoding} />;
	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				{/** biome-ignore lint/correctness/useUniqueElementIds: <Not needed> */}
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{countryEmoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				{/** biome-ignore lint/correctness/useUniqueElementIds: <Not needed> */}
				<input
					id="date"
					onChange={(e) => setDate(e.target.value)}
					value={date}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				{/** biome-ignore lint/correctness/useUniqueElementIds: <Not needed> */}
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<ButtonC type={"primary"}>Add</ButtonC>
				<BackButton />
			</div>
		</form>
	);
}

export default FormC;
