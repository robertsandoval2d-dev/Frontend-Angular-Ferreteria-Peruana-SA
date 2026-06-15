import { Component, inject, OnInit, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TrabajadorCreateRequest } from '../../models/request/trabajador-create-request';
import { SucursalListResponse, LineasProducto } from '../../models/response/sucursal-list-response';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../../core/services/toast.service';

import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-registro-usuario',
  imports: [ReactiveFormsModule, CommonModule, NgbTooltipModule],
  templateUrl: './form-registro-usuario.html',
  styleUrl: './form-registro-usuario.scss',
})

export class FormRegistroUsuario implements OnInit{
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private usuariosService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  listaSucursales: SucursalListResponse[] = [];
  listaLineas: LineasProducto[] = [];

  registroForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)]],
    mail: ['', [Validators.required, Validators.email]],
    rol: ['', Validators.required],
    tiendaId: [''],
    lineaId: ['']
  })

  @ViewChild('tNombre') tooltipNombre!: NgbTooltip;
  @ViewChild('tDni') tooltipDni!: NgbTooltip;
  @ViewChild('tUsername') tooltipUsername!: NgbTooltip;
  @ViewChild('tPassword') tooltipPassword!: NgbTooltip;
  @ViewChild('tEmail') tooltipEmail!: NgbTooltip;
  @ViewChild('tRol') tooltipRol!: NgbTooltip;
  @ViewChild('tTienda') tooltipTienda!: NgbTooltip;
  @ViewChild('tLinea') tooltipLinea!: NgbTooltip;

  formEnviado: boolean = false;
  ngOnInit() {
    this.registroForm.get('rol')?.valueChanges.subscribe(rolSeleccionado => {
      this.formEnviado = false;
      const storeControl = this.registroForm.get('tiendaId');
      const lineControl = this.registroForm.get('lineaId');

      if (rolSeleccionado === 'JEFE_DE_LINEA') {
        storeControl?.setValue('');
        lineControl?.setValue('');
        storeControl?.setValidators(Validators.required);
        lineControl?.setValidators(Validators.required);
      } 
      else if (rolSeleccionado === 'ALMACENERO' || rolSeleccionado === 'ADMINISTRADOR_DE_TIENDA') {
        storeControl?.setValue('');
        storeControl?.setValidators(Validators.required);
        lineControl?.clearValidators();
        lineControl?.setValue('');
      }
      else if (rolSeleccionado === 'ADMIN') {
        storeControl?.clearValidators();
        lineControl?.clearValidators();
        
        storeControl?.setValue('');
        lineControl?.setValue('');
      }

      storeControl?.updateValueAndValidity();
      lineControl?.updateValueAndValidity();

      storeControl?.markAsUntouched();
      lineControl?.markAsUntouched();
    });

    this.usuariosService.listarSucursales().subscribe({
      next:(ListResponse) => {
        this.listaSucursales = ListResponse;
        console.log('Llegaron las sucursales: ', ListResponse);
      },
      error: (ListError) => {
        console.log('No llegaron PIPIPI, mensaje: ', ListError);
      }
    });

    this.registroForm.get('tiendaId')?.valueChanges.subscribe(tiendaIdSeleccionada => {
      this.formEnviado = false;
      this.registroForm.get('lineaId')?.markAsUntouched();
      const sucursalEncontrada = this.listaSucursales.find(sucursal => sucursal.tiendaId === Number(tiendaIdSeleccionada));

      this.listaLineas = sucursalEncontrada?.lineasProducto ?? [];
      
      this.registroForm.get('lineaId')?.setValue('');
    });

    this.registroForm.get('nombre')?.valueChanges.subscribe(() => {
      if (this.tooltipNombre?.isOpen()) {this.tooltipNombre.close();}
    });

    this.registroForm.get('dni')?.valueChanges.subscribe(() => {
      if (this.tooltipDni?.isOpen()) {this.tooltipDni.close();}
    });

    this.registroForm.get('username')?.valueChanges.subscribe(() => {
      if (this.tooltipUsername?.isOpen()) {this.tooltipUsername.close();}
    });

    this.registroForm.get('password')?.valueChanges.subscribe(() => {
      if (this.tooltipPassword?.isOpen()) {this.tooltipPassword.close();}
    });

    this.registroForm.get('mail')?.valueChanges.subscribe(() => {
      if (this.tooltipEmail?.isOpen()) {this.tooltipEmail.close();}
    });

    this.registroForm.get('rol')?.valueChanges.subscribe(() => {
      if (this.tooltipRol?.isOpen()) {this.tooltipRol.close();}
    });

    this.registroForm.get('tiendaId')?.valueChanges.subscribe(() => {
      if (this.tooltipTienda?.isOpen()) {this.tooltipTienda.close();}
    });

    this.registroForm.get('lineaId')?.valueChanges.subscribe(() => {
      if (this.tooltipLinea?.isOpen()) {this.tooltipLinea.close();}
    });
  }

  guardarUsuario() {
    this.formEnviado = true;
    if (this.registroForm.valid){
      const requestParaSpringBoot: TrabajadorCreateRequest = this.registroForm.value;
      console.log('Datos enviados a SpringBoot', this.registroForm.value)

      this.usuariosService.registrarTrabajador(requestParaSpringBoot).subscribe({
        next: (respuestaBackend) => {
          console.log('Respuesta Backend: ', respuestaBackend);
          this.toastService.success('¡Trabajador registrado correctamente!');
          this.registroForm.reset();
          this.usuariosService.notifyRefresh();
          this.onCerrar.emit();
        },
        error: (errorBackend) => {
          console.error('El backend rechazó la petición:', errorBackend);
          this.toastService.error(errorBackend.error.message);
          this.cdr.markForCheck();
        }
      });

    } 
    else{
      console.log('Faltan campos por llenar');
      this.registroForm.markAllAsTouched();
      if (this.registroForm.get('nombre')?.invalid) {this.tooltipNombre.open();}
      if (this.registroForm.get('dni')?.invalid) {this.tooltipDni.open();}
      if (this.registroForm.get('username')?.invalid) {this.tooltipUsername.open();}
      if (this.registroForm.get('password')?.invalid) {this.tooltipPassword.open();}
      if (this.registroForm.get('mail')?.invalid) {this.tooltipEmail.open();}
      if (this.registroForm.get('rol')?.invalid) {this.tooltipRol.open();}
      if (this.registroForm.get('tiendaId')?.invalid) {this.tooltipTienda?.open();}
      if (this.registroForm.get('lineaId')?.invalid) {this.tooltipLinea?.open();}
    }
  }

  @Output() onCerrar = new EventEmitter<void>();

  cancelarRegistro() {
    this.onCerrar.emit();
  }
}
