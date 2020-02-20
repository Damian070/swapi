import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLANETSDETAILS_FEATURE_KEY,
  State,
  PlanetsDetailsPartialState
} from './planets-details.reducer';

export const getPlanetsDetailsState = createFeatureSelector<
  PlanetsDetailsPartialState,
  State
>(PLANETSDETAILS_FEATURE_KEY);

export const getPlanetsDetails = createSelector(
  getPlanetsDetailsState,
  (state: State) => state.planetsDetails
);

export const getPlanetsDetailsLoading = createSelector(
  getPlanetsDetailsState,
  (state: State) => state.loading
);

export const getPlanetsDetailsError = createSelector(
  getPlanetsDetailsState,
  (state: State) => state.error
);
