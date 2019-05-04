import { TestBed } from '@angular/core/testing';

import { CopyModeService } from './copy-mode.service';

describe('CopyModeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopyModeService = TestBed.get(CopyModeService);
    expect(service).toBeTruthy();
  });
});
