import React from 'react';
import styles from './AddCheesePage.module.scss';
import { Input, Form } from '../../components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/slices/postsSlice';

const cheeseFormShema = yup.object().shape({
	title: yup
		.string()
		.required('Заполните название')
		.min(3, 'Минимум 3 символа'),
	content: yup.string(),
	image: yup.string().required('Заполните поле с картинкой'),
	price: yup.number().typeError('Введите число').required('Заполните цену')
});

export const AddCheesePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			title: 'Тестовый',
			content: 'Тест',
			image:
				'https://i.fbcd.co/products/resized/resized-750-500/cheese-08-3c0917804a64b9a89c9d565a877633684b2b256da5fdc442d6ca0d6167f8e738.jpg',
			price: '874'
		},
		resolver: yupResolver(cheeseFormShema)
	});

	const [serverError, setServerError] = React.useState(null);

	const onSubmit = ({ title, content, image, price }) => {
		try {
			dispatch(addPost({ title, content, image, price }));
			navigate('/');
		} catch (error) {
			console.log('error');
		}
	};

	const formError =
		errors?.title?.message ||
		errors?.content?.message ||
		errors?.image?.message ||
		errors?.price?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={styles.wrapper}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				Добавьте название:
				<Input
					{...register('title', {
						onChange: () => {
							setServerError(null);
						}
					})}
					type='text'
				/>
				Добавьте описание:
				<Input
					{...register('content', {
						onChange: () => {
							setServerError(null);
						}
					})}
					type='text'
				/>
				Добавьте картику:
				<Input
					{...register('image', {
						onChange: () => {
							setServerError(null);
						}
					})}
					type='text'
				/>
				Добавьте цену:
				<Input
					{...register('price', {
						onChange: () => {
							setServerError(null);
						}
					})}
					type='text'
				/>
				{errorMessage && errorMessage}
			</Form>
		</div>
	);
};
