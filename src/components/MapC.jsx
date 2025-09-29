import { useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../context/CitiesProvider.jsx";
import { useGeolocation } from "../hooks/useGeoLocation.jsx";
import ButtonC from "./ButtonC.jsx";
import styles from "./MapC.module.css";

function MapC() {
	const { cities, currentCity } = useCities();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const [searchParams, setSearchParams] = useSearchParams();
	const mapLat = searchParams.get("lat");
	const mapLng = searchParams.get("lng");
	const {
		isLoading: isLoadingPosition,
		position: geoPosition,
		getPosition,
	} = useGeolocation();

	useEffect(() => {
		if (!mapLng || !mapLat) return;
		setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (!geoPosition) return;
		setMapPosition([geoPosition.lat, geoPosition.lng]);
	}, [geoPosition]);

	return (
		<div className={styles.mapContainer}>
			{!geoPosition && (
				<ButtonC type={"position"} handleOnCLick={getPosition}>
					{isLoadingPosition ? "loading..." : "use your position"}
				</ButtonC>
			)}{" "}
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

function ChangeCenter({ pos }) {
	const map = useMap();
	map.setView(pos);
	return null;
}
function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}
export default MapC;
