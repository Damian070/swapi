import { TestBed } from '@angular/core/testing';

import { PlanetsDetailsService } from './planets-details.service';

describe('PlanetsDetailsService', () => {
  let service: PlanetsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
