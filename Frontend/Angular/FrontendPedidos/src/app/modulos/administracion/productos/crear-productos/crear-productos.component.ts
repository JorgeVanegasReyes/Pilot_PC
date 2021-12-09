import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {

  fgValidador: FormGroup=this.fb.group({
    'nombre': ["",[Validators.required]],
    'descripcion': ["",[Validators.required]],
    'imagen': ["",[Validators.required]],
    'existencia': ["",[Validators.required]],
    'valor_und': ["",[Validators.required]],
    'estado': ["",[Validators.required]],
  });

  constructor(private fb:FormBuilder,
    private servicioProducto:ProductoService,
    private router:Router) { }

  ngOnInit(): void {
  }

  GuardarProducto(){
    let nombre = this.fgValidador.controls['nombre'].value;
    let descripcion = this.fgValidador.controls['descripcion'].value;
    let imagen = this.fgValidador.controls['imagen'].value;
    let existencia = parseInt(this.fgValidador.controls['existencia'].value);
    let valor_und = parseInt(this.fgValidador.controls['valor_und'].value);
    let estado = this.fgValidador.controls['estado'].value;

    let p = new ModeloProducto();
    p.nombre=nombre;
    p.descripcion=descripcion;
    p.imagen=imagen;
    p.existencia=existencia;
    p.valor_und=valor_und;
    p.estado=estado;

    this.servicioProducto.CrearProducto(p).subscribe((datos:ModeloProducto)=>{
      alert("El producto fue creado correctamente");
      this.router.navigate(["/administracion/buscar-productos"]);
    },(error:any)=>{
      alert("Error en el almacenamiento");
    }
    )
  }
}
