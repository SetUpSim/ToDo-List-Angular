import { TestBed } from '@angular/core/testing';

import { AppGlobalsService } from './app-globals.service';

describe('AppGlobalsService', () => {
  let service: AppGlobalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppGlobalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
