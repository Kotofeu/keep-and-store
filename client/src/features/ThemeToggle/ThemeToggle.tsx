'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@shared/hooks/useTheme';
import { ThemeVariant, ThemeMode } from '@shared/types/theme';

export const ThemeToggle = () => {
  const { theme, setVariant, toggleMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <select
        value={theme.variant}
        onChange={(e) => setVariant(e.target.value as ThemeVariant)}
        className="btn-secondary rounded px-3 py-2"
        aria-label="Выбрать тему оформления"
      >
        <option value={ThemeVariant.STANDARD}>Стандартная</option>
        <option value={ThemeVariant.NOTEPAD}>Блокнот</option>
      </select>

      <button
        onClick={toggleMode}
        className="btn-primary rounded px-4 py-2"
        aria-label={theme.mode === ThemeMode.LIGHT ? 'Переключить на тёмную' : 'Переключить на светлую'}
      >
        {theme.mode === ThemeMode.LIGHT ? '🌙 Тёмная' : '☀️ Светлая'}
      </button>

      <span className="text-foreground/70 text-sm">
        {theme.variant === ThemeVariant.STANDARD ? 'Стандарт' : 'Блокнот'} /{' '}
        {theme.mode === ThemeMode.LIGHT ? 'светлая' : 'тёмная'}
      </span>
    </div>
  );
};
