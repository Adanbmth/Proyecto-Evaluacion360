import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EscalasComponent } from './escalas.component';
import { ListaEscala } from 'src/app/modelos/escalas.interface';
import { of } from 'rxjs';
import { ApiService } from 'src/app/servicios/api/api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'chai';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('EscalasComponent', () => {
    let component: EscalasComponent;
    let fixture: ComponentFixture<EscalasComponent>;
    let apiService: jasmine.SpyObj<ApiService>;
    let formBuilder: FormBuilder;
  
    beforeEach(async(() => {
      // Crea un spy para ApiService
      const apiSpy = jasmine.createSpyObj('ApiService', ['getAllEscalas', 'getEscala', 'putEscala', 'postEscala', 'deleteEscala']);
  
      TestBed.configureTestingModule({
        declarations: [EscalasComponent],
        imports: [ReactiveFormsModule],
        providers: [
          { provide: ApiService, useValue: apiSpy },
          FormBuilder
        ]
      }).compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(EscalasComponent);
      component = fixture.componentInstance;
      apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
      formBuilder = TestBed.inject(FormBuilder);
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy(); 
    });
  
    it('should fetch escalas on ngOnInit', () => {
      const mockData = [{ id: 1, opcion: 'Opcion 1', descripcion: 'Descripción 1', valor: 1, icono: 'Icono 1', activo: true }];
  
      // Simula la respuesta del servicio
      apiService.getAllEscalas.and.returnValue(of(mockData));
  
      component.ngOnInit();
  
      expect(apiService.getAllEscalas).toHaveBeenCalled();
      expect(component.escalas).equal(mockData);
    });
  
    it('should add form controls on Agregar', () => {
      const expectedId = 2; // Esperamos que el id sea la longitud de escalas más 1
      const expectedFormValue = {
        id: expectedId,
        opcion: '',
        descripcion: '',
        valor: '',
        icono: '',
        activo: false
      };
  
      component.escalas = [{ id: 1, opcion: 'Opcion 1', descripcion: 'Descripción 1', valor: 1, icono: 1, activo: true }];
  
      component.Agregar();
  
      expect(component.agregarForm.value).equal(expectedFormValue);
    });
  }
