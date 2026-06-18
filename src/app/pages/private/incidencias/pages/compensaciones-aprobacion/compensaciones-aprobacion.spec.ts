import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensacionesAprobacion } from './compensaciones-aprobacion';

describe('CompensacionesAprobacion', () => {
  let component: CompensacionesAprobacion;
  let fixture: ComponentFixture<CompensacionesAprobacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompensacionesAprobacion],
    }).compileComponents();

    fixture = TestBed.createComponent(CompensacionesAprobacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
