import { Dispatch, KeyboardEvent, ReactNode, RefObject, SetStateAction } from 'react';

import { VisibleItem } from '@/shared/hooks';
import { RequiredStatusValues } from '@/shared/types';

export type SelectOpenPosition = 'top' | 'bottom' | 'auto';
export type SelectValue<T> = Option<T> | Option<T>[] | null;

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

interface BaseSelectProps extends RequiredStatusValues {
  searchable: boolean;
  required: boolean;
  multiple: boolean;
  disabled: boolean;
  isLoading: boolean;
  gap: number;
  itemHeight: number;
  listOffsetY: number;
  maxSelectedItemsCount: number;
  selectId: string;
  dropdownHeight: keyof typeof dropdownHeightMap | number;
  openPosition: SelectOpenPosition;
}

interface SelectGenericProps<T> {
  value?: SelectValue<T>;
  options?: Option<T>[];
  onChange?: (option: SelectValue<T>) => void;
  loadOptions?: () => Promise<Option<T>[]> | Option<T>[];
}

interface SelectRefs {
  ref: RefObject<HTMLDivElement | null>;
  focusedOptionRef: RefObject<HTMLLIElement | null>;
  searchInputRef: RefObject<HTMLInputElement | null>;
  listContainerRef: RefObject<HTMLDivElement | null>;
  selectorRef: RefObject<HTMLDivElement | null>;
}

export interface SelectProps<T> extends Partial<BaseSelectProps>, SelectGenericProps<T> {
  className?: string;
  placeholder?: string;
  excludeSelected?: boolean;
  overscanCount?: number;
}
export interface SelectProviderProps<T> extends Partial<BaseSelectProps>, SelectGenericProps<T> {
  id: string;
  children: ReactNode;
  excludeSelected?: boolean;
  overscanCount?: number;
}

export interface ContextValues<T> extends SelectRefs, BaseSelectProps {
  selectedOptions: Option<T>[];
  visibleOptions: VisibleItem<Option<T>>[];
  focusedIndex: number;
  searchValue: string;
  isOpen: boolean;
  dropdownHeight: number;
  listHeight: number | string;
  onChangeOption: (index: number) => void;
  onSearchChange: (value: string) => void;
  toggleDropdown: () => void;
  onRemoveOption: (option: Option<T>) => void;
  removeAllOptions: () => void;
  onSelectKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  itemsListNavigation: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export interface UseSelectLogicProps<T>
  extends Pick<BaseSelectProps, 'disabled' | 'multiple' | 'searchable' | 'openPosition' | 'maxSelectedItemsCount'>,
    Pick<SelectRefs, 'focusedOptionRef' | 'searchInputRef' | 'selectorRef'>,
    SelectGenericProps<T> {
  dropdownHeight: number;
  isOpen: boolean;
  excludeSelected: boolean;
  options: Option<T>[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface UseSelectLogicReturn<T> {
  focusedIndex: number;
  searchValue: string;
  loadingError: string | null;
  isLoading: boolean;
  filteredOptions: Option<T>[];
  selectedOptions: Option<T>[];
  openPosition: SelectOpenPosition;
  setSearchValue: Dispatch<SetStateAction<string>>;
  removeAllOptions: () => void;
  toggleDropdown: () => void;
  handleOptionClick: (index: number) => void;
  handleRemoveOption: (option: Option<T>) => void;
  onSelectKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  itemsListNavigation: (e: KeyboardEvent<HTMLDivElement>) => void;
}
