// src/api/types/dogTypes.ts
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: 'breed:asc' | 'breed:desc' | 'name:asc' | 'name:desc' | 'age:asc' | 'age:desc';
}

export interface SearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface MatchResponse {
  match: string;
}

export interface LoginResponse {
    name: string;
    email: string;
}

