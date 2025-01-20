'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ComboBox from '../ComboBox/ComboBox';
import ProductsList from '../ProductsList/ProductsList';
import { fetchCategoryProducts } from '@/api/fetchApi';
import styles from './Filter.module.scss';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

interface FilterProps {
	initialProducts: Product[];
	initialCategories: string[];
}

export default function Filter({
	initialProducts,
	initialCategories,
}: FilterProps) {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const { data: products, isLoading } = useQuery(
		['products', selectedCategories],
		() => {
			return selectedCategories.length
				? fetchCategoryProducts(selectedCategories)
				: initialProducts;
		}
	);

	const handleChangeCategories = (updateFn: (prev: string[]) => string[]) => {
		setSelectedCategories((prev) => updateFn(prev));
	};

	return (
		<div className={styles.filter}>
			<ComboBox
				initialCategories={initialCategories}
				selectedCategories={selectedCategories}
				onChange={handleChangeCategories}
				theme='dark'
			/>

			{isLoading && <div>Загрузка продуктов...</div>}
			{products && <ProductsList products={products} />}
		</div>
	);
}
