import { TestBed } from '@angular/core/testing';

import { MesajeriaService } from './mesajeria-service';

describe('MesajeriaService', () => {
  let service: MesajeriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesajeriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
