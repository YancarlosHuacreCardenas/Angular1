import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lista: any[] = [];

  form: any = {
    id: null,
    nombre: '',
    descripcion: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.api.getAll().subscribe({
      next: (res: any[]) => {
        this.lista = res || [];
      },
      error: (err) => {
        console.error('Error cargando registros:', err);
        this.lista = [];
      }
    });
  }

  guardar() {
    const payload = {
      nombre: this.form.nombre,
      descripcion: this.form.descripcion
    };

    if (this.form.id) {
      this.api.update({ ...payload, id: this.form.id }).subscribe({
        next: () => {
          this.reset();
          this.cargar();
        },
        error: (err) => console.error('Error actualizando:', err)
      });
    } else {
      this.api.create(payload).subscribe({
        next: () => {
          this.reset();
          this.cargar();
        },
        error: (err) => console.error('Error creando:', err)
      });
    }
  }

  editar(item: any) {
    this.form = {
      id: item.id ?? item._id,
      nombre: item.nombre || '',
      descripcion: item.descripcion || ''
    };
  }

  eliminar(item: any) {
    const id = item?.id ?? item?._id;
    if (!id) {
      console.error('No se encontró id para eliminar', item);
      return;
    }

    this.api.delete(id).subscribe({
      next: () => this.cargar(),
      error: (err) => console.error('Error eliminando:', err)
    });
  }

  reset() {
    this.form = { id: null, nombre: '', descripcion: '' };
  }
}