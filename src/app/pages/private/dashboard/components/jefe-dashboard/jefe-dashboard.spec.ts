import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeDashboard } from './jefe-dashboard';

describe('JefeDashboard', () => {
  let component: JefeDashboard;
  let fixture: ComponentFixture<JefeDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JefeDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(JefeDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
