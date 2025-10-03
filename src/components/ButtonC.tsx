import type { ReactNode, MouseEvent } from "react";
import type { ButtonType } from "../types";
import styles from "./ButtonC.module.css";

interface ButtonCProps {
	children: ReactNode;
	handleOnCLick?: (e: MouseEvent<HTMLButtonElement>) => void;
	type?: ButtonType;
}

function ButtonC({ children, handleOnCLick, type = "primary" }: ButtonCProps) {
	return (
		<button
			type={"submit"}
			onClick={handleOnCLick}
			className={`${styles.btn} ${styles[type]}`}
		>
			{children}
		</button>
	);
}

export default ButtonC;
