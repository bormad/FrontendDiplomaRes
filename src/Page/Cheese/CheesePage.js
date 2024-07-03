import React from 'react';
import styles from './CheesePage.module.scss';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePost, fetchPost } from '../../redux/slices/postsSlice';
import { Form, Input, TrashImg } from '../../components';
import { patchUser } from '../../redux/slices/userSlice';
import trashIcon from '../../assets/img/icons8-полная-корзина-24.png';

const orderFormShema = yup.object().shape({
	order: yup
		.number()
		.typeError('Введите число')
		.positive('Мы не принимаем отрицательные заявки)')
		.required('Заполните поле')
		.min(100, 'Привет! Ваш заказ должен быть больше или равна 100!')
});

export const CheesePage = () => {
	const { id: cheeseId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { title, content, image, price } = useSelector(
		(state) => state.postsSlice.data
	);
	const {
		id: userId,
		order: currentOrder,
		roleId
	} = useSelector((state) => state.userSlice.user);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(orderFormShema)
	});

	const [serverError, setServerError] = React.useState(null);

	React.useEffect(() => {
		dispatch(fetchPost({ id: cheeseId }));
	}, [cheeseId, dispatch]);

	const onSubmit = ({ order }) => {
		dispatch(
			patchUser({
				userId,
				updatedData: {
					order: {
						...currentOrder,
						[cheeseId]: {
							quantity: order,
							title,
							price,
							cheeseId
						}
					}
				}
			})
		);
		navigate('/');
	};

	const onDeletePost = (postId) => {
		const confirmDelete = window.confirm(
			'Вы уверены, что хотите удалить пост?'
		);
		if (confirmDelete) {
			dispatch(deletePost({ postId }));
			navigate('/');
		}
	};

	const formError = errors?.order?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={styles.wrapper}>
			{userId ? (
				<div className={styles.wrapper}>
					<div>
						<img src={image} alt='cheese' className={styles.image} />
					</div>
					<div className={styles.content}>
						<div className={styles.title__block}>
							<h2>{title}</h2>
							{roleId === 2 && (
								<TrashImg
									alt='trash'
									src={trashIcon}
									onClick={() => onDeletePost(cheeseId)}
								/>
							)}
						</div>
						<div>{content} </div>
						<div className={styles.price}>
							<div>
								{price} ₽ <p>Цена за 1 кг</p>
							</div>
							<Form onSubmit={handleSubmit(onSubmit)}>
								{errorMessage && errorMessage}
								<Input
									placeholder='введите кол-во грамм'
									{...register('order', {
										onChange: () => {
											setServerError(null);
										}
									})}
								/>
							</Form>
						</div>
					</div>
				</div>
			) : (
				<Link to='/login'>
					<h1>Ввойдите в аккаунт</h1>
				</Link>
			)}
		</div>
	);
};
