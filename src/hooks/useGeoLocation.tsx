import { useState } from "react";
import type { Position } from "../types";

interface UseGeolocationReturn {
	isLoading: boolean;
	position: Position | null;
	error: string | null;
	getPosition: () => void;
}

export function useGeolocation(
	defaultPosition: Position | null = null,
): UseGeolocationReturn {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState<Position | null>(defaultPosition);
	const [error, setError] = useState<string | null>(null);

	function getPosition() {
		if (!navigator.geolocation)
			return setError("Your browser does not support geolocation");

		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				setIsLoading(false);
			},
			(error) => {
				setError(error.message);
				setIsLoading(false);
			},
		);
	}

	return { isLoading, position, error, getPosition };
}
