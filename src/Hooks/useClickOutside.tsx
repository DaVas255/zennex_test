import { useEffect } from 'react';

/**
 * Кастомный хук, который вызывает callback,
 * если пользователь кликнул за пределами переданного ref-элемента.
 * @param ref - React реф на элемент, при клике вне которого срабатывает callback.
 * @param callback - Функция, вызываемая при клике «мимо» ref.
 */

export default function useClickOutside(
	ref: React.RefObject<HTMLElement | null>,
	callback: () => void
) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
}
