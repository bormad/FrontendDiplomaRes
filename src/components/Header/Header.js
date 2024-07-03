import React from 'react';
import styles from './Header.module.scss';
import { LogoHeader } from './components/LogoHeader/LogoHeader';
import { ControlPanel } from './components/ControlPanel/ControlPanel';

export const Header = () => {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<LogoHeader />
				<ControlPanel />
			</header>
		</div>
	);
};
