import { AnimatePresence, motion } from 'framer-motion';
import { Dog } from '../../api/types/dogTypes';
import DogCard from '../molecules/DogCard';
import { Button } from '../atoms/Button';

interface MatchModalProps {
  matchedDog: Dog | null;
  favorites: string[];
  setMatchedDog: (dog: Dog | null) => void;
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchedDog,
  favorites,
  setMatchedDog,
  addFavorite,
  removeFavorite,
}) => {
  return (
    <AnimatePresence>
      {matchedDog && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Your Match!</h2>
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
  );
};