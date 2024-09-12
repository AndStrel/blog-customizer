import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { TOpenMenu } from '../article-params-form/ArticleParamsForm';

export type TbuttonProps = {
	isOpen: boolean;
	onClick: TOpenMenu;
};

export const ArrowButton = ({ isOpen, onClick }: TbuttonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label={
				isOpen
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму параметров статьи'
			}
			onClick={onClick}
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
