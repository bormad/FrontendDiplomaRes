import styles from './Button.module.scss';

export const Button = ({ text, clazz, type = 'button', onClick }) => {
	return (
		<button
			onClick={onClick}
			className={styles.button + ' ' + styles[clazz]}
			type={type}
		>
			{text}
		</button>
	);
};
