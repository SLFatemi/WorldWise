import { createContext, useContext, useEffect, useState } from "react";

const URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch (e) {
				alert(`There was an error loading data (${e.status})`);
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);
	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch (e) {
			alert(`There was an error loading data (${e.status})`);
		} finally {
			setIsLoading(false);
		}
	}
	async function addCity(city) {
		try {
			setIsLoading(true);
			const res = await fetch(`${URL}/cities`, {
				method: "POST",
				body: JSON.stringify(city),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			setCurrentCity(data);
			setCities((cities) => [...cities, data]);
		} catch (e) {
			alert(`There was an error adding city (${e.status})`);
		} finally {
			setIsLoading(false);
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
