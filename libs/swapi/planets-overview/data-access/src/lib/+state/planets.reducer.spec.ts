import {
  fromPlanetsActions,
  initialState,
  reducer
} from '@swapi-app/swapi/planets-overview/data-access';

import { HttpErrorResponse } from '@angular/common/http';

import { mockPlanet } from './tests-assets/mockPlanet';

describe('planets reducer', () => {
  describe('should return initial state', () => {
    it('should return default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = reducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe(fromPlanetsActions.Types.TogglePlanetsFavouriteStatus, () => {
    it('should move the target', () => {
      const action = new fromPlanetsActions.TogglePlanetsFavouriteStatus(
        mockPlanet
      );
      const result = reducer(
        {
          ...initialState,
          favouritePlanets: {
            ids: [mockPlanet.name],
            entities: { [mockPlanet.name]: mockPlanet }
          }
        },
        action
      );

      expect(result).toEqual({ ...initialState });
    });
  });

  describe(fromPlanetsActions.Types.LoadPlanetsSuccess, () => {
    it('should add payload to planets entity', () => {
      const action = new fromPlanetsActions.LoadPlanetsSuccess({
        results: [mockPlanet],
        page: undefined,
        count: undefined
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        count: undefined,
        page: undefined,
        planets: {
          ids: [mockPlanet.name],
          entities: { [mockPlanet.name]: mockPlanet }
        }
      });
    });
  });

  describe(fromPlanetsActions.Types.LoadPlanetsFavourites, () => {
    it('should add payload to fav planets entity', () => {
      const action = new fromPlanetsActions.LoadPlanetsFavouritesSuccess([
        mockPlanet
      ]);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        favouritePlanets: {
          ids: [mockPlanet.name],
          entities: { [mockPlanet.name]: mockPlanet }
        }
      });
    });
  });

  describe(fromPlanetsActions.Types.LoadPlanetsFail, () => {
    it('should set error prop of state to an http error', () => {
      const error = new Error() as HttpErrorResponse;
      const action = new fromPlanetsActions.LoadPlanetsFail(error);
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, error, loading: false });
    });
  });

  describe(fromPlanetsActions.LoadPlanetDetailsSuccess, () => {
    it('should insert payload into planetsDetails property', () => {
      const action = new fromPlanetsActions.LoadPlanetDetailsSuccess(
        mockPlanet
      );
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        planetDetails: mockPlanet
      });
    });
  });

  describe(fromPlanetsActions.Types.LoadPlanetDetailsFailure, () => {
    it('should return an error', () => {
      const error = new Error() as HttpErrorResponse;
      const action = new fromPlanetsActions.LoadPlanetDetailsFailure(error);
      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, error, loading: false });
    });
  });
});
