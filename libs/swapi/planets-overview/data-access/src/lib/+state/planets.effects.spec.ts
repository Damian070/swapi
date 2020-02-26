import { PlanetsEffects } from './planets.effects';
import { PlanetsDetailsService } from '../services/planets-details.service';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { fromPlanetsActions } from '@swapi-app/swapi/planets-overview/data-access';
import { PlanetsOverviewListDataAccessService } from '../services/planets-overview-list-data-access.service';
import { HttpClientModule } from '@angular/common/http';
import { createSpyObj } from 'jest-createspyobj';
import { mockPlanet } from './tests-assets/mockPlanet';
import { hot, cold } from 'jasmine-marbles';

describe('UserEffects', () => {
  let actions$: Observable<fromPlanetsActions.Types>;
  let effects: PlanetsEffects;
  let planetsDetailsService: PlanetsDetailsService;
  let planetsListService: PlanetsOverviewListDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        provideMockStore(),
        PlanetsEffects,
        provideMockActions(() => actions$),
        {
          provide: PlanetsOverviewListDataAccessService,
          useValue: createSpyObj(PlanetsOverviewListDataAccessService)
        }
      ]
    });

    effects = TestBed.get(PlanetsEffects);
    planetsListService = TestBed.get(PlanetsOverviewListDataAccessService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
    expect(planetsListService).toBeTruthy();
  });

  it('effects.loadFavesFromLocalStorage$', () => {
    const action = new fromPlanetsActions.LoadPlanetsFavourites();
    const outcome = new fromPlanetsActions.LoadPlanetsFavouritesSuccess([
      mockPlanet
    ]);

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: [mockPlanet] });
    const expected = cold('--b', { b: outcome });
    planetsListService.loadFavesLocalStorage = jest.fn(() => response);

    expect(effects.loadFavesFromLocalStorage$).toBeObservable(expected);
  });

  it('fromPlanetsActions.LoadPlanets', () => {
    const planetsPayload = { results: [mockPlanet], count: 1, page: 0 };

    const action = new fromPlanetsActions.LoadPlanets(1);
    const outcome = new fromPlanetsActions.LoadPlanetsSuccess(planetsPayload);

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: planetsPayload });
    const expected = cold('--b', { b: outcome });
    planetsListService.getPlanets = jest.fn(() => response);

    expect(effects.loadPlanets$).toBeObservable(expected);
  });
});
