import axiosClient from '../clients/axiosClient';

export const authService = {
  login: (credentials: { name: string; email: string }) =>
    axiosClient.post('/auth/login', credentials),
  logout: () => axiosClient.post('/auth/logout', {}),
}
