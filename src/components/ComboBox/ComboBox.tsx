'use client';

import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '@/api/fetchApi';
import { ChevronUpIcon, ChevronDownIcon, CloseIcon } from '@/app/assets/icons';
import styles from './ComboBox.module.scss';
import useClickOutside from '@/Hooks/useClickOutside';

interface ComboBoxProps {
	selectedCategories: string[];
	onChange: (updateFn: (prev: string[]) => string[]) => void;
	theme: 'light' | 'dark' | 'multi-colored';
}

export default function ComboBox({
	selectedCategories,
	onChange,
	theme,
}: ComboBoxProps) {
	const [searchValue, setSearchValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [categories, setCategories] = useState<string[]>([]);
	const comboBoxRef = useRef<HTMLDivElement>(null);
	useClickOutside(comboBoxRef, () => setIsOpen(false));

	useEffect(() => {
		fetchCategories()
			.then((categories) => {
				setCategories(categories || []);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) return <div>Загрузка категорий...</div>;

	const filteredCategories = categories.filter((category) =>
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

	const isAllSelected = selectedCategories.length === categories.length;
	const isDropdownOpen =
		isOpen && !isAllSelected && filteredCategories.length > 0;

	if (error) {
		return <div>{error}</div>;
	}

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
