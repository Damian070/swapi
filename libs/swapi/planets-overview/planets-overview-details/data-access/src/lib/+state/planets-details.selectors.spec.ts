import { PlanetsDetailsEntity } from './planets-details.models';
import {
  State,
  planetsDetailsAdapter,
  initialState
} from './planets-details.reducer';
import * as PlanetsDetailsSelectors from './planets-details.selectors';

describe('PlanetsDetails Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPlanetsDetailsId = it => it['id'];
  const createPlanetsDetailsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as PlanetsDetailsEntity);

  let state;

  beforeEach(() => {
    state = {
      planetsDetails: planetsDetailsAdapter.addAll(
        [
          createPlanetsDetailsEntity('PRODUCT-AAA'),
          createPlanetsDetailsEntity('PRODUCT-BBB'),
          createPlanetsDetailsEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('PlanetsDetails Selectors', () => {
    it('getAllPlanetsDetails() should return the list of PlanetsDetails', () => {
      const results = PlanetsDetailsSelectors.getAllPlanetsDetails(state);
      const selId = getPlanetsDetailsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PlanetsDetailsSelectors.getSelected(state);
      const selId = getPlanetsDetailsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getPlanetsDetailsLoaded() should return the current 'loaded' status", () => {
      const result = PlanetsDetailsSelectors.getPlanetsDetailsLoaded(state);

      expect(result).toBe(true);
    });

    it("getPlanetsDetailsError() should return the current 'error' state", () => {
      const result = PlanetsDetailsSelectors.getPlanetsDetailsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
