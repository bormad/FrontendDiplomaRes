import React from 'react';
import styles from './Form.module.scss';
import { Button } from '../Button/Button';

export const Form = ({ children, onSubmit }) => {
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			{children} <Button type='submit' text='Отправить' />
		</form>
	);
};
