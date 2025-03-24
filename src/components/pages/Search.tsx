import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useBreeds, useDogSearch, useFetchDogs, useMatch } from '../../api/hooks/useDog';
import { Dog, SearchParams } from '../../api/types/dogTypes';
import { useFavoritesStore } from '../../store/useFavorite';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

const DogCard = React.lazy(() => import('../../components/molecules/DogCard'));

export const Search = () => {
  const [params, setParams] = useState<SearchParams>({
    size: 25,
    from: 0,
    sort: 'breed:asc',
  });
  const [ageRange, setAgeRange] = useState<{ min: number; max: number }>({ min: 0, max: 20 });
  const [darkMode, setDarkMode] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

 /*  const navigate = useNavigate(); */
 /*  const { logout } = useAuthStore(); */
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const { data: breeds, isPending: breedsPending } = useBreeds();
  const { data: searchResults, isPending, isFetching, isPlaceholderData } = useDogSearch(params);
  const { data: dogs, isPending: dogsPending } = useFetchDogs(searchResults?.resultIds || []);
  const matchMutation = useMatch();

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleFilterChange = (key: keyof SearchParams, value: any) => {
    setParams((prev) => ({ ...prev, [key]: value, from: 0 }));
  };

  const handleAgeFilterApply = () => {
    handleFilterChange('ageMin', ageRange.min);
    handleFilterChange('ageMax', ageRange.max);
  };

  const handleMatch = async () => {
    if (favorites.length) {
      matchMutation.mutate(favorites, {
        onSuccess: async (data) => {
          const matchedDogData = await useFetchDogs([data.match]).data;
          setMatchedDog(matchedDogData?.[0] || null);
        },
        onError: (error: Error) => alert(`Match failed: ${error.message}`),
      });
    }
  };

/*   const handleLogout = async () => {
    await logout();
    navigate('/');
  }; */

  // Masonry breakpoints (columns based on screen width)
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div
      className={`min-h-screen p-6 font-sans transition-colors duration-300 ${
        darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold tracking-tight">
            Discover Your Perfect Companion
          </h1>
          <div className="space-x-4">
            <Button
              onClick={() => setDarkMode(!darkMode)}
              variant="outline"
              className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? 'Light' : 'Dark'}
            </Button>
            <Button
             /*  onClick={handleLogout} */
              variant="outline"
              className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </Button>
          </div>
        </header>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Breed</label>
              <select
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="breed:asc">Breed A-Z</option>
                <option value="breed:desc">Breed Z-A</option>
                <option value="age:asc">Age (Youngest)</option>
                <option value="age:desc">Age (Oldest)</option>
              </select>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age Range</label>
                <Input
                  type="number"
                  placeholder="Min Age"
                  value={ageRange.min}
                  onChange={(e) =>
                    setAgeRange({ ...ageRange, min: Number(e.target.value) })
                  }
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Max Age"
                  value={ageRange.max}
                  onChange={(e) =>
                    setAgeRange({ ...ageRange, max: Number(e.target.value) })
                  }
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <Button
                onClick={handleAgeFilterApply}
                variant="secondary"
                className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-full transition-colors"
              >
                Apply Age Filter
              </Button>
            </div>
            <Button
              onClick={handleMatch}
              disabled={favorites.length === 0 || matchMutation.isPending}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              {matchMutation.isPending ? 'Finding Match...' : 'Find My Match'}
            </Button>
          </aside>

          {/* Dog List with Masonry Layout */}
          <main className="col-span-3">
            {isPending ? (
              <p className="text-center text-lg">Loading...</p>
            ) : (
              <Suspense fallback={<p className="text-center text-lg">Loading dogs...</p>}>
                {dogsPending ? (
                  <p className="text-center text-lg">Loading dog details...</p>
                ) : (
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex -ml-6"
                    columnClassName="my-masonry-grid_column pl-6"
                  >
                    {dogs?.map((dog) => (
                      <motion.div
                        key={dog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DogCard
                          dog={dog}
                          isFavorite={favorites.includes(dog.id)}
                          onToggleFavorite={(dogId) =>
                            favorites.includes(dogId)
                              ? removeFavorite(dogId)
                              : addFavorite(dogId)
                          }
                        />
                      </motion.div>
                    ))}
                  </Masonry>
                )}
              </Suspense>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing {dogs?.length || 0} of {searchResults?.total || 0}
              </span>
              <div className="space-x-4">
                <Button
                  onClick={() => handleFilterChange('from', (params.from || 0) - 25)}
                  disabled={params.from === 0}
                  variant="outline"
                  className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handleFilterChange('from', (params.from || 0) + 25)}
                  disabled={isPlaceholderData || !searchResults?.next}
                  variant="outline"
                  className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Next
                </Button>
              </div>
              {isFetching && (
                <span className="text-sm text-gray-500 dark:text-gray-400">Fetching...</span>
              )}
            </div>

            {/* Match Reveal */}
            <AnimatePresence>
              {matchedDog && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
                    <h2 className="text-2xl font-serif font-bold mb-6 text-center">
                      Your Perfect Match!
                    </h2>
                    <DogCard
                      dog={matchedDog}
                      isFavorite={favorites.includes(matchedDog.id)}
                      onToggleFavorite={(id) =>
                        favorites.includes(id) ? removeFavorite(id) : addFavorite(id)
                      }
                    />
                    <Button
                      onClick={() => setMatchedDog(null)}
                      className="mt-6 w-full bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                      Close
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};