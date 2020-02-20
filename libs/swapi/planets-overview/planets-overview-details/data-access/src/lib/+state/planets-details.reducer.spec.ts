import { PlanetsDetailsEntity } from './planets-details.models';
import * as PlanetsDetailsActions from './planets-details.actions';
import { State, initialState, reducer } from './planets-details.reducer';

describe('PlanetsDetails Reducer', () => {
  const createPlanetsDetailsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as PlanetsDetailsEntity);

  beforeEach(() => {});

  describe('valid PlanetsDetails actions', () => {
    it('loadPlanetsDetailsSuccess should return set the list of known PlanetsDetails', () => {
      const planetsDetails = [
        createPlanetsDetailsEntity('PRODUCT-AAA'),
        createPlanetsDetailsEntity('PRODUCT-zzz')
      ];
      const action = PlanetsDetailsActions.loadPlanetsDetailsSuccess({
        planetsDetails
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
