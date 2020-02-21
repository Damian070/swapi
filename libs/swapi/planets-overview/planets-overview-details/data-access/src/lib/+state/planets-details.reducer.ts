import {HttpErrorResponse} from "@angular/common/http";

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import {fromPlanetsDetailsActions} from './planets-details.actions';

export const PLANETSDETAILS_FEATURE_KEY = 'planetsDetails';

export interface State{
  planetsDetails?: planetDetailsInterface | {};
  loading: boolean;
  error: HttpErrorResponse | null;
}

export interface PlanetsDetailsPartialState {
  readonly [PLANETSDETAILS_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  error: null
};

export function reducer(
  state: State = initialState,
  action: fromPlanetsDetailsActions.CollectiveType
) {

  switch(action.type) {

    case fromPlanetsDetailsActions.Types.LoadPlanetsDetails:{

      state = {
        ...state,
        loading: true,
        error: null
      };

      break;

    }

    case fromPlanetsDetailsActions.Types.LoadPlanetsDetailsFailure:{

      state = {
        ...state,
        loading: false,
        error: action.payload
      };

      break;

    }

    case fromPlanetsDetailsActions.Types.LoadPlanetsDetailsSuccess: {

      state = {
        ...state,
        loading:false,
        planetsDetails: action.payload
      };

      break;

    }

  }

  return state;
}
