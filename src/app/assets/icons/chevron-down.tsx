type ChevronProps = {
	onClick: () => void;
	theme?: 'light' | 'dark' | 'multi-colored';
};

export default function ChevronDown({ onClick, theme }: ChevronProps) {
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
			fill={color}
			width='20px'
			height='20px'
			viewBox='-5 -8 24 24'
			xmlns='http://www.w3.org/2000/svg'
			preserveAspectRatio='xMinYMin'
			onClick={onClick}
		>
			<path d='M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z' />
		</svg>
	);
}
