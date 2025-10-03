import { useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../context/CitiesProvider";
import { useGeolocation } from "../hooks/useGeoLocation";
import useUrlPosition from "../hooks/useUrlPosition";
import ButtonC from "./ButtonC";
import styles from "./MapC.module.css";

function MapC() {
	const { cities } = useCities();
	const navigate = useNavigate();
	const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
	const { mapLat, mapLng } = useUrlPosition();

	const {
		isLoading: isLoadingPosition,
		position: geoPosition,
		getPosition,
	} = useGeolocation();

	useEffect(() => {
		if (!mapLng || !mapLat) return;
		setMapPosition([Number(mapLat), Number(mapLng)]);
	}, [mapLat, mapLng]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Not needed>
	useEffect(() => {
		if (!geoPosition) return;
		setMapPosition([geoPosition.lat, geoPosition.lng]);
		navigate(`form?lat=${geoPosition.lat}&lng=${geoPosition.lng}`);
	}, [geoPosition]);

	return (
		<div className={styles.mapContainer}>
			<ButtonC type={"position"} handleOnCLick={getPosition}>
				{isLoadingPosition ? "loading..." : "use your position"}
			</ButtonC>
			<MapContainer className={styles.map} center={mapPosition} zoom={13}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						key={city.id}
						position={[city.position.lat, city.position.lng]}
					>
						<Popup autoPan={false}>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter pos={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

interface ChangeCenterProps {
	pos: [number, number];
}

function ChangeCenter({ pos }: ChangeCenterProps) {
	const map = useMap();
	map.setView(pos);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
	return null;
}

export default MapC;
