import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PlanetsOverviewListDataAccessService } from './planets-overview-list-data-access.service';
import { createMockPlanetDetails } from '../+state/tests-assets/mockPlanet';
import { SWAPI_API } from '@swapi-app/swapi/planets-overview/domain';

describe('Planets overview service', () => {
  let service: PlanetsOverviewListDataAccessService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PlanetsOverviewListDataAccessService,
        { provide: SWAPI_API, useValue: 'https://swapi.co/api/' }
      ]
    });
    service = TestBed.get(PlanetsOverviewListDataAccessService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be existent for tests', () => {
    expect(service).toBeTruthy();
  });

  it('', () => {
    const mockPlanets = [
      createMockPlanetDetails('nejm1'),
      createMockPlanetDetails('nejm2'),
      createMockPlanetDetails('nejm3')
    ];

    service.getPlanets(1).subscribe(planets => {
      expect(planets).toBe(mockPlanets);
    });

    const req = httpMock.expectOne(service.apiUrl + 'planets/?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlanets);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
