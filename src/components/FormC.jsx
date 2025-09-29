// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "./BackButton.jsx";
import ButtonC from "./ButtonC.jsx";
import styles from "./FormC.module.css";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function FormC() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
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
				{/* <span className={styles.flag}>{emoji}</span> */}
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
