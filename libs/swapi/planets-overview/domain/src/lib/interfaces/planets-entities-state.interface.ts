import { EntityState } from '@ngrx/entity';
import { PlanetDetailsInterface } from './planet-details.interface';

export interface PlanetsEntitiesState
  extends EntityState<PlanetDetailsInterface> {}
