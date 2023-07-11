'use client';

import { LiHTMLAttributes, MouseEvent } from 'react';
import { item, checkedIconColor, type Size } from './Dropdown.css';

import clsx from 'classnames';
import { useDropdownMenuContext } from './contexts/DropdownMenuContext';
import CheckedIcon from './Icons/CheckedIcon';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  /**
   * Item 별로 가지는 고유값 (선택 state 값에 사용됨)
   */
  itemKey: string;

  /**
   * Item의 크기를 설정한다. @default medium
   */
  size?: Size;
}

const DropdownItem = ({ children, className, onClick, itemKey, size, ...rest }: Props) => {
  const { selectable, selectedItemKey, onSelectChange, closeDropdown } = useDropdownMenuContext();

  const handleClickItem = (e: MouseEvent<HTMLLIElement>) => {
    if (selectable) onSelectChange(selectedItemKey === itemKey ? null : itemKey);
    onClick?.(e);
    closeDropdown();
  };

  const isSelected = selectable && selectedItemKey === itemKey;

  return (
    <li
      className={clsx(item({ selected: isSelected, size }), className)}
      tabIndex={0}
      role="menuitemradio"
      aria-checked={isSelected}
      onClick={handleClickItem}
      {...rest}
    >
      {children}
      {isSelected && (
        <span className={checkedIconColor} aria-hidden={true}>
          <CheckedIcon />
        </span>
      )}
    </li>
  );
};

export default DropdownItem;
