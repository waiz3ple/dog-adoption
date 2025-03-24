import React from 'react';
import { Dog } from '../../api/types/dogTypes';
import { Button } from '../atoms/Button';

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default React.memo(function DogCard({ dog, isFavorite, onToggleFavorite }: DogCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-xl font-serif font-semibold text-gray-900 dark:text-white truncate">
          {dog.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Breed: {dog.breed}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Age: {dog.age}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Zip: {dog.zip_code}</p>
        <Button
          variant={isFavorite ? 'outline' : 'primary'}
          onClick={() => onToggleFavorite(dog.id)}
          className={`mt-4 w-full rounded-full ${
            isFavorite
              ? 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
      </div>
    </div>
  );
});