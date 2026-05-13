import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroUsuario } from './form-registro-usuario';

describe('FormRegistroUsuario', () => {
  let component: FormRegistroUsuario;
  let fixture: ComponentFixture<FormRegistroUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegistroUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegistroUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
