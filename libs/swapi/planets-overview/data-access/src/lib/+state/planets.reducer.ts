import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { fromPlanetsActions } from './planets.actions';

import {
  PlanetDetailsInterface,
  PlanetsListInterface
} from '@swapi-app/swapi/planets-overview/domain';

export const PLANETS_FEATURE_KEY = 'planets';

export const planetsAdapter: EntityAdapter<
  PlanetDetailsInterface
> = createEntityAdapter<PlanetDetailsInterface>({
  selectId: model => model.name
});

export const initialState: PlanetsListInterface = {
  planets: planetsAdapter.getInitialState(),
  favouritePlanets: planetsAdapter.getInitialState(),
  count: 0,
  page: 1,
  error: null,
  loading: false,
  detailsLoading: false,
  planetDetails: null,
  detailsError: null
};

function extractId(planetInfo: PlanetDetailsInterface) {
  let url = planetInfo.url;
  if (url) {
    if (url[url.length - 1] === '/') url = url.substring(0, url.length - 1);
    url = url.slice(url.lastIndexOf('/') + 1);
    return { ...planetInfo, url };
  } else return planetInfo;
}

export interface PlanetsPartialState {
  readonly [PLANETS_FEATURE_KEY]: PlanetsListInterface;
}

export function reducer(
  state: PlanetsListInterface = initialState,
  action: fromPlanetsActions.CollectiveType
) {
  switch (action.type) {
    case fromPlanetsActions.Types.LoadPlanetsFavouritesSuccess: {
      if (!action.payload) break;

      state = {
        ...state,
        favouritePlanets: planetsAdapter.addAll(
          action.payload,
          state.favouritePlanets
        )
      };

      break;
    }

    case fromPlanetsActions.Types.TogglePlanetsFavouriteStatus: {
      const name = action.payload.name;
      const alreadyInFlag: boolean = state.favouritePlanets.ids.some(
        planetName => planetName === name
      );

      state = {
        ...state,
        favouritePlanets: alreadyInFlag
          ? planetsAdapter.removeOne(
              action.payload.name,
              state.favouritePlanets
            )
          : planetsAdapter.addOne(action.payload, state.favouritePlanets)
      };

      break;
    }

    case fromPlanetsActions.Types.LoadPlanets: {
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
      const extractedIdsPayload = action.payload.results.map(extractId);

      state = {
        ...state,
        loading: false,
        count: action.payload.count,
        page: action.payload.page,
        planets: planetsAdapter.addAll(extractedIdsPayload, state.planets)
      };

      break;
    }

    case fromPlanetsActions.Types.LoadPlanetDetails: {
      state = {
        ...state,
        loading: true,
        error: null
      };

      break;
    }

    case fromPlanetsActions.Types.LoadPlanetDetailsFailure: {
      state = {
        ...state,
        loading: false,
        error: action.payload
      };

      break;
    }

    case fromPlanetsActions.Types.LoadPlanetDetailsSuccess: {
      state = {
        ...state,
        loading: false,
        planetDetails: action.payload
      };

      break;
    }
  }

  return state;
}
