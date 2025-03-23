import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { dogService } from '../services/dogServices';
import type { Dog, MatchResponse, SearchParams, SearchResponse } from '../types/dogTypes';


export const useBreeds = () =>
  useQuery<string[], Error>({
    queryKey: ['breeds'],
    queryFn: async () => dogService.getBreeds(),
    staleTime: Infinity,
  });


export const useDogSearch = (params: SearchParams) => {
  const stableParams = useMemo(() => params, [JSON.stringify(params)]);

  return useQuery<SearchResponse, Error>({
    queryKey: ['dogs', stableParams],
    queryFn: async () => dogService.searchDogs(stableParams),
    placeholderData: keepPreviousData,
  });
};


export const useFetchDogs = (ids: string[]) =>
  useQuery<Dog[], Error>({
    queryKey: ['dog-details', ids],
    queryFn: async () => dogService.fetchDogs(ids),
    enabled: !!ids.length,
  });


export const useMatch = () =>
  useMutation<MatchResponse, Error, string[]>({
    mutationFn: async (ids) => dogService.getMatch(ids),
  });


