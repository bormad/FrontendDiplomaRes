/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styles from './ProfilePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE_ID } from '../../constants/role';
import { Button } from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/slices/userSlice';
import logoutIcon from '../../assets/img/logout-svgrepo-com.svg';

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectedUser = useSelector((state) => state.userSlice.user);
	const userRole = selectedUser.roleId;

	const logout = () => {
		dispatch(logoutUser());
		navigate('/');
	};

	return (
		<div className={styles.wrapper}>
			<div>
				Логин: {selectedUser.login}{' '}
				<img className={styles.logout} src={logoutIcon} onClick={logout} />
			</div>
			<div>Роль: {ROLE_ID[userRole]}</div>
			{[1, 2].includes(userRole) ? (
				<Link to={'/add-cheese'}>
					<Button text='добавить сыр' />
				</Link>
			) : null}
		</div>
	);
};
