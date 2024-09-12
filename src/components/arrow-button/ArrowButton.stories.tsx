import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';
import { useState } from 'react';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () => {
		// Логика переключения состояния кнопки (открыто/закрыто)
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [isOpen, setIsOpen] = useState<boolean>(false);

		const handleClick = () => {
			setIsOpen(!isOpen); // Переключаем состояние кнопки при клике
		};

		return (
			<>
				<ArrowButton isOpen={isOpen} onClick={handleClick} />
			</>
		);
	},
};
