import styles from './ProductsItem.module.scss';
import { RatingIcon } from '@/app/assets/icons';

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
 * Отдельный товар (карточка).
 * Отображает изображение, название, описание, цену и рейтинг.
 */

export default function ProductItem({ product }: { product: Product }) {
	return (
		<div className={styles.product}>
			<img src={product.image} alt='Photo' className={styles.product__image} />
			<div className={styles.product__title}>{product.title}</div>
			<div className={styles.product__description}>{product.description}</div>
			<div className={styles.product__info}>
				<div>{product.price}$</div>
				<div className={styles.product__rating}>
					{product.rating.rate}
					<RatingIcon />
				</div>
			</div>
		</div>
	);
}
