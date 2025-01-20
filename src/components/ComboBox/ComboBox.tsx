'use client';

import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '@/api/fetchApi';
import { ChevronUpIcon, ChevronDownIcon, CloseIcon } from '@/app/assets/icons';
import styles from './ComboBox.module.scss';

interface ComboBoxProps {
	selectedCategories: string[];
	onChange: (categories: string[]) => void;
	backgroundColor?: string;
	color?: string;
	fontSize?: string;
	border?: string;
}

export default function ComboBox({
	selectedCategories,
	onChange,
	backgroundColor,
	color,
	fontSize,
	border,
}: ComboBoxProps) {
	const [searchValue, setSearchValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const comboBoxRef = useRef<HTMLDivElement>(null);

	const {
		data: categories,
		isLoading,
		isError,
	} = useQuery(['categories'], fetchCategories);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				comboBoxRef.current &&
				!comboBoxRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	if (isLoading) return <div>Загрузка категорий...</div>;
	if (isError || !categories) return <div>Ошибка при загрузке категорий</div>;

	const filteredCategories = categories.filter((category) =>
		category.toLowerCase().includes(searchValue.trim().toLowerCase())
	);

	const unselectedCategories = filteredCategories.filter(
		(category) => !selectedCategories.includes(category)
	);

	const handleSelectCategory = (category: string) => {
		if (!selectedCategories.includes(category)) {
			onChange([...selectedCategories, category]);
		}
	};

	const handleRemoveCategory = (category: string) => {
		onChange(selectedCategories.filter((cat) => cat !== category));
	};

	const isAllSelected = selectedCategories.length === categories.length;
	const isDropdownOpen =
		isOpen && !isAllSelected && filteredCategories.length > 0;

	return (
		<div className={styles.comboBox} ref={comboBoxRef}>
			<div
				className={styles.comboBox__inputWrap}
				style={{
					backgroundColor: backgroundColor,
					border: border,
				}}
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
						className={styles.comboBox__input}
						type='text'
						placeholder='Поиск'
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onFocus={() => setIsOpen(true)}
						style={{
							fontSize: fontSize,
							color: color,
						}}
					/>
				</div>

				{isDropdownOpen ? (
					<ChevronUpIcon onClick={() => setIsOpen(false)} />
				) : (
					<ChevronDownIcon onClick={() => setIsOpen(true)} />
				)}
			</div>

			{isDropdownOpen && (
				<ul className={styles.comboBox__dropdownList}>
					{unselectedCategories.map((category, index) => (
						<li
							key={index}
							className={styles.comboBox__dropdownItem}
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
