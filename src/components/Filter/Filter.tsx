import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import ComboBox from '../ComboBox/ComboBox';
import ProductsList from '../ProductsList/ProductsList';
import styles from './Filter.module.scss';
import { fetchCategoryProducts, fetchProducts } from '@/api/fetchApi';

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

/**
 * Компонент для фильтрации продуктов:
 */

export default function Filter() {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [initialProducts, setInitialProducts] = useState<Product[] | null>([]);
	const [initialError, setInitialError] = useState<string | null>(null);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchProducts()
			.then((products) => {
				setInitialProducts(products);
			})
			.catch((error) => {
				setInitialError(error.message);
			})
			.finally(() => {
				setInitialLoading(false);
			});
	}, []);

	const { data: productsFromQuery, isLoading: isQueryLoading } = useQuery(
		['products', selectedCategories],
		() => fetchCategoryProducts(selectedCategories),
		{
			enabled: selectedCategories.length > 0,
		}
	);

	const handleChangeCategories = (updateFn: (prev: string[]) => string[]) => {
		setSelectedCategories((prev) => updateFn(prev));
	};

	const productsToShow =
		selectedCategories.length === 0 ? initialProducts : productsFromQuery;

	const loading =
		initialLoading || (isQueryLoading && selectedCategories.length > 0);

	if (loading) return <div>Загрузка продуктов</div>;

	if (initialError) return <div>Ошибка</div>;

	return (
		<div className={styles.filter}>
			<ComboBox
				selectedCategories={selectedCategories}
				onChange={handleChangeCategories}
				theme='multi-colored'
			/>

			{productsToShow ? (
				<ProductsList products={productsToShow} />
			) : (
				<div>Нет товаров</div>
			)}
		</div>
	);
}
