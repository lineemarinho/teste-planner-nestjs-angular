import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants';
import { Category, CategoryInput } from '../models';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private readonly http: HttpClient) {}

  findAll(search?: string): Observable<Category[]> {
    return this.http.get<Category[]>(API_ENDPOINTS.categories, {
      params: search ? { search } : {},
    });
  }

  findOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${API_ENDPOINTS.categories}/${id}`);
  }

  create(payload: CategoryInput): Observable<Category> {
    return this.http.post<Category>(API_ENDPOINTS.categories, payload);
  }

  update(id: number, payload: CategoryInput): Observable<Category> {
    return this.http.put<Category>(
      `${API_ENDPOINTS.categories}/${id}`,
      payload,
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.categories}/${id}`);
  }
}
