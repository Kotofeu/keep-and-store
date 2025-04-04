import { Dispatch, KeyboardEvent, ReactNode, RefObject, SetStateAction } from 'react';

import { VisibleItem } from '@/shared/hooks';
import { RequiredStatusValues, StatusValues } from '@/shared/types';

export const dropdownHeightMap = {
  small: 150,
  medium: 200,
  large: 250
} as const;

export type SelectOpenPosition = 'top' | 'bottom' | 'auto';

export interface Option<T = any> {
  value: string;
  label: string;
  groupName?: string;
  disabled?: boolean;
  ui?: ReactNode;
  data?: T;
}

/**
 * Base properties for all Select components
 */
interface BaseSelectProps {
  className?: string; // CSS class for styling
  placeholder?: string; // Placeholder text when no option is selected
}

/**
 * State-related properties for Select component
 */
interface SelectStateProps {
  searchable: boolean; // Whether search functionality is enabled
  isOpen: boolean; // Whether dropdown is open
  required: boolean; // Whether selection is required
  multiple: boolean; // Whether multiple selection is allowed
  disabled: boolean; // Whether the select is disabled
  isLoading: boolean; // Whether options are being loaded
  openPosition: SelectOpenPosition; // Opening direction
}

/**
 * Refs used by the Select component for DOM manipulation
 */
interface SelectRefs {
  focusedOptionRef: RefObject<HTMLLIElement | null>; // Ref for currently focused option
  searchInputRef: RefObject<HTMLInputElement | null>; // Ref for search input
  listContainerRef: RefObject<HTMLDivElement | null>; // Ref for options list container
  selectorRef: RefObject<HTMLDivElement | null>; // Selector ref
  ref: RefObject<HTMLDivElement | null>; // Main component ref
}

/**
 * Virtual list configuration for efficient rendering of large option lists
 */
interface SelectVirtualList {
  dropdownHeight: keyof typeof dropdownHeightMap | number; // Height of dropdown
  gap: number; // Gap between items
  itemHeight: number; // Height of each item
  listHeight: number | string; // Total height of the list
  listOffsetY: number; // Vertical offset of the list
}

/**
 * Possible value types for the Select component
 */
type SelectValue<T> = Option<T> | Option<T>[] | null;

/**
 * Common functions shared across Select components
 */
interface SelectCommonFunctions<T> {
  toggleDropdown: () => void; // Toggle dropdown visibility
  onRemoveOption: (option: Option<T>) => void; // Remove a selected option
  removeAllOptions: () => void; // Remove all selected options
}

/**
 * Keyboard interaction functions
 */
interface SelectKeyboardFunctions {
  onSelectKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void; // Keyboard event handler
  itemsListNavigation: (e: KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Option selection and search handlers
 */
interface SelectOptionHandlers {
  onChangeOption: (index: number) => void; // Handle option selection
  onSearchChange: (value: string) => void; // Handle search input changes
}

/**
 * Main Select component props - what consumers of the component will use
 */
export interface SelectProps<T>
  extends StatusValues,
    Partial<Omit<SelectStateProps, 'isOpen'>>,
    BaseSelectProps,
    Partial<Omit<SelectVirtualList, 'listHeight'>> {
  value?: SelectValue<T>; // Current selected value(s)
  options?: Option<T>[]; // Available options
  excludeSelected?: boolean; // Whether to hide already selected options
  overscanCount?: number; // Number of extra items to render in virtual list
  maxSelectedItemsCount?: number; // Maximum allowed selected items
  selectId?: string | number; // Unique identifier for the select
  onChange?: (option: SelectValue<T>) => void; // Change handler
  loadOptions?: () => Promise<Option<T>[]> | Option<T>[]; // Async option loader
}

/**
 * Complete props for the Select component (internal use)
 */
export interface SelectComponentProps<T>
  extends RequiredStatusValues,
    SelectStateProps,
    BaseSelectProps,
    SelectRefs,
    SelectVirtualList,
    SelectCommonFunctions<T>,
    SelectKeyboardFunctions,
    SelectOptionHandlers {
  selectedOptions: Option<T>[]; // Currently selected options
  selectId: string | number; // Unique identifier
  visibleOptions: VisibleItem<Option<T>>[]; // Options currently visible in virtual list
  maxSelectedItemsCount: number; // Maximum allowed selected items
  focusedIndex: number; // Index of currently focused option
  searchValue: string; // Current search input value
}

/**
 * Props for the selected items display component
 */
export interface SelectedItemsProps<T>
  extends RequiredStatusValues,
    Omit<SelectStateProps, 'searchable'>,
    Pick<BaseSelectProps, 'placeholder'>,
    SelectCommonFunctions<T>,
    Pick<SelectKeyboardFunctions, 'onSelectKeyDown'>,
    Pick<SelectRefs, 'selectorRef'> {
  selectedOptions: Option<T>[]; // Selected options to display
  selectId: string | number; // Unique identifier
  maxSelectedItemsCount: number; // Maximum allowed selected items
}

// Helper types for list component props
type ListPropsRefs = Pick<SelectRefs, 'listContainerRef' | 'focusedOptionRef'>;
type ListVirtualProps = Omit<SelectVirtualList, 'dropdownHeight'>;

/**
 * Props for the options list component
 */
export interface ItemsListProps<T>
  extends Pick<RequiredStatusValues, 'error'>,
    Pick<SelectStateProps, 'multiple'>,
    ListPropsRefs,
    ListVirtualProps,
    Pick<SelectOptionHandlers, 'onChangeOption'> {
  visibleOptions: VisibleItem<Option<T>>[]; // Visible options in virtual list
  selectedOptions: Option<T>[]; // Currently selected options
  selectId: string | number; // Unique identifier
  focusedIndex: number; // Index of focused option
  maxSelectedItemsCount: number; // Maximum allowed selected items
}

/**
 * Props for the custom hook that manages Select logic
 */
export interface UseSelectLogicProps<T>
  extends Omit<SelectStateProps, 'isLoading' | 'required'>,
    Omit<SelectRefs, 'listContainerRef' | 'ref'> {
  maxSelectedItemsCount: number; // Maximum allowed selected items
  excludeSelected: boolean; // Whether to hide selected options
  value?: SelectValue<T>; // Initial value
  options: Option<T>[]; // Available options
  dropdownHeight: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>; // Dropdown visibility setter
  onChange?: (option: SelectValue<T>) => void; // Change handler
  loadOptions?: () => Promise<Option<T>[]> | Option<T>[]; // Async option loader
}

/**
 * Return type of the custom Select logic hook
 */
export interface UseSelectLogicReturn<T>
  extends Pick<SelectStateProps, 'isLoading' | 'openPosition'>,
    Omit<SelectCommonFunctions<T>, 'onRemoveOption'>,
    SelectKeyboardFunctions {
  searchValue: string; // Current search value
  loadingError: string | null; // Error from async loading
  focusedIndex: number; // Index of focused option
  filteredOptions: Option<T>[]; // Options filtered by search
  selectedOptions: Option<T>[]; // Currently selected options
  setSearchValue: Dispatch<SetStateAction<string>>; // Search value setter
  handleRemoveOption: (option: Option<T>) => void; // Option removal handler
  handleOptionClick: (index: number) => void; // Option click handler
}
