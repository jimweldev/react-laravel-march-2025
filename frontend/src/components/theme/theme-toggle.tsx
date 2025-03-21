import { FaMoon, FaSun } from 'react-icons/fa6';
import useThemeStore from '@/_stores/theme.store';
import { Button } from '../ui/button';

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  );
};

export default ThemeToggle;
