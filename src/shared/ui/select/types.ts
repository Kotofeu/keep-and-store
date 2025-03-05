import { Dispatch, KeyboardEvent, ReactNode, Ref, RefObject, SetStateAction } from 'react';

import { VisibleItem } from '@/shared/hooks';

export interface Option<T = any> {
  value: string;
  label: string;
  ui?: ReactNode;
  groupName?: string;
  disabled?: boolean;
  data?: T;
}

export const dropdownHeightMap = {
  small: 150,
  medium: 200,
  large: 250
} as const;

interface BaseProps {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

interface BaseSelectProps<T> extends BaseProps {
  placeholder?: string;
  options?: Option<T>[];
  multiple?: boolean;
  required?: boolean;
}

interface BaseDropdownProps {
  dropdownHeight?: keyof typeof dropdownHeightMap | number;
  itemHeight?: number;
  gap?: number;
  overscanCount?: number;
}

interface ListItemProps<T> {
  selectId: string;
  visibleItems: VisibleItem<Option<T>>[];
  selectedOptions: Option<T>[];
  isOpen: boolean;
  focusedIndex?: number;
  listHeight: number;
  listOffsetY: number;
  loadingError: string | null;
  focusedOptionRef: Ref<HTMLLIElement> | undefined | null;
  listContainerRef: RefObject<HTMLDivElement | null>;
  onChangeOption: (index: number) => void;
}

export interface ItemsListProps<T> extends ListItemProps<T>, BaseDropdownProps {
  multiple?: boolean;
}

interface SearchableProps {
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

interface SelectActions<T> {
  onChange?: (option: Option<T> | Option<T>[] | null) => void;
  loadOptions?: () => Promise<Option<T>[]>;
  onRemoveOption?: (option: Option<T>) => void;
  removeAllOptions?: () => void;
  toggleDropdown?: () => void;
}

export interface SelectClientProps<T> extends BaseSelectProps<T>, BaseDropdownProps, SearchableProps, SelectActions<T> {
  value?: Option<T> | Option<T>[] | null;
}

export interface SelectServerProps<T>
  extends BaseSelectProps<T>,
    BaseDropdownProps,
    ListItemProps<T>,
    SearchableProps,
    SelectActions<T> {
  selectedOptions: Option<T>[];
  searchValue?: string;
  isLoading: boolean;
  onRemoveOption: (option: Option<T>) => void;
  removeAllOptions: () => void;
  onSearchChange?: (value: string) => void;
}

export interface SelectedItemProps<T> extends BaseSelectProps<T>, SelectActions<T> {
  options: Option<T>[];
  onRemoveOption: (option: Option<T>) => void;
  removeAllOptions: () => void;
  isLoading: boolean;
  selectId: string;
  isOpen: boolean;
}

export interface UseSelectLogicProps<T> {
  options: Option<T>[];
  multiple: boolean;
  value: Option<T> | Option<T>[] | undefined | null;
  isOpen: boolean;
  focusedOptionRef: RefObject<HTMLLIElement | null>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  onChange?: (option: Option<T> | Option<T>[] | null) => void;
  loadOptions?: () => Promise<Option<T>[]>;
}

export interface UseSelectLogicReturn<T> {
  selectedOptions: Option<T>[];
  searchValue: string;
  focusedIndex: number;
  filteredOptions: Option<T>[];
  setSearchValue: Dispatch<SetStateAction<string>>;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
  handleOptionClick: (index: number) => void;
  handleRemoveOption: (option: Option<T>) => void;
  removeAllOptions: () => void;
  toggleDropdown: () => void;
  openSelectByEnter: (e: KeyboardEvent<HTMLDivElement>) => void;
  isLoading: boolean;
  error: string | null;
}
