import { TestBed } from '@angular/core/testing';

import { LoggedAuthGuard } from './logged-auth.guard';

describe('LoggedAuthGuard', () => {
  let guard: LoggedAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
