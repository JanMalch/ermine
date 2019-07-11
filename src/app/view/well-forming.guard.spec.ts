import { inject, TestBed } from '@angular/core/testing';

import { WellFormingGuard } from './well-forming.guard';

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
