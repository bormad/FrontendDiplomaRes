import styles from './Counter.module.scss';

export const Counter = ({ count = 0 }) => {
	return <div className={styles.counter}>{count}</div>;
};
