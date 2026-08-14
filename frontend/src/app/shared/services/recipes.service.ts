import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants';
import { Recipe, RecipeInput } from '../models';

export interface RecipesFilter {
  search?: string;
  categoryId?: number;
}

@Injectable({ providedIn: 'root' })
export class RecipesService {
  constructor(private readonly http: HttpClient) {}

  findAll(filter: RecipesFilter = {}): Observable<Recipe[]> {
    const params: Record<string, string> = {};

    if (filter.search) {
      params['search'] = filter.search;
    }

    if (filter.categoryId) {
      params['categoryId'] = String(filter.categoryId);
    }

    return this.http.get<Recipe[]>(API_ENDPOINTS.recipes, { params });
  }

  findOne(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${API_ENDPOINTS.recipes}/${id}`);
  }

  create(payload: RecipeInput): Observable<Recipe> {
    return this.http.post<Recipe>(API_ENDPOINTS.recipes, payload);
  }

  update(id: number, payload: RecipeInput): Observable<Recipe> {
    return this.http.put<Recipe>(`${API_ENDPOINTS.recipes}/${id}`, payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.recipes}/${id}`);
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ imageUrl: string }>(
      `${API_ENDPOINTS.recipes}/upload-image`,
      formData,
    );
  }
}
