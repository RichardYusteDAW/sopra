import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { activateBlogGuard } from './activate-blog.guard';

describe('activateBlogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => activateBlogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
