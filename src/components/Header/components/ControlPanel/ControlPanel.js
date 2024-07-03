import { Link } from 'react-router-dom';
import loginIcon from '../../../../assets/img/login.svg';
import trashIcon from '../../../../assets/img/trash.svg';
import styles from './ControlPanel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export const ControlPanel = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user.login);

	React.useEffect(() => {
		dispatch({ type: 'updateUserFromSessionStorage' });
	}, [dispatch, user]);

	return (
		<div className={styles.controlPanel}>
			<div>
				<Link to={'/trash'} className={styles.controlPanel_item}>
					<img src={trashIcon} className={styles.img_icon} alt='trash' />
					Корзина
				</Link>
			</div>
			<div>
				{user ? (
					<Link to={'/profile'} className={styles.controlPanel_item}>
						<img src={loginIcon} className={styles.img_icon} alt='login' />
						{user}
					</Link>
				) : (
					<Link to={'/login'} className={styles.controlPanel_item}>
						<img src={loginIcon} className={styles.img_icon} alt='login' />
						Войти
					</Link>
				)}
			</div>
		</div>
	);
};
