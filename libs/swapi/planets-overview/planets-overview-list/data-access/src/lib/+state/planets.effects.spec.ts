import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { PlanetsEffects } from './planets.effects';
import * as PlanetsActions from './planets.actions';

describe('PlanetsEffects', () => {
  let actions: Observable<any>;
  let effects: PlanetsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PlanetsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(PlanetsEffects);
  });

  describe('loadPlanets$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PlanetsActions.loadPlanets() });

      const expected = hot('-a-|', {
        a: PlanetsActions.loadPlanetsSuccess({ planets: [] })
      });

      expect(effects.loadPlanets$).toBeObservable(expected);
    });
  });
});
