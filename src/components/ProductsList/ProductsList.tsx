'use client';

import ProductItem from '@/components/ProductItem/ProductItem';
import styles from './ProductsList.module.scss';

type Product = {
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
};

type ProductsListProps = {
	products: Product[];
};

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
