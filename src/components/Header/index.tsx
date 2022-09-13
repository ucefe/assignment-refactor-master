import * as React from 'react';
import { logo } from '../../assets/images';
import styles from './styles.module.css';

const Header: React.FC = () => (
	<div className={styles.header}>
		<div className={['container', styles.headerImageWrapper].join(' ')}>
			<img src={logo} className={styles.headerImage} alt='...' />
		</div>
	</div>
);

export default Header;
