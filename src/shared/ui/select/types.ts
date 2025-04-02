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

export interface SelectProps<T> {
  className?: string;
  placeholder?: string;
  value?: Option<T> | Option<T>[] | null;
  options?: Option<T>[];
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  required?: boolean;
  isLoading?: boolean;
  excludeSelected?: boolean;
  success?: boolean | string | null;
  warning?: boolean | string | null;
  error?: boolean | string | null;
  dropdownHeight?: keyof typeof dropdownHeightMap | number;
  itemHeight?: number;
  gap?: number;
  overscanCount?: number;
  maxSelectedItemsCount?: number;
  selectId?: string | number;
  onChange?: (option: Option<T> | Option<T>[] | null) => void;
  loadOptions?: () => Promise<Option<T>[]> | Option<T>[];
}

export interface SelectComponentProps<T> {
  className?: string;
  placeholder?: string;
  selectedOptions: Option<T>[];
  selectId: string | number;
  visibleItems: VisibleItem<Option<T>>[];
  searchable: boolean;
  isOpen: boolean;
  required: boolean;
  multiple: boolean;
  disabled: boolean;
  isLoading: boolean;
  maxSelectedItemsCount: number;
  dropdownHeight: keyof typeof dropdownHeightMap | number;
  gap: number;
  itemHeight: number;
  listHeight: number;
  listOffsetY: number;
  focusedIndex: number;
  searchValue: string;
  success: boolean | string | null;
  warning: boolean | string | null;
  error: boolean | string | null;
  focusedOptionRef: Ref<HTMLLIElement> | undefined | null;
  searchInputRef: RefObject<HTMLInputElement | null>;
  listContainerRef: RefObject<HTMLDivElement | null>;
  ref: RefObject<HTMLDivElement | null>;
  onSelectKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  onChangeOption: (index: number) => void;
  onSearchChange: (value: string) => void;
  toggleDropdown: () => void;
  onRemoveOption: (option: Option<T>) => void;
  removeAllOptions: () => void;
}

export interface SelectedItemProps<T> {
  placeholder?: string;
  selectedOptions: Option<T>[];
  selectId: string | number;
  multiple: boolean;
  required: boolean;
  success: boolean | string | null;
  warning: boolean | string | null;
  error: boolean | string | null;
  isOpen: boolean;
  disabled: boolean;
  isLoading: boolean;
  maxSelectedItemsCount: number;
  onRemoveOption: (option: Option<T>) => void;
  toggleDropdown: () => void;
  onSelectKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  removeAllOptions: () => void;
}

export interface ItemsListProps<T> {
  visibleItems: VisibleItem<Option<T>>[];
  selectedOptions: Option<T>[];
  selectId: string | number;
  multiple: boolean;
  focusedIndex: number;
  maxSelectedItemsCount: number;
  error: boolean | string | null;
  gap: number;
  itemHeight: number;
  listHeight: number;
  listOffsetY: number;
  listContainerRef: RefObject<HTMLDivElement | null>;
  focusedOptionRef: Ref<HTMLLIElement> | undefined | null;
  onChangeOption: (index: number) => void;
}

export interface UseSelectLogicProps<T> {
  maxSelectedItemsCount: number;
  isOpen: boolean;
  disabled: boolean;
  multiple: boolean;
  excludeSelected: boolean;
  searchable: boolean;
  value: Option<T> | Option<T>[] | undefined | null;
  options: Option<T>[];
  focusedOptionRef: RefObject<HTMLLIElement | null>;
  searchInputRef: RefObject<HTMLInputElement | null>;
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
  removeAllOptions: () => void;
  toggleDropdown: () => void;
  handleOptionClick: (index: number) => void;
  handleRemoveOption: (option: Option<T>) => void;
  onSelectKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}
