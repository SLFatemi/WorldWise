import { useEffect, useState, type FormEvent } from "react";
import DatePicker from "react-datepicker";
import useUrlPosition from "../hooks/useUrlPosition";
import BackButton from "./BackButton";
import ButtonC from "./ButtonC";
import styles from "./FormC.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useCities } from "../context/CitiesProvider";
import type { GeocodingResponse } from "../types";

export function convertToEmoji(countryCode: string): string {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}

const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function FormC() {
	const { addCity, isLoading } = useCities();
	const navigate = useNavigate();

	const [date, setDate] = useState<Date | null>(new Date());
	const [notes, setNotes] = useState("");

	const { mapLat, mapLng } = useUrlPosition();

	const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState<GeocodingResponse>({});
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
				const data: GeocodingResponse = await res.json();
				if (!data.countryCode) throw new Error(`That's not a city`);
				setCityName(data.city || data.locality || "");
				setCountry(data);
			} catch (err) {
				setErrorGeoCoding((err as Error).message);
			} finally {
				setIsLoadingGeoCoding(false);
			}
			return null;
		}

		fetchCity();
	}, [mapLat, mapLng]);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country: country.countryName || country.locality || "",
			emoji: countryEmoji,
			date: date.toISOString(),
			notes,
			position: { lat: Number(mapLat), lng: Number(mapLng) },
		};
		await addCity(newCity);
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
