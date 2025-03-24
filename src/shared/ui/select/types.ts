import { Dispatch, KeyboardEvent, ReactNode, Ref, RefObject, SetStateAction } from 'react';

import { VisibleItem } from '@/shared/hooks';

export const dropdownHeightMap = {
  small: 150,
  medium: 200,
  large: 250
} as const;

export interface Option<T = any> {
  value: string;
  label: string;
  groupName?: string;
  disabled?: boolean;
  ui?: ReactNode;
  data?: T;
}

interface BaseProps {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

interface BaseSelectProps<T> extends BaseProps {
  placeholder?: string;
  error?: boolean | string | null;
  success?: boolean | string | null;
  warning?: boolean | string | null;
  isOpen?: boolean;
  multiple?: boolean;
  required?: boolean;
  options?: Option<T>[];
}

interface BaseDropdownProps {
  itemHeight?: number;
  gap?: number;
  overscanCount?: number;
  maxSelectedItemsCount?: number;
  dropdownHeight?: keyof typeof dropdownHeightMap | number;
}

interface ListItemProps<T> {
  selectId: string;
  listHeight: number;
  listOffsetY: number;
  focusedIndex?: number;
  selectedOptions: Option<T>[];
  visibleItems: VisibleItem<Option<T>>[];
  focusedOptionRef: Ref<HTMLLIElement> | undefined | null;
  listContainerRef: RefObject<HTMLDivElement | null>;
  onChangeOption: (index: number) => void;
}

interface SearchableProps {
  searchValue?: string;
  searchable?: boolean;
  onSearchChange?: (value: string) => void;
}

interface SelectActions<T> {
  removeAllOptions?: () => void;
  toggleDropdown?: () => void;
  onChange?: (option: Option<T> | Option<T>[] | null) => void;
  loadOptions?: () => Promise<Option<T>[]> | Option<T>[];
  onRemoveOption?: (option: Option<T>) => void;
}

export interface SelectClientProps<T> extends BaseSelectProps<T>, BaseDropdownProps, SearchableProps, SelectActions<T> {
  excludeSelected?: boolean;
  value?: Option<T> | Option<T>[] | null;
}

export interface SelectServerProps<T>
  extends BaseSelectProps<T>,
    BaseDropdownProps,
    ListItemProps<T>,
    SearchableProps,
    SelectActions<T> {
  searchValue?: string;
  isLoading: boolean;
  selectedOptions: Option<T>[];
  ref: RefObject<HTMLDivElement | null>;
  removeAllOptions: () => void;
  onRemoveOption: (option: Option<T>) => void;
  onSearchChange?: (value: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  openSelectByEnter: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export interface SelectedItemProps<T> extends BaseSelectProps<T>, SelectActions<T> {
  selectId: string;
  maxSelectedItemsCount?: number;
  isLoading: boolean;
  options: Option<T>[];
  removeAllOptions: () => void;
  onRemoveOption: (option: Option<T>) => void;
}

export interface ItemsListProps<T> extends ListItemProps<T>, BaseDropdownProps {
  multiple?: boolean;
  error?: string;
}

export interface UseSelectLogicProps<T> {
  maxSelectedItemsCount?: number;
  isOpen: boolean;
  disabled: boolean;
  multiple: boolean;
  excludeSelected: boolean;
  value: Option<T> | Option<T>[] | undefined | null;
  options: Option<T>[];
  focusedOptionRef: RefObject<HTMLLIElement | null>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onChange?: (option: Option<T> | Option<T>[] | null) => void;
  loadOptions?: () => Promise<Option<T>[]> | Option<T>[];
}

export interface UseSelectLogicReturn<T> {
  searchValue: string;
  error: string | null;
  focusedIndex: number;
  isLoading: boolean;
  filteredOptions: Option<T>[];
  selectedOptions: Option<T>[];
  setSearchValue: Dispatch<SetStateAction<string>>;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
  removeAllOptions: () => void;
  toggleDropdown: () => void;
  handleOptionClick: (index: number) => void;
  handleRemoveOption: (option: Option<T>) => void;
  openSelectByEnter: (e: KeyboardEvent<HTMLDivElement>) => void;
}
