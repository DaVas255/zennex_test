type ChevronProps = {
	onClick: () => void;
	theme?: 'light' | 'dark' | 'multi-colored';
};

export default function ChevronUp({ onClick, theme }: ChevronProps) {
	let color;

	if (theme === 'light') {
		color = '#000000';
	} else if (theme === 'dark') {
		color = '#ffffff';
	} else if (theme === 'multi-colored') {
		color = '#fa8c8c';
	}

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
				stroke={color}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
