import * as React from 'react';

import styles from './styles.module.css';
import { img1, img2 } from '../../assets/images';

const Hero: React.FC = () => (
	<div className={['container', styles.main].join(' ')}>
		<img className={styles.image} src={img1} alt='...' />
		<img className={styles.image} src={img2} alt='...' />
	</div>
);

export default Hero;
