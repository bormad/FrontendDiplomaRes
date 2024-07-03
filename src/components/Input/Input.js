import React from 'react';
import styles from './Input.module.scss';

export const Input = React.forwardRef((props, ref) => {
	return <input className={styles.input} {...props} ref={ref} />;
});
