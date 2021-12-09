import { Component, OnInit } from '@angular/core';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {

  ListaProductos:ModeloProducto[]=[];

  constructor(private servicioProducto: ProductoService) { }

  ngOnInit(): void {
    this.ObtenerListadoProductos();
  }

  ObtenerListadoProductos(){
    this.servicioProducto.ObtenerRegistros().subscribe ((datos:ModeloProducto[])=>{
      this.ListaProductos = datos;
    })
  }

}
