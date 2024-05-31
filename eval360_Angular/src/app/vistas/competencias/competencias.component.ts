import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaEscala } from 'src/app/modelos/escalas.interface';
import { ListaCompetencia } from 'src/app/modelos/competencias.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Workbook } from 'exceljs';
import { MatSidenav } from '@angular/material/sidenav';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';
import CustomStore from 'devextreme/data/custom_store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css']
})
export class CompetenciasComponent {
  competencias: ListaCompetencia[] = [];
  competencias2: ListaCompetencia;
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

 editarForm = new FormGroup({
  id: new FormControl(),
  nombre: new FormControl(),
  descripcion: new FormControl(),
  color: new FormControl(),
  activo: new FormControl()
 })

 agregarForm = new FormGroup({
  id: new FormControl(),
  nombre: new FormControl(),
  descripcion: new FormControl(),
  color: new FormControl(),
  activo: new FormControl()
 })

  @ViewChild('sidenav') sidenav: MatSidenav;


  constructor(private api:ApiService, private fb:FormBuilder, private alerta:AlertasService) {

  }

  ngOnInit(): void {
    this.api.getAllCompetencias("ListarCompetencias").subscribe(data =>{
      this.competencias = data;
    })
  }

  toggleSidebar() {
    this.sidebarAbierta = !this.sidebarAbierta;
  }

  Agregar(){
    this.agregarForm = this.fb.group({
      id: [this.competencias.length+1, Validators.required], // Establece el valor por defecto
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      color: ['', Validators.required],
      activo: [false] // Valor por defecto para el campo checkbox
    });
    this.popup2Visible = true
  }

  guardar(id:any){
    this.api.getCompetencia(id).subscribe(data =>{
      this.competencias2 = data;
      const escalaId = this.competencias2.id;
      this.editarForm.setValue({
        id:escalaId,
        nombre:this.competencias2.nombre,
        descripcion:this.competencias2.descripcion,
        color:this.competencias2.color,
        activo:this.competencias2.activo
      })
    })
    this.popupVisible = true;
  }  

  postForm(form:Partial<ListaCompetencia>){
    const formWithDefaultValues: ListaCompetencia = {
      ...form,
      nombre: form.nombre,
    };
    console.log(form);
    this.api.putCompetencia(formWithDefaultValues, formWithDefaultValues.id).subscribe(data => {
      if(data){
        this.popupVisible = false;
        this.ngOnInit()
        this.alerta.showSucces('Competencia actualizada','Hecho');
      }else{
        this.popupVisible = false;
        this.ngOnInit()
        this.alerta.showError('Error al actualizar competencia','Error');
      }
    }, error =>{
      this.popup2Visible = false;
      this.alerta.showError('Error al actualizar competencia', 'Error');
  });
  }

  postForm2(form:Partial<ListaCompetencia>){
    const formWithDefaultValues: ListaCompetencia = {
      ...form,
      nombre: form.nombre,
    };
    console.log(form);
    this.api.postCompetencia(formWithDefaultValues).subscribe(data => {
      if(data){
        this.popup2Visible = false;
        this.ngOnInit()
        this.alerta.showSucces('Competencia agregada','Hecho');
      }else{
        this.popup2Visible = false;
        this.ngOnInit()
        this.alerta.showError('Error al agregar competencia','Error');
      }
    }, error =>{
      this.popup2Visible = false;
      this.alerta.showError('Error al agregar competencia', 'Error');
  });
  }

  eliminar(id:any){
    this.registroAEliminar = id;
    this.deleteVisible = true;
  }

  confirmarEliminacion() {
  this.api.getCompetencia(this.registroAEliminar).subscribe(data =>{
    console.log(data);
  })
  this.api.deleteCompetencia(this.registroAEliminar).subscribe(data => {
    console.log(data)
    if(data==null){
      this.popup2Visible = false;
      this.ngOnInit()
      this.alerta.showSucces('Datos eliminados','Hecho');
    }else{
      this.popup2Visible = false;
      this.ngOnInit()
      this.alerta.showError('Error al eliminar datos','Error');
    }
  }, error =>{
    this.popup2Visible = false;
    this.alerta.showError('Error al agregar escala', 'Error');
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
    const worksheet = workbook.addWorksheet('competencias');

    exportDataGrid({
      component: e.component,
      worksheet,
      customizeCell: function(options){
        let{ gridCell, excelCell} = options;
      }
    }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer: BlobPart) {
            saveAs(new Blob([buffer], { type: 'application/octet-streamapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'ListaCompetencias.xlsx');
        });
    }).then(function() {
        e.component.columnOption('id', 'visible', true);
        e.component.endUpdate();
    });
  }
}
