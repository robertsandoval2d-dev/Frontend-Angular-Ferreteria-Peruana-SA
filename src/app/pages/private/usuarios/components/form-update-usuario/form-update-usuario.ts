import { Component, Output, EventEmitter, inject, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TrabajadorUpdateRequest } from '../../models/request/trabajador-update-request';
import { UserService } from '../../services/user.service';
import { SucursalListResponse, LineasProducto } from '../../models/response/sucursal-list-response';


@Component({
  selector: 'app-form-update-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './form-update-usuario.html',
  styleUrl: './form-update-usuario.scss',
})
export class FormUpdateUsuario implements OnInit{

  private fb = inject(FormBuilder);
  private usuariosService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  listaSucursalesCompleta: SucursalListResponse[] = [];
  listaSucursales: SucursalListResponse[] = [];
  listaLineas: LineasProducto[] = [];

  updateForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    dni: ['', Validators.required],
    tiendaId: [''],
    lineaId: ['']
  });

  @Input() trabajador: any = null;

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trabajador'] && this.trabajador) {
      this.updateForm.patchValue({
        nombre: this.trabajador.nombre,
        dni: this.trabajador.dni,
        tiendaId: this.trabajador.tiendaId ?? '',
        lineaId: this.trabajador.lineaId ?? ''
      }, { emitEvent: false });
      console.log('Llego trabajador: ', this.trabajador);
    }

    const storeControl = this.updateForm.get('tiendaId'); 
    const lineControl = this.updateForm.get('lineaId');  
    if(this.trabajador.rol === 'JEFE_DE_LINEA'){
      storeControl?.setValidators(Validators.required);
      lineControl?.setValidators(Validators.required);
    }
    else if(this.trabajador.rol === 'ADMINISTRADOR_DE_TIENDA' || this.trabajador.rol === 'ALMACENERO')    {
      storeControl?.setValidators(Validators.required);
      
      lineControl?.clearValidators();
      lineControl?.setValue('');
    }
    else if(this.trabajador.rol === 'ADMIN'){
      storeControl?.clearValidators();
      lineControl?.clearValidators();
      storeControl?.setValue('');
      lineControl?.setValue('');
    }
    storeControl?.updateValueAndValidity();
    lineControl?.updateValueAndValidity();  
  }


  ngOnInit(){

    this.usuariosService.listarSucursales().subscribe({
      next:(ListResponse) => {
        this.listaSucursalesCompleta = ListResponse;
        if(this.trabajador?.tiendaId){
          const sucursalEncontrada = this.listaSucursalesCompleta.find(s => s.tiendaId === this.trabajador.tiendaId);
          this.listaLineas = sucursalEncontrada?.lineasProducto.filter(l => l.lineaId !== this.trabajador.lineaId) ?? [];
        }
        this.listaSucursales = this.listaSucursalesCompleta.filter(s => s.tiendaId !== this.trabajador.tiendaId);
        console.log('Mira la lista:', this.listaSucursales);

        console.log('Llegaron las sucursales: ', ListResponse);
        this.cdr.detectChanges();
      },
      error: (ListError) => {
        console.log('No llegaron PIPIPI, mensaje: ', ListError);
      }
    });

    this.updateForm.get('tiendaId')?.valueChanges.subscribe(tiendaSeleccionada => {
      const tiendaIdNumero = Number(tiendaSeleccionada);
      const sucursalEncontrada = this.listaSucursalesCompleta.find(s => s.tiendaId === tiendaIdNumero);

      if (tiendaIdNumero === this.trabajador?.tiendaId) {
        this.listaLineas = sucursalEncontrada?.lineasProducto.filter(l => l.lineaId !== this.trabajador.lineaId) ?? [];
        this.updateForm.get('lineaId')?.setValue(this.trabajador.lineaId);
      } else { 
        this.listaLineas = sucursalEncontrada?.lineasProducto ?? [];
        this.updateForm.get('lineaId')?.setValue('');
      }
    });
  }

  
  updateUsuario() {
    if(this.updateForm.valid){

      const requestUpdateTrabajador : TrabajadorUpdateRequest = this.updateForm.value;
      console.log('Datos enviados: Id', this.trabajador.trabajadorId, 'y el form: ',this.updateForm.value)

      this.usuariosService.modificarTrabajador(this.trabajador.trabajadorId, requestUpdateTrabajador).subscribe({
        next: (Response) => {
          console.log('Update realizado con Éxito', Response);
          this.usuariosService.notifyRefresh();
          this.onCerrarUpdate.emit();
        },
        error: (ResponseError) => {
          console.error('El backend rechazó la petición:', ResponseError);
        }
      })

    }

  }



  @Output() onCerrarUpdate = new EventEmitter<void>();

  cancelarUpdate() {
    this.onCerrarUpdate.emit();
  }
}
