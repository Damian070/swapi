import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import {
  PlanetsListInterface,
  SWAPI_API
} from '@swapi-app/swapi/planets-overview/domain';
import { PlanetsFacade } from './planets.facade';
import { initialState } from './planets.reducer';
import { PlanetsOverviewListDataAccessService } from '../services/planets-overview-list-data-access.service';

import { createSpyObj } from 'jest-createspyobj';
import { fromPlanetsActions } from './planets.actions';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { mockPlanet } from './tests-assets/mockPlanet';
import mock = jest.mock;

interface TestSchema {
  planets: PlanetsListInterface;
}

describe('PlanetsFacade', () => {
  let actions$: Observable<fromPlanetsActions.Types>;
  let facade: PlanetsFacade;
  let store: Store<MockStore<TestSchema>>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [NxModule.forRoot(), HttpClientModule],
        providers: [
          HttpClient,
          provideMockStore({ initialState }),
          provideMockActions(() => actions$),
          PlanetsFacade,
          {
            provide: PlanetsOverviewListDataAccessService,
            useValue: createSpyObj(PlanetsOverviewListDataAccessService)
          },
          { provide: SWAPI_API, useValue: 'https://swapi.co/api/' }
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      facade = TestBed.get<PlanetsFacade>(PlanetsFacade);
      store = TestBed.get<Store<TestSchema>>(Store);
      jest.spyOn(store, 'dispatch');
    });

    it('Are things to be tested existent?', () => {
      expect(store).toBeTruthy();
      expect(facade).toBeTruthy();
    });

    it('[facade ] LoadPlanets', () => {
      const getPlanets = new fromPlanetsActions.LoadPlanets(1);

      facade.getPlanets();

      expect(store.dispatch).toHaveBeenCalledWith(getPlanets);
    });

    it('[facade] LoadPlanetsFavourites', () => {
      const getFavPlanets = new fromPlanetsActions.LoadPlanetsFavourites();
      facade.getFavouritePlanets();
      expect(store.dispatch).toHaveBeenCalledWith(getFavPlanets);
    });

    it('[facade] TogglePlanetsFavouriteStatus', () => {
      const togglePlanet = new fromPlanetsActions.TogglePlanetsFavouriteStatus(mockPlanet);
      facade.togglePlanetsFavouriteStatus(mockPlanet);

      expect(store.dispatch).toHaveBeenCalledWith(togglePlanet);
    });

    it('[facade] LoadPlanetDetails', () => {
      const planetId = 5;
      const loadPlanetsDetails = new fromPlanetsActions.LoadPlanetDetails(planetId);

      facade.loadPlanetsDetails(planetId);

      expect(store.dispatch).toHaveBeenCalledWith(loadPlanetsDetails);
    });
  });
});
