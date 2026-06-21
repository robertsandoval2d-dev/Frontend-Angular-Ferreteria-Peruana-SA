import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisLineas } from './analisis-lineas';

describe('AnalisisLineas', () => {
  let component: AnalisisLineas;
  let fixture: ComponentFixture<AnalisisLineas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisisLineas],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalisisLineas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
