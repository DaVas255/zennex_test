'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Filter from '../Filter/Filter';

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

interface HomePageProps {
	initialProducts: Product[];
	initialCategories: string[];
}

export default function HomePage({
	initialProducts,
	initialCategories,
}: HomePageProps) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Filter
				initialProducts={initialProducts}
				initialCategories={initialCategories}
			/>
		</QueryClientProvider>
	);
}
