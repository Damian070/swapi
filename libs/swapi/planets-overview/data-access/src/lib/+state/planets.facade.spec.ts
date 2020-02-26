import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import { PlanetsListInterface } from '@swapi-app/swapi/planets-overview/domain';

import { PlanetsEffects } from './planets.effects';
import { PlanetsFacade } from './planets.facade';
import { PLANETS_FEATURE_KEY, initialState, reducer } from './planets.reducer';
import { PlanetsOverviewListDataAccessService } from '../services/planets-overview-list-data-access.service';

import { createSpyObj } from 'jest-createspyobj';
import { PlanetsDetailsService } from '../services/planets-details.service';
import { PlanetsDetailsEffects } from '@swapi-app/swapi/planets-overview/data-access';
import {fromPlanetsActions} from "./planets.actions";
import {HttpClient, HttpClientModule} from "@angular/common/http";

interface TestSchema {
  planets: PlanetsListInterface;
}

describe('PlanetsFacade', () => {
  let facade: PlanetsFacade;
  let store: Store<TestSchema>;
  let effects: PlanetsEffects;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          HttpClientModule,
          StoreModule.forFeature(PLANETS_FEATURE_KEY, reducer, {
            initialState
          }),
          EffectsModule.forFeature([PlanetsEffects, PlanetsDetailsEffects])
        ],
        providers: [
          HttpClient,
          Store,
          PlanetsFacade,
          PlanetsOverviewListDataAccessService,
          PlanetsDetailsService
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(PlanetsFacade);
      jest.spyOn(store, 'dispatch');
    });

    it('Are things to be tested existent?', () => {
      expect(store).toBeTruthy();
      expect(facade).toBeTruthy();
    });

    it('store should be called with actions', () => {
      const getPlanets = new  fromPlanetsActions.LoadPlanets(1);
      const getFavPlanets = new fromPlanetsActions.LoadPlanetsFavourites();

      facade.getPlanets();

      expect(store.dispatch).toHaveBeenCalledWith(getPlanets);

      facade.getFavouritePlanets();

      expect(store.dispatch).toHaveBeenCalledWith(getFavPlanets);
    });
  });
});
