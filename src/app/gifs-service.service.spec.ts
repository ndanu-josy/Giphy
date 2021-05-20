import { TestBed } from '@angular/core/testing';

import { GifsServiceService } from './gifs-service.service';

describe('GifsServiceService', () => {
  let service: GifsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
