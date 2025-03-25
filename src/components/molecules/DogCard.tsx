import { Heart } from 'lucide-react';
import React from 'react';
import { Dog } from '../../api/types/dogTypes';

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default React.memo(function DogCard({ dog, isFavorite, onToggleFavorite }: DogCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-serif font-semibold text-gray-900 dark:text-white truncate">
            {dog.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Breed: {dog.breed}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Age: {dog.age}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Zip: {dog.zip_code}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering map
            onToggleFavorite(dog.id);
          }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </button>
      </div>
    </div>
  );
});