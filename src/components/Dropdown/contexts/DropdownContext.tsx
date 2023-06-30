'use client';

import { useContext, createContext, ReactNode, RefObject, useMemo, useId } from 'react';
import { useMenuYPlacement } from '@/components/Dropdown/hooks';
import { useBooleanState } from '@/hooks';

/**
 * @property {boolean} isOpen - dropdown의 열림/닫힘 상태
 * @property {RefObject<HTMLButtonElement>} toggleRef - dropdown toggle 역할을 하는 요소의 ref
 * @property {RefObject<HTMLUListElement>} menuRef - dropdown menu 역할을 하는 요소의 ref
 * @property {'top' | 'bottom'} yplacement - dropdown의 상하 위치 값
 * @property {() => void} toggleDropdown - dropdown toggle 함수
 * @property {() => void} closeDropdown - dropdown close 함수
 */

interface DropdownContextValue {
	isOpen: boolean;
	toggleRef: RefObject<HTMLButtonElement>;
	menuRef: RefObject<HTMLUListElement>;
	yplacement: 'top' | 'bottom';
	toggleDropdown: () => void;
	closeDropdown: () => void;
	menuId: string;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const DropdownContextProvider = ({ children }: { children: ReactNode }) => {
	const menuId = useId();
	const [isOpen, , closeDropdown, toggleDropdown] = useBooleanState();
	const { toggleRef, menuRef, yplacement } = useMenuYPlacement(isOpen);

	const contextValue = useMemo(
		() => ({ isOpen, toggleRef, menuRef, yplacement, toggleDropdown, closeDropdown, menuId }),
		[isOpen, toggleRef, menuRef, yplacement, toggleDropdown, closeDropdown, menuId],
	);

	return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>;
};

const useDropdownContext = () => {
	const ctx = useContext(DropdownContext);
	if (!ctx) throw new Error('Cannot find DropdownContext. It should be wrapped within DropdownContextProvider.');
	return ctx;
};

export { DropdownContextProvider, useDropdownContext };
