import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaEscala } from 'src/app/modelos/escalas.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Workbook } from 'exceljs';
import { MatSidenav } from '@angular/material/sidenav';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';
import CustomStore from 'devextreme/data/custom_store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { error } from 'console';


@Component({
  selector: 'app-escalas',
  templateUrl: './escalas.component.html',
  styleUrls: ['./escalas.component.css']
})
export class EscalasComponent implements OnInit{
  escalas: ListaEscala[] = [];
  escalas2: ListaEscala;
  selectedItemKeys: any[] = [];
  showNavButtons = true;
  showInfo = true;
  dataSource: CustomStore;
  popupVisible = false;
  popup2Visible = false;
  deleteVisible = false;
  guardarButton: Record<string, unknown>;
  cancelarButton: Record<string, unknown>;
  positionOf: string;
  registroAEliminar: number;
  sidebarAbierta: boolean = false;
  pruebas: ListaEscala;

 editarForm = new FormGroup({
  id: new FormControl(),
  opcion: new FormControl(),
  descripcion: new FormControl(),
  valor: new FormControl(),
  icono: new FormControl(),
  activo: new FormControl()
 })

 agregarForm = new FormGroup({
  id: new FormControl(),
  opcion: new FormControl(),
  descripcion: new FormControl(),
  valor: new FormControl(),
  icono: new FormControl(),
  activo: new FormControl()
 })

  @ViewChild('sidenav') sidenav: MatSidenav;


  constructor(private api:ApiService, private fb:FormBuilder, private alerta:AlertasService) {

  }
  
  toggleSidebar() {
    this.sidebarAbierta = !this.sidebarAbierta;
  }
  
  ngOnInit(): void {
    this.api.getAllEscalas("ListarEscalas").subscribe(data =>{
      this.escalas = data;
    })
  }


  Agregar(){
    this.agregarForm = this.fb.group({
      id: [this.escalas.length+1, Validators.required], // Establece el valor por defecto
      opcion: ['', Validators.required],
      descripcion: ['', Validators.required],
      valor: ['', Validators.required],
      icono: ['', Validators.required],
      activo: [false] // Valor por defecto para el campo checkbox
    });
    this.popup2Visible = true
  }

  guardar(id:any){
    this.api.getEscala(id).subscribe(data =>{
      this.escalas2 = data;
      const escalaId = this.escalas2.id;
      this.editarForm.setValue({
        id:escalaId,
        opcion:this.escalas2.opcion,
        descripcion:this.escalas2.descripcion,
        valor:this.escalas2.valor,
        icono:this.escalas2.icono,
        activo:this.escalas2.activo
      })
    })
    this.popupVisible = true;
  }  

  postForm(form:Partial<ListaEscala>){
    const formWithDefaultValues: ListaEscala = {
      ...form,
      opcion: form.opcion,
    };
    this.api.putEscala(formWithDefaultValues, formWithDefaultValues.id).subscribe(data => {
      this.pruebas = formWithDefaultValues;
      console.log(this.pruebas);
      if(data){
        this.popupVisible = false;
        this.ngOnInit()
        this.alerta.showSucces('Escala actualizada','Hecho');
      }else{
        this.popupVisible = false;
        this.ngOnInit()
        this.alerta.showError('Error al actualizar escala','Error');
      }
    }, error =>{
      this.popupVisible = false;
      this.alerta.showError('Error al actualizar escala', 'Error');
  });
  }

  postForm2(form:Partial<ListaEscala>){
    const formWithDefaultValues: ListaEscala = {
      ...form,
      opcion: form.opcion,
    };
    console.log(form);
    this.api.postEscala(formWithDefaultValues).subscribe(data => {
      if(data){
        this.popup2Visible = false;
        this.ngOnInit()
        this.alerta.showSucces('Escala agregada','Hecho');
      }else{
        this.popup2Visible = false;
        this.ngOnInit()
        this.alerta.showError('Error al agregar escala','Error');
      }
    }, error =>{
        this.popup2Visible = false;
        this.alerta.showError('Error al agregar escala', 'Error');
    });
  }

  
  eliminar(id:any){
    this.registroAEliminar = id;
    this.deleteVisible = true;
  }

  confirmarEliminacion() {
    this.api.getEscala(this.registroAEliminar).subscribe(data => {
      console.log(data);
    })
    this.api.deleteEscala(this.registroAEliminar).subscribe(data => {
        if(data==null){
          this.ngOnInit()
          this.alerta.showSucces('Datos eliminados','Hecho');
        }else{
          this.ngOnInit()
          this.alerta.showError('Error al eliminar datos','Error');
        }
    }, error =>{
        this.alerta.showError('Error al eliminar escala', 'Error');
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
    const worksheet = workbook.addWorksheet('escalas');

    exportDataGrid({
      component: e.component,
      worksheet,
      customizeCell: function(options){
        let{ gridCell, excelCell} = options;
      }
    }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer: BlobPart) {
            saveAs(new Blob([buffer], { type: 'application/octet-streamapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'ListaEscalas.xlsx');
        });
    }).then(function() {
        e.component.columnOption('id', 'visible', true);
        e.component.endUpdate();
    });
  }
}

