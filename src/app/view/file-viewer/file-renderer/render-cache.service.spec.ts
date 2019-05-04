import { TestBed } from '@angular/core/testing';

import { RenderCacheService } from './render-cache.service';

describe('RenderCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderCacheService = TestBed.get(RenderCacheService);
    expect(service).toBeTruthy();
  });
});
