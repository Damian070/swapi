// import { NgModule } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
// import { readFirst } from '@nrwl/angular/testing';
//
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule, Store } from '@ngrx/store';
//
// import { NxModule } from '@nrwl/angular';
//
// import { PlanetsEntity } from './planets.models';
// import { PlanetsEffects } from './planets.effects';
// import { PlanetsFacade } from './planets.facade';
//
// import * as PlanetsSelectors from './planets.selectors';
// import * as PlanetsActions from './planets.actions';
// import {
//   PLANETS_FEATURE_KEY,
//   State,
//   initialState,
//   reducer
// } from './planets.reducer';
//
// interface TestSchema {
//   planets: State;
// }
//
// describe('PlanetsFacade', () => {
//   let facade: PlanetsFacade;
//   let store: Store<TestSchema>;
//   const createPlanetsEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`
//     } as PlanetsEntity);
//
//   beforeEach(() => {});
//
//   describe('used in NgModule', () => {
//     beforeEach(() => {
//       @NgModule({
//         imports: [
//           StoreModule.forFeature(PLANETS_FEATURE_KEY, reducer),
//           EffectsModule.forFeature([PlanetsEffects])
//         ],
//         providers: [PlanetsFacade]
//       })
//       class CustomFeatureModule {}
//
//       @NgModule({
//         imports: [
//           NxModule.forRoot(),
//           StoreModule.forRoot({}),
//           EffectsModule.forRoot([]),
//           CustomFeatureModule
//         ]
//       })
//       class RootModule {}
//       TestBed.configureTestingModule({ imports: [RootModule] });
//
//       store = TestBed.get(Store);
//       facade = TestBed.get(PlanetsFacade);
//     });
//
//     /**
//      * The initially generated facade::loadAll() returns empty array
//      */
//     it('loadAll() should return empty list with loaded == true', async done => {
//       try {
//         let list = await readFirst(facade.allPlanets$);
//         let isLoaded = await readFirst(facade.loaded$);
//
//         expect(list.length).toBe(0);
//         expect(isLoaded).toBe(false);
//
//         facade.dispatch(PlanetsActions.loadPlanets());
//
//         list = await readFirst(facade.allPlanets$);
//         isLoaded = await readFirst(facade.loaded$);
//
//         expect(list.length).toBe(0);
//         expect(isLoaded).toBe(true);
//
//         done();
//       } catch (err) {
//         done.fail(err);
//       }
//     });
//
//     /**
//      * Use `loadPlanetsSuccess` to manually update list
//      */
//     it('allPlanets$ should return the loaded list; and loaded flag == true', async done => {
//       try {
//         let list = await readFirst(facade.allPlanets$);
//         let isLoaded = await readFirst(facade.loaded$);
//
//         expect(list.length).toBe(0);
//         expect(isLoaded).toBe(false);
//
//         facade.dispatch(
//           PlanetsActions.loadPlanetsSuccess({
//             planets: [createPlanetsEntity('AAA'), createPlanetsEntity('BBB')]
//           })
//         );
//
//         list = await readFirst(facade.allPlanets$);
//         isLoaded = await readFirst(facade.loaded$);
//
//         expect(list.length).toBe(2);
//         expect(isLoaded).toBe(true);
//
//         done();
//       } catch (err) {
//         done.fail(err);
//       }
//     });
//   });
// });
