import { TestBed } from '@angular/core/testing';

import { AppAPI } from './fetch-api-data.service';

describe('AppAPI', () => {
  let service: AppAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
