import { TestBed, async, inject } from '@angular/core/testing';

import { WellFormingGuard } from './well-forming-guard.service';

describe('WellFormingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WellFormingGuard]
    });
  });

  it('should ...', inject([WellFormingGuard], (guard: WellFormingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
