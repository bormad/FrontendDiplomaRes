import styles from './TrashCheeseBlock.module.scss';
import trashIcon from '../../assets/img/icons8-полная-корзина-24.png';
import { TrashImg } from '../TrashImg/TrashImg';

export const TrashCheeseBlock = ({
	cheeseId,
	quantity,
	title,
	price,
	onClick
}) => {
	let totalPrice = (price / 1000) * quantity;
	totalPrice = totalPrice.toFixed(1);

	return (
		<div className={styles.cheese__block}>
			<div>{title}</div>
			<div>
				{totalPrice}₽
				<TrashImg
					alt='trash'
					src={trashIcon}
					onClick={() => onClick(cheeseId)}
				/>
			</div>
		</div>
	);
};
