import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { EscalasComponent } from './vistas/escalas/escalas.component';
import { CompetenciasComponent } from './vistas/competencias/competencias.component';
import { CriteriosComponent } from './vistas/criterios/criterios.component';
import { ColaboradoresComponent } from './vistas/colaboradores/colaboradores.component';


const routes: Routes = [
  {path:'', redirectTo:'escalas', pathMatch:'full'},
  {path:'escalas', component:EscalasComponent},
  {path:'competencias', component:CompetenciasComponent},
  {path:'criterios', component:CriteriosComponent},
  {path:'colaboradores', component:ColaboradoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [EscalasComponent,CompetenciasComponent,CriteriosComponent,ColaboradoresComponent]
