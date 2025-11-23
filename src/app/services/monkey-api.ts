import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateMonkeyPayload,
  CreateSpeciesPayload,
  EntityQueryParams,
  Monkey,
  Species,
  UpdateMonkeyPayload,
  UpdateSpeciesPayload
} from '../models/monkey.model';

@Injectable({ providedIn: 'root' })
export class MonkeyApiService {
  private readonly apiBaseUrl = "http://localhost:3000";

  constructor(private readonly http: HttpClient) {}

  getMonkeys(params?: EntityQueryParams): Observable<Monkey[]> {
    return this.http.get<Monkey[]>(`${this.apiBaseUrl}/monkeys`, { params: this.buildParams(params) });
  }

  getMonkeyById(id: number): Observable<Monkey> {
    return this.http.get<Monkey>(`${this.apiBaseUrl}/monkeys/${id}`);
  }

  createMonkey(payload: CreateMonkeyPayload): Observable<Monkey> {
    return this.http.post<Monkey>(`${this.apiBaseUrl}/monkeys`, payload);
  }

  updateMonkey(id: number, payload: UpdateMonkeyPayload): Observable<Monkey> {
    return this.http.put<Monkey>(`${this.apiBaseUrl}/monkeys/${id}`, payload);
  }

  getSpecies(params?: EntityQueryParams): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiBaseUrl}/species`, { params: this.buildParams(params) });
  }

  getSpeciesById(id: number): Observable<Species> {
    return this.http.get<Species>(`${this.apiBaseUrl}/species/${id}`);
  }

  createSpecies(payload: CreateSpeciesPayload): Observable<Species> {
    return this.http.post<Species>(`${this.apiBaseUrl}/species`, payload);
  }

  updateSpecies(id: number, payload: UpdateSpeciesPayload): Observable<Species> {
    return this.http.put<Species>(`${this.apiBaseUrl}/species/${id}`, payload);
  }

  deleteSpecies(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/species/${id}`);
  }

  deletedMonkey(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/monkeys/${id}`);
  }

  private buildParams(params?: EntityQueryParams): HttpParams {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return httpParams;
  }
}
