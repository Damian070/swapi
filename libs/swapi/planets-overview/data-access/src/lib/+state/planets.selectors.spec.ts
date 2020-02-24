// import { PlanetsEntity } from './planets.models';
// import { State, planetsAdapter, initialState } from './planets.reducer';
// import * as PlanetsSelectors from './planets.selectors';
//
// describe('Planets Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getPlanetsId = it => it['id'];
//   const createPlanetsEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`
//     } as PlanetsEntity);
//
//   let state;
//
//   beforeEach(() => {
//     state = {
//       planets: planetsAdapter.addAll(
//         [
//           createPlanetsEntity('PRODUCT-AAA'),
//           createPlanetsEntity('PRODUCT-BBB'),
//           createPlanetsEntity('PRODUCT-CCC')
//         ],
//         {
//           ...initialState,
//           selectedId: 'PRODUCT-BBB',
//           error: ERROR_MSG,
//           loaded: true
//         }
//       )
//     };
//   });
//
//   describe('Planets Selectors', () => {
//     it('getAllPlanets() should return the list of Planets', () => {
//       const results = PlanetsSelectors.getAllPlanets(state);
//       const selId = getPlanetsId(results[1]);
//
//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });
//
//     it('getSelected() should return the selected Entity', () => {
//       const result = PlanetsSelectors.getSelected(state);
//       const selId = getPlanetsId(result);
//
//       expect(selId).toBe('PRODUCT-BBB');
//     });
//
//     it("getPlanetsLoaded() should return the current 'loaded' status", () => {
//       const result = PlanetsSelectors.getPlanetsLoaded(state);
//
//       expect(result).toBe(true);
//     });
//
//     it("getPlanetsError() should return the current 'error' state", () => {
//       const result = PlanetsSelectors.getPlanetsError(state);
//
//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
