import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isModalOpen = false;
  fecha: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (isOpen) {
      const date = new Date();
      const dia = String(date.getDate()).padStart(2, '0');
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const anio = date.getFullYear();
      const horas = String(date.getHours()).padStart(2, '0');
      const minutos = String(date.getMinutes()).padStart(2, '0');
      this.fecha = `${dia}/${mes}/${anio} ${horas}:${minutos}`;
    }
  }

  title: string = "";
  description: string = "";
  image: string = "";
  info: any[] = [];

  constructor() { }

  ngOnInit(): void {
    Camera.requestPermissions();
  }

  imagenParaMostrar: string = "";
  imagenTomada: any;
  toma: boolean = false;

  async getPicture() {
    this.toma = false;
    this.imagenTomada = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    if (this.imagenTomada) {
      this.toma = true;
      this.imagenParaMostrar = this.imagenTomada.webPath;
    }
  }

  agregarFoto() {
    if (this.toma && this.title.trim() !== "" && this.description.trim() !== "") {
      this.info.push({
        titulo: this.title,
        descripcion: this.description,
        imagen: this.imagenParaMostrar,
        fecha: this.fecha
      });
      this.isModalOpen = false;
      // Limpia los campos después de agregar la foto
      this.title = "";
      this.description = "";
      this.imagenParaMostrar = "";
    }
  }
}
