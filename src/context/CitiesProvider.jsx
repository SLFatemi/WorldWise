import { createContext, useContext, useEffect, useReducer } from "react";

const URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};
function reducer(state, action) {
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
function CitiesProvider({ children }) {
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
					payload: `There was an error loading cities (${e.status})`,
				});
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		if (+id === currentCity.id) return;
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch (e) {
			dispatch({
				type: "rejected",
				payload: `There was an error loading the city (${e.status})`,
			});
		}
	}
	async function addCity(city) {
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
				payload: `There was an error adding the city (${e.status})`,
			});
		}
	}
	async function removeCity(cityToRemove) {
		dispatch({ type: "loading" });
		try {
			await fetch(`${URL}/cities/${cityToRemove.id}`, {
				method: "DELETE",
			});
			dispatch({ type: "city/removed", payload: cityToRemove });
		} catch (e) {
			dispatch({
				type: "rejected",
				payload: `There was an error deleting the city (${e.status})`,
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

function useCities() {
	const context = useContext(CitiesContext);
	if (!context) throw new Error("useCities must be used within the provider");
	return context;
}
export { CitiesProvider, useCities };
