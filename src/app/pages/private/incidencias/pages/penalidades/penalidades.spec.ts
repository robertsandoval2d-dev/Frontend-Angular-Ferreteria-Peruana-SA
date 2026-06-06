import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Penalidades } from './penalidades';

describe('Penalidades', () => {
  let component: Penalidades;
  let fixture: ComponentFixture<Penalidades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Penalidades],
    }).compileComponents();

    fixture = TestBed.createComponent(Penalidades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
