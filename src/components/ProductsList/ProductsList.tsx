'use client';

import { Product, ProductsListProps } from '@/types/types';
import ProductItem from '@/components/ProductItem/ProductItem';
import styles from './ProductsList.module.scss';

export default function ProductsList({ products }: ProductsListProps) {
	if (!products || !products.length) return <div>Нет товаров</div>;

	return (
		<div className={styles.products}>
			{products.map((product: Product) => (
				<ProductItem key={product.id} product={product} />
			))}
		</div>
	);
}
