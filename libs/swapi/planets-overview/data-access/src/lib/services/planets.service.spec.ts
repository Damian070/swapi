import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PlanetsOverviewListDataAccessService} from './planets-overview-list-data-access.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('Planets overview service', () => {
    let service: PlanetsOverviewListDataAccessService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpTestingController, HttpClientModule],
        providers: [HttpClient]
      });
      service = TestBed.inject(PlanetsOverviewListDataAccessService);
      httpMock = TestBed.get(HttpTestingController);
    });


});
