import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import {PlanetsListInterface} from "@swapi-app/swapi/planets-overview/domain";

import { PlanetsEffects } from './planets.effects';
import { PlanetsFacade } from './planets.facade';
import * as PlanetsSelectors from './planets.selectors';
import * as PlanetsActions from './planets.actions';
import {
  PLANETS_FEATURE_KEY,
  initialState,
  reducer
} from './planets.reducer';
import {createMockPlanetDetails} from "./tests-assets/mockPlanet";
import {PlanetsOverviewListDataAccessService} from "../services/planets-overview-list-data-access.service";

import {createSpyObj} from 'jest-createspyobj';
import {PlanetsDetailsService} from "../services/planets-details.service";
import {PlanetsDetailsEffects} from "@swapi-app/swapi/planets-overview/data-access";

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
          StoreModule.forFeature(PLANETS_FEATURE_KEY, reducer, { initialState }),
          EffectsModule.forFeature([PlanetsEffects, PlanetsDetailsEffects])
        ],
        providers: [PlanetsFacade,{
          provide: PlanetsOverviewListDataAccessService,
          useValue: createSpyObj(PlanetsOverviewListDataAccessService)
        },{provide: PlanetsDetailsService, useValue: createSpyObj(PlanetsDetailsService)}]
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

    /**
     * The initially generated facade::loadAll() returns empty array
     */

    it.only('Are things to be tested existent?', () => {
      expect(store).toBeTruthy();
      expect(facade).toBeTruthy();
    });

    // it('loadAll() should return empty list with loaded == true', async done => {
    //   try {
    //     let list = await readFirst(facade.allPlanets$);
    //     let isLoaded = await readFirst(facade.loaded$);
    //
    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(false);
    //
    //     facade.dispatch(PlanetsActions.loadPlanets());
    //
    //     list = await readFirst(facade.allPlanets$);
    //     isLoaded = await readFirst(facade.loaded$);
    //
    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(true);
    //
    //     done();
    //   } catch (err) {
    //     done.fail(err);
    //   }
    // });

    /**
     * Use `loadPlanetsSuccess` to manually update list
     */
    // it('allPlanets$ should return the loaded list; and loaded flag == true', async done => {
    //   try {
    //     let list = await readFirst(facade.allPlanets$);
    //     let isLoaded = await readFirst(facade.loaded$);
    //
    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(false);
    //
    //     facade.dispatch(
    //       PlanetsActions.loadPlanetsSuccess({
    //         planets: [createPlanetsEntity('AAA'), createPlanetsEntity('BBB')]
    //       })
    //     );
    //
    //     list = await readFirst(facade.allPlanets$);
    //     isLoaded = await readFirst(facade.loaded$);
    //
    //     expect(list.length).toBe(2);
    //     expect(isLoaded).toBe(true);
    //
    //     done();
    //   } catch (err) {
    //     done.fail(err);
    //   }
    // });
  });
});
