import { useEffect, useRef } from 'react';

type ClickOutsideEvents = Pick<
	WindowEventMap,
	'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'pointerdown' | 'pointerup'
>;

/**
 * @property {() => void} onClickOutside - 외부 클릭 이벤트 발생 시 실행할 함수
 * @property {keyof ClickOutsideEvents} event - 외부 클릭 이벤트 종류
 */

interface Props {
	onClickOutside: () => void;
	event?: keyof ClickOutsideEvents;
}

/**
 * @param {Props} props
 * @param {() => void} props.onClickOutside - 외부 클릭 이벤트 발생 시 실행할 함수
 * @param {keyof ClickOutsideEvents} props.event - 외부 클릭 이벤트 종류
 * @returns {React.RefObject<T>} 외부 클릭 이벤트를 감지할 element ref
 */

const useClickOutside = <T extends HTMLElement = HTMLElement>({
	onClickOutside,
	event = 'mousedown',
}: Props): React.RefObject<T> => {
	const ref = useRef<T>(null);

	useEffect(() => {
		const handleClickOutside = (e: ClickOutsideEvents[typeof event]) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClickOutside();
			}
		};
		window.addEventListener(event, handleClickOutside);
		return () => {
			window.removeEventListener(event, handleClickOutside);
		};
	}, [onClickOutside, event]);

	return ref;
};

export default useClickOutside;
