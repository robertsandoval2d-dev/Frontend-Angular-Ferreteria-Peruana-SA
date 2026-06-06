import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroPenalidad } from './form-registro-penalidad';

describe('FormRegistroPenalidad', () => {
  let component: FormRegistroPenalidad;
  let fixture: ComponentFixture<FormRegistroPenalidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegistroPenalidad],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegistroPenalidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
