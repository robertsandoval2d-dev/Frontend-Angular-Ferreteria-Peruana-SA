import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMensaje } from './form-mensaje';

describe('FormMensaje', () => {
  let component: FormMensaje;
  let fixture: ComponentFixture<FormMensaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMensaje],
    }).compileComponents();

    fixture = TestBed.createComponent(FormMensaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
