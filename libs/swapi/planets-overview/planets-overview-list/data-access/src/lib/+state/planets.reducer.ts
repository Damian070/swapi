import {EntityAdapter, createEntityAdapter, EntityState} from '@ngrx/entity';

import {fromPlanetsActions} from './planets.actions';

import {planetsListInterface, planetDetailsInterface} from '@swapi-app/swapi/planets-overview/domain';

export const PLANETS_FEATURE_KEY = 'planets';

export interface PlanetsEntitiesState extends EntityState<planetDetailsInterface> {
}

export const planetsAdapter: EntityAdapter<planetDetailsInterface> = createEntityAdapter<planetDetailsInterface>({
  selectId: model => model.name
});

export const initialState: planetsListInterface = {
  planets: planetsAdapter.getInitialState(),
  count: 0,
  page: 1,
  error: null,
  loading: false
};

export interface PlanetsPartialState {
  readonly [PLANETS_FEATURE_KEY]: planetsListInterface;
}

export function reducer(state: planetsListInterface = initialState,
                        action: fromPlanetsActions.CollectiveType) {
  switch (action.type) {

    case fromPlanetsActions.Types.LoadPlanets: {
      console.log(action);
      state = {
        ...state,
        loading: true,
        error: null,
        page: action.payload
      };

      break;
    }

    case fromPlanetsActions.Types.LoadPlanetsFail: {
      state = {
        ...state,
        error: action.payload,
        loading: false
      };

      break;
    }

    case fromPlanetsActions.Types.LoadPlanetsSuccess: {
      console.log(action.payload);
      state = {
        ...state,
        loading:false,
        count: action.payload['count'],
        page: action.payload['page'],
        planets: planetsAdapter.addAll(action.payload['results'], state.planets)
      };

      break;
    }
  }

  return state;
}
