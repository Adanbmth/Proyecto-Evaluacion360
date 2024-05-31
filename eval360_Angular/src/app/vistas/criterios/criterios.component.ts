import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaCompetencia } from 'src/app/modelos/competencias.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Workbook } from 'exceljs';
import { MatSidenav } from '@angular/material/sidenav';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ListaCriterio } from 'src/app/modelos/criterios.interface';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent {
  criterios: ListaCriterio[] = [];
  competencias: ListaCompetencia[] = [];
  criterios2: ListaCriterio;
  selectedItemKeys: any[] = [];
  showNavButtons = true;
  showInfo = true;
  popupVisible = false;
  popup2Visible = false;
  deleteVisible = false;
  guardarButton: Record<string, unknown>;
  cancelarButton: Record<string, unknown>;
  positionOf: string;
  registroAEliminar: number;
  sidebarAbierta: boolean = false;
  showDragIcons = true;
  collapsed = false;
  groupContinuesMessage="";
  groupContinuedMessage="";
  n: number = 0;

   editarForm = new FormGroup({
    id: new FormControl(),
    nombreCompetencia: new FormControl(),
    orden: new FormControl(),
    nombre: new FormControl(),
    descripcion: new FormControl(),
    activo: new FormControl()
   })
  
   agregarForm = new FormGroup({
    id: new FormControl(),
    nombreCompetencia: new FormControl(),
    orden: new FormControl(),
    nombre: new FormControl(),
    descripcion: new FormControl(),
    activo: new FormControl()
   })

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private api:ApiService, private fb:FormBuilder, private alerta:AlertasService) {

  }

  contentReady = (e: DxDataGridTypes.ContentReadyEvent) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['Actitudes']);
    }
  };
  
  // onReorder(event: any){
  //   console.log(event);
  //   if (event.items && event.fromIndex !== event.toIndex) {
  //     // Realiza la reordenación solo si event.items está definido y los índices de origen y destino son diferentes
  //     const movedItem = event.items[event.fromIndex];
  //     event.items.splice(event.fromIndex, 1);
  //     event.items.splice(event.toIndex, 0, movedItem);
  //   }
  // }

  toggleSidebar() {
    this.sidebarAbierta = !this.sidebarAbierta;
  }
  
  Agregar(){
    this.agregarForm = this.fb.group({
      id: [this.criterios.length+1, Validators.required], // Establece el valor por defecto
      nombreCompetencia: ['', Validators.required],
      orden: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      activo: [false] // Valor por defecto para el campo checkbox
    });
    this.popup2Visible = true
  }
  
  ngOnInit(): void {
    this.api.getAllCriterios("ListarCriterios").subscribe(data =>{
      this.criterios = data;
    })
    this.api.getAllCompetencias("ListarCompetencias").subscribe(data =>{
      this.competencias = data;
    })
  }
  
  guardar(id:any){
    this.api.getCriterio(id).subscribe(data =>{
      this.criterios2 = data;
      const escalaId = this.criterios2.id;
      this.editarForm.setValue({
        id:escalaId,
        nombreCompetencia:this.criterios2.nombreCompetencia,
        orden:this.criterios2.orden,
        nombre:this.criterios2.nombre,
        descripcion:this.criterios2.descripcion,
        activo:this.criterios2.activo
      })
    })
    this.popupVisible = true;
  }  

  postForm(form:Partial<ListaCriterio>){
    const formWithDefaultValues: ListaCriterio = {
      ...form,
      nombre: form.nombre,
    };
    console.log(form);
    this.api.putCriterio(formWithDefaultValues, formWithDefaultValues.id).subscribe(data => {
      if(data){
        this.ngOnInit()
        this.alerta.showSucces('Criterio actualizado','Hecho');
      }else{
        this.ngOnInit()
        this.alerta.showError('Error al actualizar criterio','Error');
      }
    }, error =>{
      this.alerta.showError('Error al actualizar criterio', 'Error');
    });
    this.popupVisible = false;
  }

  postForm2(form:Partial<ListaCompetencia>){
    const formWithDefaultValues: ListaCompetencia = {
      ...form,
      nombre: form.nombre,
    };
    console.log(form);
    this.api.postCriterio(formWithDefaultValues).subscribe(data => {
      if(data){
        this.ngOnInit()
        this.alerta.showSucces('Criterio agregado','Hecho');
      }else{
        this.ngOnInit()
        this.alerta.showError('Error al agregar criterio','Error');
      }
    }, error =>{
      this.alerta.showError('Error al agregar criterio', 'Error');
    });
    this.popup2Visible = false;
  }

  eliminar(id:any){
    this.registroAEliminar = id;
    this.deleteVisible = true;
  }

  confirmarEliminacion() {
    this.api.getCriterio(this.registroAEliminar).subscribe(data =>{
      console.log(data);
    })
    this.api.deleteCriterio(this.registroAEliminar).subscribe(data => {
      if(data==null){
        this.ngOnInit()
        this.alerta.showSucces('Datos eliminados','Hecho');
      }else{
        this.ngOnInit()
        this.alerta.showError('Error al eliminar datos','Error');
      }
    }, error =>{
      this.alerta.showError('Error al eliminar datos', 'Error');
  });
    this.deleteVisible = false; // Oculta el popup
  }
  
  cancelar(){
    this.popup2Visible = false;
    this.popupVisible = false;
    this.deleteVisible = false;
  }

  onExporting(e:any) {
    e.component.beginUpdate();
    e.component.columnOption('id', 'visible', true);
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('criterios');

    exportDataGrid({
      component: e.component,
      worksheet,
      customizeCell: function(options){
        let{ gridCell, excelCell} = options;
      }
    }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer: BlobPart) {
            saveAs(new Blob([buffer], { type: 'application/octet-streamapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'ListaCriterios.xlsx');
        });
    }).then(function() {
        e.component.columnOption('id', 'visible', true);
        e.component.endUpdate();
    });
  }

//   searchText: string = '';
//   criterio: string[] = [];
//   filtro: string[] = this.criterio;

//   onSearchChange() {
//     this.filtro= this.criterio.filter(item =>
//       item.toLowerCase().includes(this.searchText.toLowerCase())
//     );
//   }
}
