export interface StatusValues {
  error?: boolean | string | null;
  success?: boolean | string | null;
  warning?: boolean | string | null;
}

export interface RequiredStatusValues extends Required<StatusValues> {}
