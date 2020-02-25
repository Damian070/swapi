import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

export function extractId(planetInfo: PlanetDetailsInterface) {
  let url = planetInfo.url;
  if (url) {
    if (url[url.length - 1] === '/') url = url.substring(0, url.length - 1);
    url = url.slice(url.lastIndexOf('/') + 1);
    return { ...planetInfo, url };
  } else return planetInfo;
}
