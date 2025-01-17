import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ComboBox from '../ComboBox/ComboBox';
import ProductsList from '../ProductsList/ProductsList';
import styles from './Filter.module.scss';
import { fetchCategoryProducts } from '@/api/fetchApi';

export default function Filter() {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const { data: products, isLoading } = useQuery({
		queryKey: ['products', selectedCategories],
		queryFn: () => fetchCategoryProducts(selectedCategories),
	});

	return (
		<div className={styles.filter}>
			<ComboBox
				selectedCategories={selectedCategories}
				onChange={setSelectedCategories}
				backgroundColor=''
				color=''
				fontSize=''
				border=''
			/>

			{isLoading && <div>Загрузка продуктов...</div>}
			{products && <ProductsList products={products} />}
		</div>
	);
}
