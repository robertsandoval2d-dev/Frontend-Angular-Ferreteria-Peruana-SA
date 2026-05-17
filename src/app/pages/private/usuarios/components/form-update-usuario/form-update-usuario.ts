import { Component, Output, EventEmitter, inject, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TrabajadorUpdateRequest } from '../../models/request/trabajador-update-request';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-update-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './form-update-usuario.html',
  styleUrl: './form-update-usuario.scss',
})
export class FormUpdateUsuario {

  private fb = inject(FormBuilder);
  private usuariosService = inject(UserService);

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
        tiendaId: this.trabajador.tiendaId,
        lineaId: this.trabajador.lineaId
      });
    }
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
