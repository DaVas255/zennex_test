import styles from './ProductsItem.module.scss';
import { Product } from '@/types/types';
import { RatingIcon } from '@/app/assets/icons';

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
