import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Abastecimiento } from './abastecimiento';

describe('Abastecimiento', () => {
  let component: Abastecimiento;
  let fixture: ComponentFixture<Abastecimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Abastecimiento],
    }).compileComponents();

    fixture = TestBed.createComponent(Abastecimiento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
