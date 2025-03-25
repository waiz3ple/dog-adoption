import React from 'react';
import { useSearch } from '../../api/hooks/useSearch';
import { DogList } from '../organisms/DogList';
import { MapModal } from '../organisms/MapModal';
import { MatchModal } from '../organisms/MatchModal';
import { Pagination } from '../organisms/Pagination';
import { SearchFilters } from '../organisms/SearchFilters';
import { SearchHeader } from '../organisms/SearchHeader';

export const Search: React.FC = () => {
  const {
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
  } = useSearch();

  return (
    <div
      className={`min-h-screen p-8 font-sans transition-colors duration-300 ${
        darkMode
          ? 'dark bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto max-w-7xl relative">
        <SearchHeader
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userCity={userCity}
          handleLogout={handleLogout}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <SearchFilters
            breeds={breeds}
            breedsPending={breedsPending}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            zipCode={zipCode}
            setZipCode={setZipCode}
            showFavoritesOnly={showFavoritesOnly}
            favorites={favorites}
            matchMutation={matchMutation}
            handleFilterChange={handleFilterChange}
            handleAgeFilterApply={handleAgeFilterApply}
            handleZipCodeApply={handleZipCodeApply}
            handleMatch={handleMatch}
            toggleFavoritesFilter={toggleFavoritesFilter}
          />
          <DogList
            isPending={isPending}
            dogsPending={dogsPending}
            dogsError={dogsError}
            dogs={dogs}
            searchResults={searchResults}
            showFavoritesOnly={showFavoritesOnly}
            favorites={favorites}
            setSelectedDog={setSelectedDog}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </div>
        <Pagination
          params={params}
          searchResults={searchResults}
          showFavoritesOnly={showFavoritesOnly}
          isFetching={isFetching}
          handleFilterChange={handleFilterChange}
        />
        <MatchModal
          matchedDog={matchedDog}
          favorites={favorites}
          setMatchedDog={setMatchedDog}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
        {selectedDog && <MapModal dog={selectedDog} onClose={() => setSelectedDog(null)} />}
      </div>
    </div>
  );
};