import { Moon, Sun } from 'lucide-react';
import { Button } from '../atoms/Button';

interface SearchHeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  userCity: string;
  handleLogout: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  darkMode,
  setDarkMode,
  userCity,
  handleLogout,
}) => {
  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-5xl font-serif font-bold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Find Your Soulmate
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {userCity || 'Detecting location...'}
        </span>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          variant="outline"
          className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </Button>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};