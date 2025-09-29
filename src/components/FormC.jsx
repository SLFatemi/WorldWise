import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import useUrlPosition from "../hooks/useUrlPosition.jsx";
import BackButton from "./BackButton.jsx";
import ButtonC from "./ButtonC.jsx";
import styles from "./FormC.module.css";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useCities } from "../context/CitiesProvider.jsx";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}
const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function FormC() {
	const { addCity, isLoading } = useCities();
	const navigate = useNavigate();

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
			if (!mapLat && !mapLng) return;
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

	async function handleSubmit(e) {
		e.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country,
			countryEmoji,
			date,
			notes,
			position: { lat: mapLat, lng: mapLng },
		};
		addCity(newCity);
		navigate(`/app`);
	}

	if (!mapLng && !mapLat)
		return <Message message={"Start by clicking on the map"} />;
	if (isLoadingGeoCoding) return <Spinner />;
	if (errorGeoCoding) return <Message message={errorGeoCoding} />;
	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}
		>
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
				<DatePicker
					onChange={(date) => setDate(date)}
					selected={date}
					dateFormat={"dd/MM/yyyy"}
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
