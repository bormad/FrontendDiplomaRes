import React from 'react';
import styles from './AuthPage.module.scss';
import * as yup from 'yup';
import { Input, Form } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { fetchUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const authFormShema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Минимум 3 символа для логина')
		.max(15, 'Недопускается больше 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Некорректный пароль')
		.min(6, 'Минимум 6 символа для пароля')
		.max(20, 'Недопускается больше 20 символов')
});

export const AuthPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			login: 'testAdmin',
			password: '123456'
		},
		resolver: yupResolver(authFormShema)
	});

	const [serverError, setServerError] = React.useState(null);

	const onSubmit = ({ login, password }) => {
		try {
			dispatch(fetchUser({ login, password }));
			navigate('/');
		} catch (error) {
			console.log('error');
		}
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	return (
		<div>
			<h1 className={styles.h1}>Войти в аккаунт</h1>
			<div>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Input
						placeholder='Логин...'
						{...register('login', {
							onChange: () => {
								setServerError(null);
							}
						})}
						type='text'
					/>
					<Input
						placeholder='Пароль...'
						{...register('password', {
							onChange: () => {
								setServerError(null);
							}
						})}
					/>
					<Link to={'/register'}>Зарегистрироваться</Link>
					{errorMessage && errorMessage}
				</Form>
			</div>
		</div>
	);
};
