import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://44.215.83.52:8080/api/productos';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todos
  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔹 Crear
  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // 🔹 Actualizar
  update(data: any) {
    const id = data.id ?? data._id;
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // 🔹 Eliminar
  delete(id: string | number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}