import { ChevronProps } from '@/types/types';

export default function ChevronUp({ onClick }: ChevronProps) {
	return (
		<svg
			width='20px'
			height='20px'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			onClick={onClick}
		>
			<path
				d='M6 15L12 9L18 15'
				stroke='#fff'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
