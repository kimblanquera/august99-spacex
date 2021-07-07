import { TestBed } from '@angular/core/testing';

import { LaunchesHandlerService } from './launches-handler.service';

describe('LaunchesHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaunchesHandlerService = TestBed.get(LaunchesHandlerService);
    expect(service).toBeTruthy();
  });
});
