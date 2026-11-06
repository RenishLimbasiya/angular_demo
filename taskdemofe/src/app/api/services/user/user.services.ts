import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

export interface UserInput {
  name: string;
  email: string;
  password?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const API_PREFIX = 'http://localhost:3000/api/v1';

export const userServices = {
  getUsers: (http: HttpClient): Observable<ApiResponse<User[]>> =>
    http.get<ApiResponse<User[]>>(`${API_PREFIX}/user`),

  createUser: (http: HttpClient, user: UserInput): Observable<ApiResponse<User>> =>
    http.post<ApiResponse<User>>(`${API_PREFIX}/user`, user),

  updateUser: (http: HttpClient, id: string, user: Partial<UserInput>): Observable<ApiResponse<User>> =>
    http.patch<ApiResponse<User>>(`${API_PREFIX}/user/${encodeURIComponent(id)}`, user),
};
