import { useEffect } from 'react';
import useThemeStore from '@/_stores/theme.store';

const ThemeProvider = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      root.classList.add(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      );
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return null;
};

export default ThemeProvider;
