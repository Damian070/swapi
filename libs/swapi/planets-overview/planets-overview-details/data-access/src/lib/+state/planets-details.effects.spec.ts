import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { PlanetsDetailsEffects } from './planets-details.effects';
import * as PlanetsDetailsActions from './planets-details.actions';

describe('PlanetsDetailsEffects', () => {
  let actions: Observable<any>;
  let effects: PlanetsDetailsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PlanetsDetailsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(PlanetsDetailsEffects);
  });

  describe('loadPlanetsDetails$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PlanetsDetailsActions.loadPlanetsDetails() });

      const expected = hot('-a-|', {
        a: PlanetsDetailsActions.loadPlanetsDetailsSuccess({
          planetsDetails: []
        })
      });

      expect(effects.loadPlanetsDetails$).toBeObservable(expected);
    });
  });
});
