import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {

  fgValidador: FormGroup=this.fb.group({
    'nombre': ["",[Validators.required]],
    'descripcion': ["",[Validators.required]],
    'imagen': ["",[Validators.required]],
    'existencia': ["",[Validators.required]],
    'valor_und': ["",[Validators.required]],
    'estado': ["",[Validators.required]],
    'id': ["",[Validators.required]]
  })

  id:string="";
  
  constructor(private fb:FormBuilder,
    private servicioProducto:ProductoService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.BuscarProducto();
  }

  EditarProducto(){
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
    p.id=this.id;

    this.servicioProducto.EditarProducto(p).subscribe((datos:ModeloProducto)=>{
      alert("El producto fue editado correctamente");
      this.router.navigate(["/administracion/buscar-productos"]);
    },(error:any)=>{
      alert("Error en la edicion");
    }
    )
  }


  BuscarProducto(){
    this.servicioProducto.ConsultaProductoPorId(this.id).subscribe((datos:ModeloProducto)=>{
      this.fgValidador.controls['nombre'].setValue(datos.nombre);
      this.fgValidador.controls['descripcion'].setValue(datos.descripcion);
      this.fgValidador.controls['imagen'].setValue(datos.imagen);
      this.fgValidador.controls['existencia'].setValue(datos.existencia);
      this.fgValidador.controls['valor_und'].setValue(datos.valor_und);
      this.fgValidador.controls['estado'].setValue(datos.estado);
      this.fgValidador.controls['id'].setValue(datos.id);
    },(error:any)=>{
      alert("El producto no existe");
    })
  }

}
