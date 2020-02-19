// import { PlanetsEntity } from './planets.models';
// import * as PlanetsActions from './planets.actions';
// import { State, initialState, reducer } from './planets.reducer';
//
// describe('Planets Reducer', () => {
//   const createPlanetsEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`
//     } as PlanetsEntity);
//
//   beforeEach(() => {});
//
//   describe('valid Planets actions', () => {
//     it('loadPlanetsSuccess should return set the list of known Planets', () => {
//       const planets = [
//         createPlanetsEntity('PRODUCT-AAA'),
//         createPlanetsEntity('PRODUCT-zzz')
//       ];
//       const action = PlanetsActions.loadPlanetsSuccess({ planets });
//
//       const result: State = reducer(initialState, action);
//
//       expect(result.loaded).toBe(true);
//       expect(result.ids.length).toBe(2);
//     });
//   });
//
//   describe('unknown action', () => {
//     it('should return the previous state', () => {
//       const action = {} as any;
//
//       const result = reducer(initialState, action);
//
//       expect(result).toBe(initialState);
//     });
//   });
// });
