import { PlanetsEffects } from './planets.effects';
import { PlanetsDetailsService } from '../services/planets-details.service';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '@swapi-app/swapi/planets-overview/data-access';
import { PlanetsOverviewListDataAccessService } from '../services/planets-overview-list-data-access.service';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: PlanetsEffects;
  let planetsDetailsService: PlanetsDetailsService;
  let planetsListService: PlanetsOverviewListDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlanetsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: PlanetsDetailsService,
          useValue: {
            getPlanetsDetails: jest.fn()
          }
        },
        {
          provide: PlanetsOverviewListDataAccessService,
          useValue: {
            getPlanets: jest.fn(),
            updateFavesLocalStorage: jest.fn(),
            loadFavesLocalStorage: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(PlanetsEffects);
    planetsDetailsService = TestBed.get(planetsDetailsService);
  });

  it.skip('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
