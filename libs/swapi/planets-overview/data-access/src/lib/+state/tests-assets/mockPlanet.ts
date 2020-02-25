import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

export const mockPlanet: PlanetDetailsInterface = {
  id: 'Serenno',
  name: 'Serenno',
  rotation_period: 'unknown',
  orbital_period: 'unknown',
  diameter: 'unknown',
  climate: 'unknown',
  gravity: 'unknown',
  terrain: 'rainforests, rivers, mountains',
  surface_water: 'unknown',
  population: 'unknown',
  residents: ['https://swapi.co/api/people/67/'],
  films: [],
  created: '2014-12-20T16:52:13.357000Z',
  edited: '2014-12-20T20:58:18.510000Z',
  url: '52'
};

export  const createMockPlanetDetails = name => {
  return { ...mockPlanet, name, id: name } as PlanetDetailsInterface;
};
