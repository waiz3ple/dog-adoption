import axiosClient from '../clients/axiosClient';
import { Dog, MatchResponse, SearchParams, SearchResponse } from '../types/dogTypes';

export const dogService = {
    getBreeds: () => axiosClient.get<string[]>('/dogs/breeds').then((res) => res.data),
    searchDogs: (params: SearchParams) => axiosClient.get<SearchResponse>('/dogs/search', { params }).then((res) => res.data),
    fetchDogs: (ids: string[]) => axiosClient.post<Dog[]>('/dogs', ids).then((res) => res.data),
    getMatch: (ids: string[]) => axiosClient.post<MatchResponse>('/dogs/match', ids).then((res) => res.data),
};