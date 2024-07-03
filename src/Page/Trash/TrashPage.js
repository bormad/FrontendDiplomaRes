import React, { useEffect, useState } from 'react';
import styles from './TrashPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TrashCheeseBlock } from '../../components';
import { patchUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const TrashPage = () => {
	const navigate = useNavigate();
	const { order } = useSelector((state) => state.userSlice.user);
	const [cheeseArr, setCheeseArr] = useState([]);
	const dispatch = useDispatch();
	const { id: userId } = useSelector((state) => state.userSlice.user);

	useEffect(() => {
		if (order) {
			setCheeseArr(Object.values(order));
		}
	}, [order]);

	const onPay = () => {
		dispatch(
			patchUser({
				userId,
				updatedData: {
					order: {}
				}
			})
		);
		navigate('/');
	};

	const onDeleteOrderCheese = (cheeseId) => {
		const updatedOrder = { ...order };
		delete updatedOrder[cheeseId];
		dispatch(
			patchUser({
				userId,
				updatedData: {
					order: updatedOrder
				}
			})
		);

		console.log(cheeseId);
	};
	//TODO
	return (
		<div className={styles.wrapper}>
			{cheeseArr.length !== 0 ? (
				<div>
					{cheeseArr?.map(({ cheeseId, quantity, title, price }) => {
						return (
							<TrashCheeseBlock
								quantity={quantity}
								title={title}
								price={price}
								cheeseId={cheeseId}
								key={cheeseId}
								onClick={onDeleteOrderCheese}
							/>
						);
					})}
					<Button text='Оплатить' onClick={onPay} />
				</div>
			) : (
				'Корзина пуста'
			)}
		</div>
	);
};
