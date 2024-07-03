import { Link } from 'react-router-dom';
import styles from './Post.module.scss';
import { Button } from '../Button/Button';

export const Post = ({ title, image, price, id }) => {
	return (
		<div className={styles.post} key={id}>
			<img src={image} alt='cheese' />
			<div className={styles.title}>{title}</div>
			<div className={styles.bottom}>
				<div className={styles.price}>
					{price}₽ <p>Цена за 1 кг</p>
				</div>
				<Link to={`/cheese/${id}`}>
					<Button text='добавить' clazz='button__mini' />
				</Link>
			</div>
		</div>
	);
};
