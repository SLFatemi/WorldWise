export interface Position {
	lat: number;
	lng: number;
}

export interface City {
	id: number;
	cityName: string;
	country: string;
	emoji: string;
	date: string;
	notes?: string;
	position: Position;
}

export interface Country {
	country: string;
	emoji: string;
	id: number;
}

export interface User {
	name: string;
	email: string;
	password: string;
	avatar: string;
}

export interface CitiesContextType {
	cities: City[];
	isLoading: boolean;
	currentCity: City | Record<string, never>;
	getCity: (id: string | number) => Promise<void>;
	addCity: (city: Omit<City, "id">) => Promise<void>;
	removeCity: (city: City) => Promise<void>;
}

export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => void;
	logout: () => void;
}

export type ButtonType = "primary" | "back" | "position";

export interface GeocodingResponse {
	city?: string;
	locality?: string;
	countryName?: string;
	countryCode?: string;
}
