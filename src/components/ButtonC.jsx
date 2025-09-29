import styles from "./ButtonC.module.css";

function ButtonC({ children, handleOnCLick, type }) {
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
