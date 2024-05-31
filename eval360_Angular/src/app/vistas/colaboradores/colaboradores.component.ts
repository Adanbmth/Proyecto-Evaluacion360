import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ListaColaborador } from 'src/app/modelos/colaboradores.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';
import * as saveAs from 'file-saver';
import { ListaHorario } from 'src/app/modelos/horarios.interface';
import { ListaEstudio } from 'src/app/modelos/estudios.interface';
import { ListaPuesto } from 'src/app/modelos/puestos.interface';
import { log } from 'node:console';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent {
  selectedItemKeys: any[] = [];
  showNavButtons = true;
  showInfo = true;
  guardarButton: Record<string, unknown>;
  cancelarButton: Record<string, unknown>;
  positionOf: string;
  registroAEliminar: number;
  sidebarAbierta: boolean = false;
  selectedIndex = 0;

// Datasets
  colaboradores: ListaColaborador[] = [];
  colaboradores2: ListaColaborador;

  horarios: ListaHorario[] = [];
  horariosLista: ListaHorario[] = [];

  puestos: ListaPuesto[] = [];
  puestosLista: ListaPuesto[] = [];

  estudios: ListaEstudio[] = [];
  estudiosLista: ListaEstudio[] = [];
  estudioSeleccionado: ListaEstudio;



// Popups visibiliadad
  EditarColaborador = false;
  EditarEstudio = false;
  AgregarHorario = false;
  AgregarColaborador = false;
  AgregarEstudio = false;
  AgregarPuesto = false;

// Popups para eliminar registros
  deleteColaborador = false;
  deleteHorario = false;
  deleteEstudio = false;
  deletePuesto = false;

  // Forms para editar de las 2 secciones

  editarColaborador = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    apellidoPaterno: new FormControl(),
    apellidoMaterno: new FormControl(),
    fechaNacimiento: new FormControl(),
    genero: new FormControl(),
    curp: new FormControl(),
    rfc: new FormControl(),
    numeroNomina: new FormControl(),
    estadoCivil: new FormControl(),
    nacionalidad: new FormControl(),
    nss: new FormControl(),
    tipoSangre: new FormControl(),
    correo: new FormControl(),
    correoInstitucional: new FormControl(),
    celular: new FormControl(),
    telefono: new FormControl(),
    codigoPostal: new FormControl(),
    estado: new FormControl(),
    ciudad: new FormControl(),
    colonia: new FormControl(),
    calle: new FormControl(),
    noExterior: new FormControl(),
    noInterior: new FormControl(),
    usuarioERP: new FormControl(),
    horarioId: new FormControl(),
    estudioId: new FormControl(),
    puestoId: new FormControl(),
    activo: new FormControl()
  });

  editarEstudio = new FormGroup({
    id: new FormControl(),
    nivelEstudio: new FormControl(),
    titulo: new FormControl(),
    institucion: new FormControl(),
    estatus: new FormControl(),
    cedula: new FormControl(),
    colaborador: new FormControl()
  });

// Forms para agregar de las 4 secciones

  agregarColaborador = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    apellidoPaterno: new FormControl(),
    apellidoMaterno: new FormControl(),
    fechaNacimiento: new FormControl(),
    genero: new FormControl(),
    curp: new FormControl(),
    rfc: new FormControl(),
    numeroNomina: new FormControl(),
    estadoCivil: new FormControl(),
    nacionalidad: new FormControl(),
    nss: new FormControl(),
    tipoSangre: new FormControl(),
    correo: new FormControl(),
    correoInstitucional: new FormControl(),
    celular: new FormControl(),
    telefono: new FormControl(),
    codigoPostal: new FormControl(),
    estado: new FormControl(),
    ciudad: new FormControl(),
    colonia: new FormControl(),
    calle: new FormControl(),
    noExterior: new FormControl(),
    noInterior: new FormControl(),
    usuarioERP: new FormControl(),
    horarioId: new FormControl(),
    estudioId: new FormControl(),
    puestoId: new FormControl(),
    activo: new FormControl()
  });

  agregarHorario = new FormGroup({
    id: new FormControl(),
    ciclo: new FormControl(),
    semestre: new FormControl(),
    lunEnt: new FormControl(),
    lunSal: new FormControl(),
    marEnt: new FormControl(),
    marSal: new FormControl(),
    mieEnt: new FormControl(),
    mieSal: new FormControl(),
    jueEnt: new FormControl(),
    jueSal: new FormControl(),
    vieEnt: new FormControl(),
    vieSal: new FormControl(),
    ultimaMod: new FormControl(),
    modificadoPor: new FormControl(),
    colaborador: new FormControl()
  });

  agregarEstudio = new FormGroup({
    id: new FormControl(),
    nivelEstudio: new FormControl(),
    titulo: new FormControl(),
    institucion: new FormControl(),
    estatus: new FormControl(),
    cedula: new FormControl(),
    colaborador: new FormControl()
  });

  agregarPuesto = new FormGroup({
    id: new FormControl(),
    puestoNombre: new FormControl(),
    puestoSuperior: new FormControl(),
    fechaAsignacion: new FormControl(),
    asignadoPor: new FormControl(),
    antiguedad: new FormControl(),
    colaborador: new FormControl()
  })

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private api:ApiService, private fb:FormBuilder, private alerta:AlertasService) {}

  toggleSidebar() {
    this.sidebarAbierta = !this.sidebarAbierta;
  }

  ngOnInit(): void {
    this.api.getAllColaboradores("ListarColaboradores").subscribe(data =>{
      this.colaboradores = data;
    })
    this.api.getAllHorarios("ListarHorarios").subscribe(data1 => {
      this.horariosLista = data1;
    })
    this.api.getAllEstudios("ListarEstudios").subscribe(data2 => {
      this.estudiosLista = data2;
    })
    this.api.getAllPuestos("ListarPuestos").subscribe(data3 => {
      this.puestosLista = data3;
    })
  }

// Seccion para agregar los 4 sectores del colaborador -----------------------------------------------

// Agregar colaborador--------------------------------------------------------------------------------
  colaboradorForm(){
    this.agregarColaborador = this.fb.group({
      id: [this.colaboradores.length+1, Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      curp: ['', Validators.required],
      rfc: ['', Validators.required],
      numeroNomina: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      nss: ['', Validators.required],
      tipoSangre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      correoInstitucional: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      telefono: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      estado: ['', Validators.required],
      ciudad: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      noExterior: ['', Validators.required],
      noInterior: ['', Validators.required],
      usuarioERP: [false, Validators.required],
      horarioId: [this.colaboradores.length+1, Validators.required],
      estudioId: [this.colaboradores.length+1, Validators.required],
      puestoId: [this.colaboradores.length+1, Validators.required],
      activo: [false, Validators.required]
    });
    this.AgregarColaborador = true;
  }

  
// Agregar horario ---------------------------------------------------------------------------------------------------
  horarioForm(){
    this.agregarHorario = this.fb.group({
      id: [this.horariosLista.length + 1, Validators.required],
      ciclo: ['', Validators.required],
      semestre: ['', Validators.required],
      lunEnt: [null, Validators.required],
      lunSal: [null, Validators.required],
      marEnt: [null, Validators.required],
      marSal: [null, Validators.required],
      mieEnt: [null, Validators.required],
      mieSal: [null, Validators.required],
      jueEnt: [null, Validators.required],
      jueSal: [null, Validators.required],
      vieEnt: [null, Validators.required],
      vieSal: [null, Validators.required],
      ultimaMod: ['', Validators.required],
      modificadoPor: ['', Validators.required],
      colaborador: [this.colaboradores.length, Validators.required]
    });
    this.AgregarHorario = true;
  }

  
// Agregar estudios -------------------------------------------------------------------------------------------------
  estudioForm(){
    this.agregarEstudio = this.fb.group({
      id: [this.estudiosLista.length + 1, Validators.required],
      nivelEstudio: ['', Validators.required],
      titulo: ['', Validators.required],
      institucion: ['', Validators.required],
      estatus: ['', Validators.required],
      cedula: ['', Validators.required],
      colaborador: [this.colaboradores.length, Validators.required]
    });
    this.AgregarEstudio = true;
  }
  

// Agregar puestos -----------------------------------------------------------------------------------------------------
  puestoForm(){
    this.agregarPuesto = this.fb.group({
      id: [this.puestosLista.length + 1, Validators.required],
      puestoNombre: ['', Validators.required],
      puestoSuperior: ['', Validators.required],
      fechaAsignacion: ['', Validators.required],
      asignadoPor: ['', Validators.required],
      antiguedad: ['', Validators.required],
      colaborador: [this.colaboradores.length, Validators.required]
    });
    this.AgregarPuesto = true;
  }


// Metodos para hacer el post para agregar los 4 sectores del colaborador---------------------------------------------------------

nuevoColaborador(form:Partial<ListaColaborador>){
  const formWithDefaultValues: ListaColaborador = {
    ...form,
    nombre: form.nombre,
    fechaNacimiento: form.fechaNacimiento ? new Date(form.fechaNacimiento).toISOString() : null
  };
  console.log(formWithDefaultValues);
  this.api.postColaborador(formWithDefaultValues).subscribe(data => {
    this.api.getHorariosPorColaborador(formWithDefaultValues.id).subscribe(data2 =>{
      this.horarios = data2;
    })
    this.api.getEstudiosPorColaborador(formWithDefaultValues.id).subscribe(data3 =>{
      this.estudios = data3;
    })
    this.api.getPuestosPorColaborador(formWithDefaultValues.id).subscribe(data4 =>{
      this.puestos = data4;
    })
    if(data){
      this.nextTab();
      this.ngOnInit();
    }else{
      this.AgregarColaborador = false;
      this.ngOnInit();
      this.alerta.showError('Error al agregar colaborador','Error');
    }
  }, error =>{
    this.AgregarColaborador = false;
    this.alerta.showError('Error al agregar colaborador', 'Error');
  });
}

nuevoHorario(form:Partial<ListaHorario>){
  const formWithDefaultValues: ListaHorario = {
    ...form,
    ciclo: form.ciclo,
    ultimaMod: form.ultimaMod ? new Date(form.ultimaMod).toISOString(): null
  };
  console.log(form);
  this.api.postHorario(formWithDefaultValues).subscribe(data => {
    if(data){
      this.api.getHorariosPorColaborador(form.colaborador).subscribe(data2 =>{
        this.horarios = data2;
      })
      this.AgregarHorario = false;
      this.ngOnInit();
      this.alerta.showSucces('Horario agregado','Hecho');
    }else{
      this.AgregarHorario = false;
      this.alerta.showError('Error al agregar horario','Error');
    }
  }, error =>{
    this.AgregarHorario = false;
    this.alerta.showError('Error al agregar horario', 'Error');
  });
}

nuevoEstudio(form:Partial<ListaEstudio>){
  const formWithDefaultValues: ListaEstudio = {
    ...form,
    nivelEstudio: form.nivelEstudio,
  };
  this.api.postEstudio(formWithDefaultValues).subscribe(data => {
    if(data){
      this.api.getEstudiosPorColaborador(form.colaborador).subscribe(data2 =>{
        this.estudios = data2;
      })
      this.ngOnInit();
      this.AgregarEstudio = false;
      this.alerta.showSucces('Estudio agregado','Hecho');
    }else{
      this.AgregarEstudio = false;
      this.alerta.showError('Error al agregar estudio','Error');
    }
  }, error =>{
    this.AgregarEstudio = false;
    this.alerta.showError('Error al agregar estudio', 'Error');
  });
}

nuevoPuesto(form:Partial<ListaPuesto>){
  const formWithDefaultValues: ListaPuesto = {
    ...form,
    puestoNombre: form.puestoNombre,
    fechaAsignacion: form.fechaAsignacion ? new Date(form.fechaAsignacion).toISOString(): null
  };
  this.api.postPuesto(formWithDefaultValues).subscribe(data => {
    if(data){
      this.api.getPuestosPorColaborador(form.colaborador).subscribe(data2 =>{
        this.puestos = data2;
      })
      this.ngOnInit();
      this.AgregarPuesto = false;
      this.alerta.showSucces('Puesto agregado','Hecho');
    }else{
      this.AgregarPuesto = false;
      this.alerta.showError('Error al agregar puesto','Error');
    }
  }, error =>{
    this.AgregarPuesto = false;
    this.alerta.showError('Error al agregar puesto', 'Error');
  });
}



// Seccion para editar los 2 sectores de los colaboradores

  colaboradorEditar(id:any){
    console.log(id);
    this.api.getColaborador(id).subscribe(data =>{
      this.colaboradores2 = data;
      let colaboradorId = this.colaboradores2.id
      this.editarColaborador.setValue({
        id: colaboradorId,
        nombre: this.colaboradores2.nombre,
        apellidoPaterno: this.colaboradores2.apellidoPaterno,
        apellidoMaterno: this.colaboradores2.apellidoMaterno,
        fechaNacimiento: this.colaboradores2.fechaNacimiento,
        genero: this.colaboradores2.genero,
        curp: this.colaboradores2.curp,
        rfc: this.colaboradores2.rfc,
        numeroNomina: this.colaboradores2.numeroNomina,
        estadoCivil: this.colaboradores2.estadoCivil,
        nacionalidad: this.colaboradores2.nacionalidad,
        nss: this.colaboradores2.nss,
        tipoSangre: this.colaboradores2.tipoSangre,
        correo: this.colaboradores2.correo,
        correoInstitucional: this.colaboradores2.correoInstitucional,
        celular: this.colaboradores2.celular,
        telefono: this.colaboradores2.telefono,
        codigoPostal: this.colaboradores2.codigoPostal,
        estado: this.colaboradores2.estado,
        ciudad: this.colaboradores2.ciudad,
        colonia: this.colaboradores2.colonia,
        calle: this.colaboradores2.calle,
        noExterior: this.colaboradores2.noExterior,
        noInterior: this.colaboradores2.noInterior,
        usuarioERP: this.colaboradores2.usuarioERP,
        horarioId: this.colaboradores2.horarioId,
        estudioId: this.colaboradores2.estudioId,
        puestoId: this.colaboradores2.puestoId,
        activo: this.colaboradores2.activo
      });
    })
    this.ngOnInit();
    this.EditarColaborador = true;
  }

  estudioEditar(id:any){
    this.api.getEstudio(id).subscribe(data =>{
      this.estudioSeleccionado = data;
      this.editarEstudio.setValue({
        id: this.estudioSeleccionado.id,
        nivelEstudio: this.estudioSeleccionado.nivelEstudio,
        titulo: this.estudioSeleccionado.titulo,
        institucion: this.estudioSeleccionado.institucion,
        estatus: this.estudioSeleccionado.estatus,
        cedula: this.estudioSeleccionado.cedula,
        colaborador: this.estudioSeleccionado.colaborador
      });
    })
    this.EditarEstudio = true;
  }
  
// Metodos para hacer el put para actualizar los 2 sectores de colaboradores--------------------------------------------------

  colaboradorPut(form:Partial<ListaColaborador>){
    const formWithDefaultValues: ListaColaborador = {
      ...form,
      nombre: form.nombre,
      fechaNacimiento: form.fechaNacimiento ? new Date(form.fechaNacimiento).toISOString() : null
    };
    console.log(form);
    this.api.putColaborador(formWithDefaultValues, formWithDefaultValues.id).subscribe(data => {
      if(data){
        this.ngOnInit()
        this.api.getHorariosPorColaborador(formWithDefaultValues.horarioId).subscribe(data2 =>{
          this.horarios = data2;
        })
        this.api.getEstudiosPorColaborador(formWithDefaultValues.estudioId).subscribe(data3 =>{
          this.estudios = data3;
        })
        this.api.getPuestosPorColaborador(formWithDefaultValues.puestoId).subscribe(data4 =>{
          this.puestos = data4;
        })
        this.nextTab()
      }else{
        this.EditarColaborador = false;
        this.ngOnInit()
        this.alerta.showError('Error al actualizar colaborador','Error');
      }
    }, error =>{
      this.EditarColaborador = false;
      this.alerta.showError('Error al actualizar colaborador', 'Error');
    });
  }

  estudioPut(form:Partial<ListaEstudio>){
    const formWithDefaultValues: ListaEstudio = {
      ...form,
      nivelEstudio: form.nivelEstudio,
    };
    this.api.putEstudio(formWithDefaultValues, formWithDefaultValues.id).subscribe(data => {
      if(data){
        this.api.getEstudiosPorColaborador(formWithDefaultValues.colaborador).subscribe(data2 =>{
          this.estudios = data2;
        })
        this.EditarEstudio = false;
        this.alerta.showSucces('estudio actualizado','Hecho');
      }else{
        this.EditarEstudio = false;
        this.alerta.showError('Error al actualizar estudio','Error');
      }
    }, error =>{
      this.alerta.showError('Error al actualizar estudio', 'Error');
    });
  }


// Metodos para eliminar los registros-----------------------------------------------------------------------

// Eliminar colaborador

  eliminarColaborador(id:any){
    this.registroAEliminar = id;
    console.log(id);
    this.deleteColaborador = true;
  }
  
  // Eliminar horario
  
  eliminarHorario(id:any){
    this.registroAEliminar = id;
    this.deleteHorario = true;
  }


  // Eliminar estudio

  eliminarEstudio(id:any){
    this.registroAEliminar = id;
    this.deleteEstudio = true;
  }


  // Eliminar puesto

  eliminarPuesto(id:any){
    this.registroAEliminar = id;
    this.deletePuesto = true;
  }

  // Opcion Cancelar

  cancelarEliminar(){
    this.deleteHorario = false;
    this.deleteEstudio = false;
    this.deletePuesto = false;
  }

  cancelarAgregar(){
    this.AgregarHorario = false;
    this.AgregarEstudio = false;
    this.AgregarPuesto = false;
  }

  cancelarEditar(){
    this.EditarEstudio = false;
  }

  cancelarPrinc(){
    this.deleteColaborador = false;
    this.EditarColaborador = false;
    this.AgregarColaborador = false;
    this.selectedIndex = 0;
  }

  // popup para confirmar la eliminación
  
  confirmarEliminacion(popup: String) {
    switch(popup) {
      case 'deleteColaborador':
        this.api.deleteColaborador(this.registroAEliminar).subscribe(data => {
          console.log(data);
          if (data == null) {
            this.ngOnInit();
            this.alerta.showSucces('Datos eliminados', 'Hecho');
          } else {
            this.ngOnInit();
            this.alerta.showError('Error al eliminar datos', 'Error');
          }
        }, error =>{
          this.alerta.showError('Error al eliminar datos', 'Error');
        });
        this.deleteColaborador = false;
        break;
        case 'deleteHorario':
          this.api.deleteHorario(this.registroAEliminar).subscribe(data => {
            console.log(data);
            if (data == null) {
              this.ngOnInit();
              this.alerta.showSucces('Datos eliminados', 'Hecho');
            } else {
              this.ngOnInit();
              this.alerta.showError('Error al eliminar datos', 'Error');
            }
          }, error =>{
            this.alerta.showError('Error al eliminar datos', 'Error');
          });
          this.deleteHorario = false;
          break;
        case 'deleteEstudio':
          this.api.deleteEstudio(this.registroAEliminar).subscribe(data => {
            console.log(data);
            if (data == null) {
              this.ngOnInit();
              this.alerta.showSucces('Datos eliminados', 'Hecho');
            } else {
              this.ngOnInit();
              this.alerta.showError('Error al eliminar datos', 'Error');
            }
          }, error =>{
            this.alerta.showError('Error al eliminar datos', 'Error');
          });
          this.deleteEstudio = false;
          break;
        case 'deletePuesto':
          this.api.deletePuesto(this.registroAEliminar).subscribe(data => {
            console.log(data);
            if (data == null) {
              this.ngOnInit();
              this.alerta.showSucces('Datos eliminados', 'Hecho');
            } else {
              this.ngOnInit();
              this.alerta.showError('Error al eliminar datos', 'Error');
            }
          }, error =>{
            this.alerta.showError('Error al eliminar datos', 'Error');
          });
          this.deletePuesto = false;
          break;
    }

  }
  
  // Metodo para exportar---------------------------------------------------------------------------------------------

  onExporting(e:any) {
    e.component.beginUpdate();
    e.component.columnOption('id', 'visible', true);
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('colaboradores');

    exportDataGrid({
      component: e.component,
      worksheet,
      customizeCell: function(options){
        let{ gridCell, excelCell} = options;
      }
    }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer: BlobPart) {
            saveAs(new Blob([buffer], { type: 'application/octet-streamapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'ListaColaboradores.xlsx');
        });
    }).then(function() {
        e.component.columnOption('id', 'visible', true);
        e.component.endUpdate();
    });
  }

  nextTab() {
    if (this.selectedIndex < 4) {
      this.selectedIndex += 1;
      console.log(this.selectedIndex);
      if(this.selectedIndex >=4)
        this.selectedIndex = 0;
    }
  }
}



