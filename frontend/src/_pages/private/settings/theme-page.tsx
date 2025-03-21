import { FaMoon, FaSun } from 'react-icons/fa6';
import useThemeStore from '@/_stores/theme.store';
import PageHeader from '@/components/texts/page-header';
import { cn } from '@/lib/utils';

const ThemePage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div>
      <div className="mb-3">
        <PageHeader>Theme</PageHeader>
      </div>

      <div className="flex flex-wrap gap-3">
        <div
          className={cn(
            'user-select-none flex h-20 w-40 cursor-pointer items-center justify-center rounded-lg border-2 border-yellow-400 bg-yellow-100 text-yellow-600',
          )}
          onClick={() => setTheme('light')}
        >
          <div className={`flex flex-col items-center justify-center gap-2`}>
            <FaSun
              className={`transition-all duration-300 ${theme === 'light' ? 'scale-200' : ''}`}
            />
            <p
              className={`text-sm font-semibold ${theme === 'light' ? 'underline' : ''}`}
            >
              Light
            </p>
          </div>
        </div>
        <div
          className={cn(
            'user-select-none flex h-20 w-40 cursor-pointer items-center justify-center rounded-lg border-2 border-purple-500 bg-purple-800 text-purple-200',
          )}
          onClick={() => setTheme('dark')}
        >
          <div className={`flex flex-col items-center justify-center gap-2`}>
            <FaMoon
              className={`transition-all duration-300 ${theme === 'dark' ? 'scale-200' : ''}`}
            />
            <p
              className={`text-sm font-semibold ${theme === 'dark' ? 'underline' : ''}`}
            >
              Dark
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
