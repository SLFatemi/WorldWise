import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
}

type AuthAction = { type: "login"; payload: User } | { type: "logout" };

function reducer(state: AuthState, action: AuthAction): AuthState {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "logout":
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error("Rejected");
	}
}

const initialState: AuthState = { user: null, isAuthenticated: false };

const FAKE_USER: User = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

interface AuthProviderProps {
	children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	function login(email: string, password: string) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: "login", payload: FAKE_USER });
		}
	}

	function logout() {
		dispatch({ type: "logout" });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) throw new Error("Not in the provider");
	return context;
}

export { AuthProvider, useAuth };
