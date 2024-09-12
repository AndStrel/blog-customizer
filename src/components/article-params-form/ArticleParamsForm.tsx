import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useClose } from './hooks/useClose';
import clsx from 'clsx';
export type TOpenMenu = () => void;
export type TArticleParamsFormProps = {
	handleSetArticleState: (newArticleState: ArticleStateType) => void;
	handleResetArticleState: () => void;
};

export const ArticleParamsForm = ({
	handleSetArticleState,
	handleResetArticleState,
}: TArticleParamsFormProps) => {
	const menuRef = useRef<HTMLHeadingElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false); // состояние меню
	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]); // состояние выбора шрифта
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]); // состояние выбора размера шрифта
	const [fontColor, setFontColor] = useState(fontColors[0]); // состояние выбора цвета шрифта
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]); // состояние выбора цвета фона
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]); // состояние выбора ширины контента
	const [isChange, setIsChange] = useState(false); // состояние изменения параметров

	useClose({
		isOpen: isMenuOpen,
		onClose: () => toggleMenu(),
		rootRef: menuRef,
	});

	useEffect(() => {
		// функция проверки изменения параметров
		const checkChangeState = () => {
			if (
				fontFamily === fontFamilyOptions[0] &&
				fontSize === fontSizeOptions[0] &&
				fontColor === fontColors[0] &&
				backgroundColor === backgroundColors[0] &&
				contentWidth === contentWidthArr[0]
			) {
				setIsChange(false);
			} else {
				setIsChange(true);
			}
		};
		checkChangeState(); // проверяем состояние при изменении любого из параметров
	}, [fontFamily, fontSize, fontColor, backgroundColor, contentWidth]);

	// функция смены состояния меню
	const toggleMenu = () => {
		if (isMenuOpen) {
			closeMenu();
		} else {
			openMenu();
		}
		setIsMenuOpen(!isMenuOpen);
	};

	// функция открытия меню
	const openMenu = () => {
		if (menuRef.current) {
			menuRef.current.className = clsx(styles.container, styles.container_open);
		}
	};

	// функция закрытия меню
	const closeMenu = () => {
		if (menuRef.current) {
			menuRef.current.className = styles.container;
		}
	};

	// функция записи состояний параметров выбранных пользователем
	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		handleSetArticleState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};

	// функция сброса параметров в форме
	const handleReset = () => {
		if (isChange === true) {
			setFontFamily(defaultArticleState.fontFamilyOption);
			setFontSize(defaultArticleState.fontSizeOption);
			setFontColor(defaultArticleState.fontColor);
			setBackgroundColor(defaultArticleState.backgroundColor);
			setContentWidth(defaultArticleState.contentWidth);
			handleResetArticleState();
		}
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside className={styles.container} ref={menuRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h1>
						<Text weight={800} size={31} uppercase>
							Задайте параметры
						</Text>
					</h1>
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={fontSize}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
