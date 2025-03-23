import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

interface Credentials {
    name: string;
    email: string;
}

interface LoginResponse {
    status: number
 }
    

export const useLogin = () =>
    useMutation<LoginResponse, Error, Credentials>({
        mutationFn: async (credentials: Credentials) =>
            authService.login(credentials), 
    });