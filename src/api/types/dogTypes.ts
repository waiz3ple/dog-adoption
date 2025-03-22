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
    sort?: 'breed:asc' | 'breed:desc';
    size?: number;
    from?: number;
}

export interface SearchResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}