import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ProtectedRouteProps {
	children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		if (!isAuthenticated) navigate("/login");
	}, [isAuthenticated]);
	return children;
}

export default ProtectedRoute;
