import { useNavigate } from "react-router-dom";
import ButtonC from "./ButtonC.jsx";

function BackButton() {
	const navigate = useNavigate();
	return (
		<ButtonC
			type={"back"}
			handleOnCLick={(e) => {
				e.preventDefault();
				navigate(-1);
			}}
		>
			&larr; Back
		</ButtonC>
	);
}

export default BackButton;
