import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateUsuario } from './form-update-usuario';

describe('FormUpdateUsuario', () => {
  let component: FormUpdateUsuario;
  let fixture: ComponentFixture<FormUpdateUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(FormUpdateUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
