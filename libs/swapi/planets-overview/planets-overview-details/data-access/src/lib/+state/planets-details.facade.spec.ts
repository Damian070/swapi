import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { PlanetsDetailsEntity } from './planets-details.models';
import { PlanetsDetailsEffects } from './planets-details.effects';
import { PlanetsDetailsFacade } from './planets-details.facade';

import * as PlanetsDetailsSelectors from './planets-details.selectors';
import * as PlanetsDetailsActions from './planets-details.actions';
import {
  PLANETSDETAILS_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './planets-details.reducer';

interface TestSchema {
  planetsDetails: State;
}

describe('PlanetsDetailsFacade', () => {
  let facade: PlanetsDetailsFacade;
  let store: Store<TestSchema>;
  const createPlanetsDetailsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as PlanetsDetailsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PLANETSDETAILS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PlanetsDetailsEffects])
        ],
        providers: [PlanetsDetailsFacade]
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
      facade = TestBed.get(PlanetsDetailsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allPlanetsDetails$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(PlanetsDetailsActions.loadPlanetsDetails());

        list = await readFirst(facade.allPlanetsDetails$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadPlanetsDetailsSuccess` to manually update list
     */
    it('allPlanetsDetails$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allPlanetsDetails$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          PlanetsDetailsActions.loadPlanetsDetailsSuccess({
            planetsDetails: [
              createPlanetsDetailsEntity('AAA'),
              createPlanetsDetailsEntity('BBB')
            ]
          })
        );

        list = await readFirst(facade.allPlanetsDetails$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
