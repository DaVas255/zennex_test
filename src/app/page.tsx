'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Filter from '@/components/Filter/Filter';

const queryClient = new QueryClient();

export default function Home() {
	return (
		<QueryClientProvider client={queryClient}>
			<Filter />
		</QueryClientProvider>
	);
}
