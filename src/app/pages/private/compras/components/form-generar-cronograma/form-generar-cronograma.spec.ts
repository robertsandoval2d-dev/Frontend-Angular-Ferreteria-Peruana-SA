import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenerarCronograma } from './form-generar-cronograma';

describe('FormGenerarCronograma', () => {
  let component: FormGenerarCronograma;
  let fixture: ComponentFixture<FormGenerarCronograma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGenerarCronograma],
    }).compileComponents();

    fixture = TestBed.createComponent(FormGenerarCronograma);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
