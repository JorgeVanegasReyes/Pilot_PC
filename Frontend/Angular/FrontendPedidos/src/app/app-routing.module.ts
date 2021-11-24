import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './plantilla/inicio/inicio.component';
import { ErrorComponent } from './plantilla/error/error.component';

const routes: Routes = [
  {
    path:"inicio",
    component:InicioComponent
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/inicio"
  },

  //para mencionar los hijos de la carpeta modulos donde esta administracion , productos, pedidos
  {
    path:"seguridad",
    loadChildren:()=>import("./modulos/seguridad/seguridad.module").then(x=>x.SeguridadModule)
  },
  {
    path:"administracion",
    loadChildren:()=>import("./modulos/administracion/administracion.module").then(x=>x.AdministracionModule)
  },
  {
    path:"pedidos",
    loadChildren:()=>import("./modulos/pedidos/pedidos.module").then(x=>x.PedidosModule)
  },
  

  // para evitar la ruta comodin - cuando se escribe mal la url
  {
    path:"**",
    component:ErrorComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
