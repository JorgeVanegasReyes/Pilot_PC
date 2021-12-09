import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-productos',
  templateUrl: './eliminar-productos.component.html',
  styleUrls: ['./eliminar-productos.component.css']
})
export class EliminarProductosComponent implements OnInit {

  id:string="";
  
  constructor(private servicioProducto:ProductoService,
    private route:ActivatedRoute,
    private router:Router) { 
      this.id=this.route.snapshot.params["id"];
    }

  ngOnInit(): void {
    this.EliminarProducto();
    this.router.navigate(["/administracion/buscar-productos"]);
  }

  EliminarProducto(){
    this.servicioProducto.EliminarProducto(this.id).subscribe((datos:any)=>{
      alert("El producto fue eliminado correctamente");
      
    },(error:any)=>{
      alert("Error, no se pudo eliminar");
    }
    )
  }

}
