import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	// функция обновления состояния
	const handleSetArticleState = (newArticleState: ArticleStateType) => {
		setArticleState(newArticleState);
	};
	// функция сброса состояния
	const handleResetArticleState = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				handleSetArticleState={handleSetArticleState}
				handleResetArticleState={handleResetArticleState}
			/>
			<Article />
		</main>
	);
};
