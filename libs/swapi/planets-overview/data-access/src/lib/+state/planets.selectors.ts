import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLANETS_FEATURE_KEY,
  PlanetsPartialState,
  planetsAdapter
} from './planets.reducer';

import { PlanetsListInterface } from '@swapi-app/swapi/planets-overview/domain';

export const getPlanetsState = createFeatureSelector<
  PlanetsPartialState,
  PlanetsListInterface
>(PLANETS_FEATURE_KEY);

const { selectAll } = planetsAdapter.getSelectors();

export const getFavouritePlanetsState = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.favouritePlanets
);

export const getPlanetsLoading = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.loading
);

export const getPlanetsError = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.error
);

export const getPlanetsCount = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.count
);

export const getPlanetsPage = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.page
);

export const getAllPlanets = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => selectAll(state.planets)
);

export const getFavouritePlanetsBranch = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.favouritePlanets
);

export const getFavouritePlanetsArray = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => selectAll(state.favouritePlanets)
);

export const getPlanetsDetails = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.planetDetails
);

export const getPlanetsDetailsLoading = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.loading
);

export const getPlanetsDetailsError = createSelector(
  getPlanetsState,
  (state: PlanetsListInterface) => state.error
);
