import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLANETS_FEATURE_KEY,
  PlanetsPartialState,
  planetsAdapter
} from './planets.reducer';

import {planetsListInterface } from '@swapi-app/swapi/planets-overview/domain';

export const getPlanetsState = createFeatureSelector<
  PlanetsPartialState,
  planetsListInterface
>(PLANETS_FEATURE_KEY);

const { selectAll, selectEntities } = planetsAdapter.getSelectors();

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

export const getPlanetsEntities = createSelector(
  getPlanetsState,
  (state: planetsListInterface) => selectEntities(state.planets)
);
