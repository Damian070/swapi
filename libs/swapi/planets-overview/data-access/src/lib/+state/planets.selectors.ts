import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLANETS_FEATURE_KEY,
  PlanetsPartialState,
  planetsAdapter
} from './planets.reducer';

import { planetsListInterface } from '@swapi-app/swapi/planets-overview/domain';

export const getPlanetsState = createFeatureSelector<
  PlanetsPartialState,
  planetsListInterface
>(PLANETS_FEATURE_KEY);

const { selectAll } = planetsAdapter.getSelectors();

export const getFavouritePlanetsState = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => state.favouritePlanets
);

export const getPlanetsLoading = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => state.loading
);

export const getPlanetsError = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => state.error
);

export const getPlanetsCount = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => state.count
);

export const getPlanetsPage = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => state.page
);

export const getAllPlanets = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => selectAll(state.planets)
);

export const getFavouritePlanets = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => selectAll(state.favouritePlanets)
);

export const getFavouritePlanetsBranch = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => state.favouritePlanets
);

export const getFavouritePlanetsArray = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => selectAll(state.favouritePlanets)
);
