import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/City.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import FormC from "./components/FormC.jsx";
import { CitiesProvider } from "./context/CitiesProvider.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Pricing from "./pages/Pricing.jsx";
import Product from "./pages/Product.jsx";

function App() {
	return (
		<CitiesProvider>
			<BrowserRouter>
				<Routes>
					<Route path={"/"} element={<Homepage />} />
					<Route path={"product"} element={<Product />} />
					<Route path={"pricing"} element={<Pricing />} />
					<Route path={"login"} element={<Login />} />
					<Route path={"app"} element={<AppLayout />}>
						<Route index element={<Navigate replace to={"cities"} />}></Route>
						<Route path={"cities"} element={<CityList />} />
						<Route path={"cities/:id"} element={<City />} />
						<Route path={"countries"} element={<CountryList />}></Route>
						<Route path={"form"} element={<FormC />}></Route>
					</Route>
					<Route path={"*"} element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</CitiesProvider>
	);
}

export default App;
