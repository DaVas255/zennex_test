import Wrapper from '@/components/Wrapper/Wrapper';
import { fetchCategories, fetchProducts } from '@/api/fetchApi';

export default async function Page() {
	const categories = await fetchCategories();
	const products = await fetchProducts();

	if (!products) return console.error('Продукты не получены');
	if (!categories) return console.error('Категории не получены');

	return <Wrapper initialProducts={products} initialCategories={categories} />;
}
