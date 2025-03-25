import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Masonry from 'react-masonry-css';
import { Dog } from '../../api/types/dogTypes';
import DogCard from '../../components/molecules/DogCard';

interface DogListProps {
  isPending: boolean;
  dogsPending: boolean;
  dogsError: boolean;
  dogs: Dog[] | undefined;
  searchResults: { total: number } | undefined;
  showFavoritesOnly: boolean;
  favorites: string[];
  setSelectedDog: (dog: Dog | null) => void;
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
}

export const DogList: React.FC<DogListProps> = ({
  isPending,
  dogsPending,
  dogsError,
  dogs,
  searchResults,
  showFavoritesOnly,
  favorites,
  setSelectedDog,
  addFavorite,
  removeFavorite,
}) => {
  const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };

  return (
    <main className="col-span-3">
      {(isPending || dogsPending) ? (
        <p className="text-center text-lg">Loading...</p>
      ) : !searchResults || (searchResults.total === 0 && !showFavoritesOnly) || (showFavoritesOnly && favorites.length === 0) ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          This page is empty
        </p>
      ) : (
        <Suspense fallback={<p className="text-center text-lg">Loading dogs...</p>}>
          {dogsError || !dogs || dogs.length === 0 ? (
            <p className="text-center text-lg text-gray-500 dark:text-gray-400">
              No such dog info
            </p>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid flex -ml-6"
              columnClassName="my-masonry-grid_column pl-6"
            >
              {dogs.map((dog) => (
                <motion.div
                  key={dog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedDog(dog)}
                >
                  <DogCard
                    dog={dog}
                    isFavorite={favorites.includes(dog.id)}
                    onToggleFavorite={(dogId) =>
                      favorites.includes(dogId) ? removeFavorite(dogId) : addFavorite(dogId)
                    }
                  />
                </motion.div>
              ))}
            </Masonry>
          )}
        </Suspense>
      )}
    </main>
  );
};