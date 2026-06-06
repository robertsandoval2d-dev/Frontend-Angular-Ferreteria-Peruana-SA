import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compensaciones } from './compensaciones';

describe('Compensaciones', () => {
  let component: Compensaciones;
  let fixture: ComponentFixture<Compensaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compensaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(Compensaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
