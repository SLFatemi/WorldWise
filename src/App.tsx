import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import FormC from "./components/FormC";
import { AuthProvider } from "./context/AuthProvider";
import { CitiesProvider } from "./context/CitiesProvider";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route path={"/"} element={<Homepage />} />
						<Route path={"product"} element={<Product />} />
						<Route path={"pricing"} element={<Pricing />} />
						<Route path={"login"} element={<Login />} />
						<Route
							path={"app"}
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
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
		</AuthProvider>
	);
}

export default App;
