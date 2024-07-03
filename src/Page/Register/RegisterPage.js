import React from 'react';
import styles from './RegisteraPage.module.scss';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from '../../components';

const registerFormShema = yup.object().shape({
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
		.max(20, 'Недопускается больше 20 символов'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Повторите пароль')
});

export const RegisterPage = () => {
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
		resolver: yupResolver(registerFormShema)
	});

	const [serverError, setServerError] = React.useState(null);

	const onSubmit = ({ login, password }) => {
		try {
			dispatch(registerUser({ login, password }));
			navigate('/');
		} catch (error) {
			console.log('error');
		}
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.confirmPassword?.message;
	const errorMessage = formError || serverError;
	return (
		<div>
			<h1 className={styles.h1}>Зарегистрировать аккаунт</h1>
			<div>
				<Form
					className={styles.form__wrapper}
					onSubmit={handleSubmit(onSubmit)}
				>
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
						type='password'
					/>

					<Input
						placeholder='Повторите пароль...'
						{...register('confirmPassword', {
							onChange: () => {
								setServerError(null);
							}
						})}
						type='password'
					/>

					{errorMessage && errorMessage}
				</Form>
			</div>
		</div>
	);
};
