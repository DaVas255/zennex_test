'use client';

import { useRef, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, CloseIcon } from '@/app/assets/icons';
import styles from './ComboBox.module.scss';
import useClickOutside from '@/hooks/useClickOutside';

/**
 * @property initialCategories - Исходный список категорий.
 * @property selectedCategories - Текущий список выбранных категорий.
 * @property onChange - Колбэк, который принимает функцию для обновления категорий.
 * @property theme - Тема оформления ComboBox: 'light', 'dark' или 'multi-colored'.
 */
interface ComboBoxProps {
	initialCategories: string[];
	selectedCategories: string[];
	onChange: (updateFn: (prev: string[]) => string[]) => void;
	theme: 'light' | 'dark' | 'multi-colored';
}

/**
 * ComboBox для выбора категорий:
 * - Поддерживает поиск
 * - Отображает уже выбранные категории и позволяет их удалить
 * - Подгружает список категорий (fetchCategories)
 * - Умеет переключаться между темами (light, dark, multi-colored)
 */

export default function ComboBox({
	initialCategories,
	selectedCategories,
	onChange,
	theme,
}: ComboBoxProps) {
	const [searchValue, setSearchValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const comboBoxRef = useRef<HTMLDivElement>(null);
	useClickOutside(comboBoxRef, () => setIsOpen(false));

	const filteredCategories = initialCategories.filter((category) =>
		category.toLowerCase().includes(searchValue.trim().toLowerCase())
	);

	const unselectedCategories = filteredCategories.filter(
		(category) => !selectedCategories.includes(category)
	);

	const handleSelectCategory = (category: string) => {
		if (!selectedCategories.includes(category))
			onChange((prev) => [...prev, category]);
	};

	const handleRemoveCategory = (category: string) => {
		onChange((prev) => prev.filter((cat) => cat !== category));
	};

	const isAllSelected = selectedCategories.length === initialCategories.length;
	const isDropdownOpen =
		isOpen && !isAllSelected && filteredCategories.length > 0;

	return (
		<div className={styles.comboBox} ref={comboBoxRef}>
			<div
				className={`
        ${styles.comboBox__inputWrap} 
        ${styles[`comboBox__inputWrap-${theme}`]}
      `}
			>
				<div className={styles.comboBox__tags}>
					{selectedCategories.map((cat, index) => (
						<div key={index} className={styles.comboBox__tag}>
							{cat}
							<button
								type='button'
								className={styles.comboBox__tagRemove}
								onClick={() => handleRemoveCategory(cat)}
							>
								<CloseIcon />
							</button>
						</div>
					))}

					<input
						className={`${styles.comboBox__input} ${
							styles[`comboBox__input-${theme}`]
						}`}
						type='text'
						placeholder='Поиск'
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onFocus={() => setIsOpen(true)}
					/>
				</div>

				{isDropdownOpen ? (
					<ChevronUpIcon onClick={() => setIsOpen(false)} theme={theme} />
				) : (
					<ChevronDownIcon onClick={() => setIsOpen(true)} theme={theme} />
				)}
			</div>

			{isDropdownOpen && (
				<ul
					className={`${styles.comboBox__dropdownList} ${
						styles[`comboBox__dropdownList-${theme}`]
					}`}
				>
					{unselectedCategories.map((category, index) => (
						<li
							key={index}
							className={`${styles.comboBox__dropdownItem} ${
								styles[`comboBox__dropdownItem-${theme}`]
							}`}
							onClick={() => handleSelectCategory(category)}
						>
							{category}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
