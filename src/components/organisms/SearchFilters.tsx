import { Heart } from 'lucide-react';
import { Range } from 'react-range';
import { Button } from '../atoms/Button';
import { useMatch } from '../../api/hooks/useDog'; 
import { Input } from '../atoms/Input';
import { SearchParams } from '../../api/types/dogTypes';

interface SearchFiltersProps {
  breeds: string[] | undefined;
  breedsPending: boolean;
  ageRange: number[];
  setAgeRange: (values: number[]) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
  showFavoritesOnly: boolean;
  favorites: string[];
  matchMutation: ReturnType<typeof useMatch>;
  handleFilterChange: (key: keyof SearchParams, value: any) => void;
  handleAgeFilterApply: () => void;
  handleZipCodeApply: () => void;
  handleMatch: () => void;
  toggleFavoritesFilter: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  breeds,
  breedsPending,
  ageRange,
  setAgeRange,
  zipCode,
  setZipCode,
  showFavoritesOnly,
  favorites,
  matchMutation,
  handleFilterChange,
  handleAgeFilterApply,
  handleZipCodeApply,
  handleMatch,
  toggleFavoritesFilter,
}) => {
  return (
    <aside className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Breed</label>
        <select
          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          onChange={(e) =>
            handleFilterChange('breeds', e.target.value ? [e.target.value] : undefined)
          }
        >
          <option value="">All Breeds</option>
          {breedsPending ? (
            <option>Loading...</option>
          ) : (
            breeds?.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))
          )}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <select
          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option value="breed:asc">Breed A-Z</option>
          <option value="breed:desc">Breed Z-A</option>
          <option value="age:asc">Age (Youngest)</option>
          <option value="age:desc">Age (Oldest)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Zip Code</label>
        <Input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <Button
          onClick={handleZipCodeApply}
          variant="secondary"
          className="mt-2 w-full bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Apply Zip
        </Button>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Age Range</label>
        <Range
          step={1}
          min={0}
          max={20}
          values={ageRange}
          onChange={setAgeRange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"
              style={{ ...props.style }}
            >
              <div
                className="h-2 bg-blue-500 rounded-lg"
                style={{
                  position: 'absolute',
                  left: `${(ageRange[0] / 20) * 100}%`,
                  width: `${((ageRange[1] - ageRange[0]) / 20) * 100}%`,
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className={`h-5 w-5 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-purple-500'} shadow-md focus:outline-none`}
              style={{ ...props.style }}
            />
          )}
        />
        <div className="flex justify-between text-sm mt-2">
          <span>{ageRange[0]}</span>
          <span>{ageRange[1]}</span>
        </div>
        <Button
          onClick={handleAgeFilterApply}
          variant="secondary"
          className="mt-2 w-full bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Apply Age
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          onClick={handleMatch}
          disabled={favorites.length === 0 || matchMutation.isPending}
          className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
        >
          {matchMutation.isPending ? 'Finding...' : 'Find Match'}
        </Button>
        <Button
          onClick={toggleFavoritesFilter}
          variant="outline"
          className="p-2 rounded-full"
          aria-label="Toggle favorites filter"
        >
          <Heart
            className={`w-6 h-6 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </Button>
      </div>
    </aside>
  );
};