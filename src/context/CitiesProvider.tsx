import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	type ReactNode,
} from "react";
import type { City, CitiesContextType } from "../types";

const URL = "http://localhost:9000";
const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

interface CitiesState {
	cities: City[];
	isLoading: boolean;
	currentCity: City | Record<string, never>;
	error: string;
}

type CitiesAction =
	| { type: "loading" }
	| { type: "cities/loaded"; payload: City[] }
	| { type: "city/loaded"; payload: City }
	| { type: "city/added"; payload: City }
	| { type: "city/removed"; payload: City }
	| { type: "rejected"; payload: string };

const initialState: CitiesState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state: CitiesState, action: CitiesAction): CitiesState {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };
		case "city/added":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "city/removed":
			return {
				...state,
				isLoading: false,
				cities: [
					...state.cities.filter((city) => city.id !== action.payload.id),
				],
				currentCity: {},
			};
		case "rejected":
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error("Not Supported");
	}
}

interface CitiesProviderProps {
	children: ReactNode;
}

function CitiesProvider({ children }: CitiesProviderProps) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${URL}/cities`);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch (e) {
				dispatch({
					type: "rejected",
					payload: `There was an error loading cities`,
				});
			}
		}
		fetchCities();
	}, []);

	const getCity = useCallback(
		async (id: string | number) => {
			if (+id === (currentCity as City).id) return;
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${URL}/cities/${id}`);
				const data = await res.json();
				dispatch({ type: "city/loaded", payload: data });
			} catch (e) {
				dispatch({
					type: "rejected",
					payload: `There was an error loading the city`,
				});
			}
		},
		[(currentCity as City).id],
	);

	async function addCity(city: Omit<City, "id">) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${URL}/cities`, {
				method: "POST",
				body: JSON.stringify(city),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			dispatch({ type: "city/added", payload: data });
		} catch (e) {
			dispatch({
				type: "rejected",
				payload: `There was an error adding the city`,
			});
		}
	}

	async function removeCity(cityToRemove: City) {
		dispatch({ type: "loading" });
		try {
			await fetch(`${URL}/cities/${cityToRemove.id}`, {
				method: "DELETE",
			});
			dispatch({ type: "city/removed", payload: cityToRemove });
		} catch (e) {
			dispatch({
				type: "rejected",
				payload: `There was an error deleting the city`,
			});
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				addCity,
				removeCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities(): CitiesContextType {
	const context = useContext(CitiesContext);
	if (!context) throw new Error("useCities must be used within the provider");
	return context;
}

export { CitiesProvider, useCities };
