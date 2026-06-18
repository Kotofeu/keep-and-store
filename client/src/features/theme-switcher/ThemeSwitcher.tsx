'use client';
import { FC } from 'react';
import { useAppTheme } from '@shared/hooks/useAppTheme';
import { useIsMounted } from '@shared/hooks/useIsMounted';

export const ThemeSwitcher: FC = () => {
  const isMounted = useIsMounted();
  const { baseTheme, setBaseTheme, isDark, toggleDark } = useAppTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <select
        value={baseTheme}
        onChange={(e) => setBaseTheme(e.target.value as 'standard' | 'notepad')}
        className="bg-bg text-foreground rounded border px-3 py-2"
      >
        <option value="standard">Standard</option>
        <option value="notepad">Notepad</option>
      </select>

      <button
        onClick={toggleDark}
        className={`bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover rounded px-4 py-2 transition`}
      >
        {isDark ? '☀️ Светлая' : '🌙 Тёмная'}
      </button>
    </div>
  );
};
