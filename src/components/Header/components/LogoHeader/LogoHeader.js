import { Link } from 'react-router-dom';
import cheeseIcon from '../../../../assets/img/cheese-icon.svg';
import styles from './LogoHeader.module.scss';

export const LogoHeader = () => {
	return (
		<Link to={'/'} className={styles.logo}>
			<img className={styles.img} src={cheeseIcon} alt='cheese icon' />
			<div>
				<h1>Cheese Market</h1>
				<p>самый вкусный сыр во вселенной</p>
			</div>
		</Link>
	);
};
