import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarPedidoComponent } from '../pedidos/asignar-pedido/asignar-pedido.component';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { BuscarProductosComponent } from './productos/buscar-productos/buscar-productos.component';
import { CrearProductosComponent } from './productos/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './productos/editar-productos/editar-productos.component';
import { EliminarProductosComponent } from './productos/eliminar-productos/eliminar-productos.component';

const routes: Routes = [
  {
    path:"crear",
    component: CrearPersonaComponent
  },
  {
    path:"eliminar",
    component: EliminarPersonaComponent
  },
  {
    path:"buscar",
    component: BuscarPersonaComponent
  },
  {
    path:"editar",
    component: EditarPersonaComponent
  },

  //PRODUCTOS
  {
    path:"crear",
    component: CrearProductosComponent
  },
  {
    path:"eliminar",
    component: EliminarProductosComponent
  },
  {
    path:"buscar",
    component: BuscarProductosComponent
  },
  {
    path:"editar",
    component: EditarProductosComponent
  },

  //PEDIDOS
  {
    path:"asignar",
    component: AsignarPedidoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
