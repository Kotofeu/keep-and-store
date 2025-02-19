import { FC, ReactNode, useRef, useState, useEffect, KeyboardEvent } from 'react';

import { classNames } from '@/shared/lib';
import { useClickOutside } from '@/shared/hooks';

import styles from './styles.module.scss';

export interface Option {
  value: string;
  label: string;
  ui?: ReactNode;
}

interface SelectProps {
  className?: string;
  options: Option[];
  placeholder?: string;
  value?: Option | Option[];
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  onChange?: (option: Option | Option[]) => void;
}

export const Select: FC<SelectProps> = ({
  className,
  options,
  placeholder,
  value,
  disabled,
  multiple = false,
  searchable = false,
  onChange
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useClickOutside(ref, menuRef);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (value) {
      setSelectedOptions(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const toggleDropdown = () => !disabled && setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    if (multiple) {
      const newSelectedOptions = selectedOptions.some(o => o.value === option.value)
        ? selectedOptions.filter(o => o.value !== option.value)
        : [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      onChange?.(newSelectedOptions);
    } else {
      setSelectedOptions([option]);
      onChange?.(option);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      setFocusedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      handleOptionClick(options[focusedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={classNames(styles.select, { [styles.disabled]: !!disabled }, [className])}
      ref={ref}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={styles.selectedValue} onClick={toggleDropdown}>
        {selectedOptions.length > 0
          ? selectedOptions.map(option => <span key={option.value}>{option.ui || option.label}</span>)
          : placeholder}
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {searchable && (
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          )}
          <ul className={styles.optionsList} ref={menuRef}>
            {options.map((option, index) => (
              <li
                key={option.value}
                className={classNames(styles.option, {
                  [styles.focused]: index === focusedIndex,
                  [styles.selected]: selectedOptions.some(o => o.value === option.value)
                })}
                onClick={() => handleOptionClick(option)}
              >
                {option.ui || option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
