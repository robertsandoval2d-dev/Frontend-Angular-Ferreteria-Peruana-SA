import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroCompensacion } from './form-registro-compensacion';

describe('FormRegistroCompensacion', () => {
  let component: FormRegistroCompensacion;
  let fixture: ComponentFixture<FormRegistroCompensacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegistroCompensacion],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRegistroCompensacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
