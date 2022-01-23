import { TestBed } from '@angular/core/testing';

import { DishManagerGuard } from './dish-manager.guard';

describe('DishManagerGuard', () => {
  let guard: DishManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DishManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
