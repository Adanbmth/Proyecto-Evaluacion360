import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ListaCompetencia } from 'src/app/modelos/competencias.interface';
import { ListaEscala } from 'src/app/modelos/escalas.interface';
import { ListaCriterio } from 'src/app/modelos/criterios.interface';
import { ListaColaborador } from 'src/app/modelos/colaboradores.interface';
import { ListaHorario } from 'src/app/modelos/horarios.interface';
import { ListaEstudio } from 'src/app/modelos/estudios.interface';
import { ListaPuesto } from 'src/app/modelos/puestos.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://localhost:7084/";

  constructor(private http:HttpClient) { }

  getAllEscalas(page:string):Observable<ListaEscala[]>{
    let direccion = this.url + page;
    return this.http.get<ListaEscala[]>(direccion);
  }

  getEscala(id:any):Observable<ListaEscala>{
    let direccion = this.url + "BuscarEscala/"+ id;
    return this.http.get<ListaEscala>(direccion);
  }

  putEscala(form:ListaEscala, id:any):Observable<boolean>{
    let direccion = this.url + "EditarEscala/"+id;
    return this.http.put<boolean>(direccion, form);
  }

  deleteEscala(id:any):Observable<boolean>{
    let direccion = this.url + "EliminarEscala/"+id;
    let Options = {
      headers: new HttpHeaders({
        'Conten-type': 'application/json'
      }),
      body:from
    }
    return this.http.delete<boolean>(direccion, Options);
  }

  postEscala(form:ListaEscala):Observable<boolean>{
    let direccion = this.url + "AgregarEscala";
    return this.http.post<boolean>(direccion, form);
  }

//-------------------------------------------------------Competencias--------------------------------------------------------------------------
  getAllCompetencias(page:string):Observable<ListaCompetencia[]>{
    let direccion = this.url + page;
    return this.http.get<ListaCompetencia[]>(direccion);
  }
  
  getCompetencia(id:any):Observable<ListaCompetencia>{
    let direccion = this.url + "BuscarCompetencia/"+ id;
    return this.http.get<ListaCompetencia>(direccion);
  }
  
  putCompetencia(form:ListaCompetencia, id:any):Observable<boolean>{
    let direccion = this.url + "EditarCompetencia/"+id;
    return this.http.put<boolean>(direccion, form);
  }
  
  deleteCompetencia(id:any):Observable<boolean>{
    let direccion = this.url + "EliminarCompetencia/"+id;
    let Options = {
      headers: new HttpHeaders({
        'Conten-type': 'application/json'
      }),
      body:from
    }
    return this.http.delete<boolean>(direccion, Options);
  }
  
  postCompetencia(form:ListaCompetencia):Observable<boolean>{
    let direccion = this.url + "AgregarCompetencia";
    return this.http.post<boolean>(direccion, form);
  }

//---------------------------------------------------------Criterios----------------------------------------------------------

getAllCriterios(page:string):Observable<ListaCriterio[]>{
  let direccion = this.url + page;
  return this.http.get<ListaCriterio[]>(direccion);
}

getCriterio(id:any):Observable<ListaCriterio>{
  let direccion = this.url + "BuscarCriterio/"+ id;
  return this.http.get<ListaCriterio>(direccion);
}

putCriterio(form:ListaCriterio, id:any):Observable<boolean>{
  let direccion = this.url + "EditarCriterio/"+id;
  return this.http.put<boolean>(direccion, form);
}

deleteCriterio(id:any):Observable<boolean>{
  let direccion = this.url + "EliminarCriterio/"+id;
  let Options = {
    headers: new HttpHeaders({
      'Conten-type': 'application/json'
    }),
    body:from
  }
  return this.http.delete<boolean>(direccion, Options);
}

postCriterio(form:ListaCriterio):Observable<boolean>{
  let direccion = this.url + "AgregarCriterio";
  return this.http.post<boolean>(direccion, form);
}

// -------------------------------------------------------Colaboradores----------------------------------------------------------

getAllColaboradores(page:string):Observable<ListaColaborador[]>{
  let direccion = this.url + page;
  return this.http.get<ListaColaborador[]>(direccion);
}

getColaborador(id:any):Observable<ListaColaborador>{
  let direccion = this.url + "BuscarColaborador/"+ id;
  return this.http.get<ListaColaborador>(direccion);
}

putColaborador(form:ListaColaborador, id:any):Observable<boolean>{
  let direccion = this.url + "EditarColaborador/"+id;
  return this.http.put<boolean>(direccion, form);
}

deleteColaborador(id:any):Observable<boolean>{
  let direccion = this.url + "EliminarColaborador/"+id;
  let Options = {
    headers: new HttpHeaders({
      'Conten-type': 'application/json'
    }),
    body:from
  }
  return this.http.delete<boolean>(direccion, Options);
}

postColaborador(form:ListaColaborador):Observable<boolean>{
  let direccion = this.url + "AgregarColaborador";
  return this.http.post<boolean>(direccion, form);
}


// ----------------------------------------------------------Horarios----------------------------------------------------------

getAllHorarios(page:string):Observable<ListaHorario[]>{
  let direccion = this.url + page;
  return this.http.get<ListaHorario[]>(direccion);
}

getHorario(id:any):Observable<ListaHorario>{
  let direccion = this.url + "BuscarHorario/"+ id;
  return this.http.get<ListaHorario>(direccion);
}

getHorariosPorColaborador(colaborador: any): Observable<ListaHorario[]> {
  let direccion = this.url + "HorariosPorColaborador/" + colaborador;
  return this.http.get<ListaHorario[]>(direccion);
}

putHorario(form:ListaHorario, id:any):Observable<boolean>{
  let direccion = this.url + "EditarHorario/"+id;
  return this.http.put<boolean>(direccion, form);
}

deleteHorario(id:any):Observable<boolean>{
  let direccion = this.url + "EliminarHorario/"+id;
  let Options = {
    headers: new HttpHeaders({
      'Conten-type': 'application/json'
    }),
    body:from
  }
  return this.http.delete<boolean>(direccion, Options);
}

postHorario(form:ListaHorario):Observable<boolean>{
  let direccion = this.url + "AgregarHorario";
  return this.http.post<boolean>(direccion, form);
}

// -----------------------------------------------------------Estudios---------------------------------------------------------

getAllEstudios(page:string):Observable<ListaEstudio[]>{
  let direccion = this.url + page;
  return this.http.get<ListaEstudio[]>(direccion);
}

getEstudio(id:any):Observable<ListaEstudio>{
  let direccion = this.url + "BuscarEstudio/"+ id;
  return this.http.get<ListaEstudio>(direccion);
}

getEstudiosPorColaborador(colaborador: any): Observable<ListaEstudio[]> {
  let direccion = this.url + "EstudiosPorColaborador/" + colaborador;
  return this.http.get<ListaEstudio[]>(direccion);
}

putEstudio(form:ListaEstudio, id:any):Observable<boolean>{
  let direccion = this.url + "EditarEstudio/"+id;
  return this.http.put<boolean>(direccion, form);
}

deleteEstudio(id:any):Observable<boolean>{
  let direccion = this.url + "EliminarEstudio/"+id;
  let Options = {
    headers: new HttpHeaders({
      'Conten-type': 'application/json'
    }),
    body:from
  }
  return this.http.delete<boolean>(direccion, Options);
}

postEstudio(form:ListaEstudio):Observable<boolean>{
  let direccion = this.url + "AgregarEstudio";
  return this.http.post<boolean>(direccion, form);
}

// ----------------------------------------------------------Puestos--------------------------------------------------------

getAllPuestos(page:string):Observable<ListaPuesto[]>{
  let direccion = this.url + page;
  return this.http.get<ListaPuesto[]>(direccion);
}

getPuesto(id:any):Observable<ListaPuesto>{
  let direccion = this.url + "BuscarPuesto/"+ id;
  return this.http.get<ListaPuesto>(direccion);
}

getPuestosPorColaborador(colaborador: any): Observable<ListaPuesto[]> {
  let direccion = this.url + "PuestosPorColaborador/" + colaborador;
  return this.http.get<ListaPuesto[]>(direccion);
}

putPuesto(form:ListaPuesto, id:any):Observable<boolean>{
  let direccion = this.url + "EditarPuesto/"+id;
  return this.http.put<boolean>(direccion, form);
}

deletePuesto(id:any):Observable<boolean>{
  let direccion = this.url + "EliminarPuesto/"+id;
  let Options = {
    headers: new HttpHeaders({
      'Conten-type': 'application/json'
    }),
    body:from
  }
  return this.http.delete<boolean>(direccion, Options);
}

postPuesto(form:ListaPuesto):Observable<boolean>{
  let direccion = this.url + "AgregarPuesto";
  return this.http.post<boolean>(direccion, form);
}

}
