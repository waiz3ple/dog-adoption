// src/components/MapModal.tsx
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Dog } from '../../api/types/dogTypes';
import { Button } from '../atoms/Button';

interface MapModalProps {
  dog: Dog;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ dog, onClose }) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchCoords = async () => {
      const res = await fetch(
        `https://api.zippopotam.us/us/${dog.zip_code}`
      );
      const data = await res.json();
      if (data.places && data.places[0]) {
        setCoords({
          lat: parseFloat(data.places[0].latitude),
          lng: parseFloat(data.places[0].longitude),
        });
      }
    };
    fetchCoords();
  }, [dog.zip_code]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4">
        <h2 className="text-2xl font-serif font-bold mb-4">{dog.name}'s Location</h2>
        {coords ? (
          <iframe
            width="100%"
            height="300"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.01},${coords.lat - 0.01},${coords.lng + 0.01},${coords.lat + 0.01}&layer=mapnik&marker=${coords.lat},${coords.lng}`}
            className="border-0 rounded-lg"
          />
        ) : (
          <p>Loading map...</p>
        )}
        <Button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Close
        </Button>
      </div>
    </motion.div>
  );
};