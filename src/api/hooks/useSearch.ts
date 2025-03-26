import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreeds, useDogSearch, useFetchDogs, useMatch } from '../../api/hooks/useDog';
import { Dog, SearchParams } from '../../api/types/dogTypes';
import { useAuthStore } from '../../store/auth';
import { useFavoritesStore } from '../../store/useFavorite';

export const useSearch = () => {
  const [params, setParams] = useState<SearchParams>({
    size: 27,
    from: 0,
    sort: 'breed:asc',
  });
  const [ageRange, setAgeRange] = useState<number[]>([0, 20]);
  const [darkMode, setDarkMode] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [zipCode, setZipCode] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [matchDogId, setMatchDogId] = useState<string | null>(null); // New state for match refetch

  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const { data: breeds, isPending: breedsPending } = useBreeds();
  const { data: searchResults, isPending, isFetching, refetch } = useDogSearch(params);
  const { data: dogs, isPending: dogsPending, isError: dogsError } = useFetchDogs(
    showFavoritesOnly ? favorites : searchResults?.resultIds || []
  );
  const { data: matchDogData, refetch: refetchMatchDog } = useFetchDogs(
    matchDogId ? [matchDogId] : []
  );
  const matchMutation = useMatch();

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Geolocation with IP fallback
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
              );
              const data = await res.json();
              setUserCity(data.city || 'Unknown');
            },
            (error) => {
              if (error.code === error.PERMISSION_DENIED) {
                console.log('Geolocation permission denied, falling back to IP.');
                fetchCityByIP();
              } else {
                console.error('Geolocation error:', error.message);
                fetchCityByIP();
              }
            },
            { timeout: 1e4 }
          );
        } else {
          console.log('Geolocation not supported, using IP.');
          fetchCityByIP();
        }
      } catch (error) {
        console.error('Geolocation fetch error:', error);
        fetchCityByIP();
      }
    };

    const fetchCityByIP = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        setUserCity(data.city || 'Unknown');
      } catch (error) {
        console.error('IP geolocation error:', error); 
        setUserCity('Unknown');
      }
    };

    fetchUserLocation();
  }, []);

  // Set matched dog when matchDogData updates
  useEffect(() => {
    if (matchDogData && matchDogData.length > 0) {
      setMatchedDog(matchDogData[0]);
      setMatchDogId(null); // Reset after fetching
    }
  }, [matchDogData]);

  const handleFilterChange = (key: keyof SearchParams, value: any) => {
    setParams((prev) => {
      const newParams = { ...prev, [key]: value, from: key === 'from' ? value : 0 };
      refetch();
      return newParams;
    });
    if (key !== 'from') setShowFavoritesOnly(false);
  };

  const handleAgeFilterApply = () => {
    handleFilterChange('ageMin', ageRange[0]);
    handleFilterChange('ageMax', ageRange[1]);
  };

  const handleZipCodeApply = () => {
    handleFilterChange('zipCodes', zipCode ? [zipCode] : undefined);
  };

  const handleMatch = () => {
    if (favorites.length > 0) {
      matchMutation.mutate(favorites, {
        onSuccess: (data) => {
          setMatchDogId(data.match); // Set the match ID to trigger refetch
          refetchMatchDog();
        },
        onError: (error: Error) => {
          console.error('Match error:', error);
          alert(`Match failed: ${error.message}`);
        },
      });
    } else {
      alert('Please add some dogs to your favorites first!');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly((prev) => !prev);
    if (!showFavoritesOnly) {
      setParams((prev) => ({ ...prev, from: 0 }));
    }
  };

  return {
    params,
    ageRange,
    setAgeRange,
    darkMode,
    setDarkMode,
    matchedDog,
    setMatchedDog,
    zipCode,
    setZipCode,
    userCity,
    showFavoritesOnly,
    selectedDog,
    setSelectedDog,
    breeds,
    breedsPending,
    searchResults,
    isPending,
    isFetching,
    dogs,
    dogsPending,
    dogsError,
    matchMutation,
    handleFilterChange,
    handleAgeFilterApply,
    handleZipCodeApply,
    handleMatch,
    handleLogout,
    toggleFavoritesFilter,
    favorites,
    addFavorite,
    removeFavorite,
  };
};