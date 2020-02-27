import { planetsAdapter } from './planets.reducer';
import * as PlanetsSelectors from './planets.selectors';
import {
  PlanetDetailsInterface,
  PlanetsListInterface
} from '@swapi-app/swapi/planets-overview/domain';
import { createMockPlanetDetails } from './tests-assets/mockPlanet';

import { PlanetsEntitiesState } from '@swapi-app/swapi/planets-overview/domain';

describe('Planets Selectors', () => {
  let state: { planets: PlanetsListInterface };
  const planetsArray: PlanetDetailsInterface[] = [
      createMockPlanetDetails('a'),
      createMockPlanetDetails('b'),
      createMockPlanetDetails('c')
    ],
    favouritePlanetsArray: PlanetDetailsInterface[] = [
      createMockPlanetDetails('a_fav'),
      createMockPlanetDetails('b_fav')
    ],
    planets: PlanetsEntitiesState = planetsAdapter.addAll(planetsArray, {
      ids: [],
      entities: {}
    }),
    favouritePlanets: PlanetsEntitiesState = planetsAdapter.addAll(
      favouritePlanetsArray,
      {
        ids: [],
        entities: {}
      }
    ),
    mockPlanetDetails: PlanetDetailsInterface = createMockPlanetDetails('a');

  beforeEach(() => {
    state = {
      planets: {
        planets,
        favouritePlanets,
        count: 0,
        page: 1,
        error: null,
        loading: false,
        detailsLoading: false,
        planetDetails: mockPlanetDetails,
        detailsError: null
      }
    };
  });

  it('PlanetsSelectors.getAllPlanets', () => {
    const selection = PlanetsSelectors.getAllPlanets(state);

    expect(selection.length).toBe(3);
    expect(selection).toEqual(planetsArray);
  });

  it('PlanetsSelectors.getFavouritePlanetsArray', () => {
    const selection = PlanetsSelectors.getFavouritePlanetsArray(state);

    expect(selection.length).toBe(2);
    expect(selection).toEqual(favouritePlanetsArray);
  });

  it('PlanetsSelectors.getPlanetsDetails', () => {
    const selection = PlanetsSelectors.getPlanetsDetails(state);

    expect(selection).toEqual(mockPlanetDetails);
  });

  it('PlanetsSelectors.getFavouritePlanetsBranch', () => {
    const selection = PlanetsSelectors.getFavouritePlanetsBranch(state);

    expect(selection).toEqual(favouritePlanets);
  });

  it('PlanetsSelectors.getPlanetsCount', () => {
    const selection = PlanetsSelectors.getPlanetsCount(state);

    expect(selection).toEqual(state.planets.count);
  });

  it('PlanetsSelectors.getPlanetsDetailsLoading', () => {
    const selection = PlanetsSelectors.getPlanetsDetailsLoading(state);

    expect(selection).toEqual(state.planets.detailsLoading);
  });

  it('PlanetsSelectors.getPlanetsError', () => {
    const selection = PlanetsSelectors.getPlanetsError(state);

    expect(selection).toEqual(state.planets.error);
  });

  it('PlanetsSelectors.getPlanetsPage', () => {
    const selection = PlanetsSelectors.getPlanetsPage(state);

    expect(selection).toEqual(state.planets.page);
  });

  it('PlanetsSelectors.getFavouritePlanetsState', () => {
    const selection = PlanetsSelectors.getFavouritePlanetsState(state);

    expect(selection).toEqual(state.planets.favouritePlanets);
  });

  it('PlanetsSelectors.getPlanetsLoading', () => {
    const selection = PlanetsSelectors.getPlanetsLoading(state);

    expect(selection).toEqual(state.planets.loading);
  });

  it('PlanetsSelectors.getPlanetsDetailsError', () => {
    const selection = PlanetsSelectors.getPlanetsDetailsError(state);

    expect(selection).toEqual(state.planets.detailsError);
  });
});
