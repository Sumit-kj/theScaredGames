import { TestBed } from '@angular/core/testing';

import { UserSessionsService } from './user-sessions.service';

describe('UserSessionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSessionsService = TestBed.get(UserSessionsService);
    expect(service).toBeTruthy();
  });
});
