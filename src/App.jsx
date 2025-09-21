import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import City from "./components/City.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Pricing from "./pages/Pricing.jsx";
import Product from "./pages/Product.jsx";

const URL = "http://localhost:9000";

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
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

	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Homepage />} />
				<Route path={"product"} element={<Product />} />
				<Route path={"pricing"} element={<Pricing />} />
				<Route path={"login"} element={<Login />} />
				<Route path={"app"} element={<AppLayout />}>
					<Route
						index
						element={<CityList cities={cities} isLoading={isLoading} />}
					></Route>
					<Route
						path={"cities"}
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>

					<Route path={"cities/:id"} element={<City />} />

					<Route
						path={"countries"}
						element={<CountryList cities={cities} isLoading={isLoading} />}
					></Route>
					<Route path={"form"} element={<p>Form</p>}></Route>
				</Route>
				<Route path={"*"} element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
