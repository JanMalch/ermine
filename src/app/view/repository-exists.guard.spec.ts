import { inject, TestBed } from '@angular/core/testing';

import { RepositoryExistsGuard } from './repository-exists.guard';

describe('RepositoryExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoryExistsGuard]
    });
  });

  it('should ...', inject([RepositoryExistsGuard], (guard: RepositoryExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
