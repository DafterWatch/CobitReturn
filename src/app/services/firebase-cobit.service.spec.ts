import { TestBed } from '@angular/core/testing';

import { FirebaseCobitService } from './firebase-cobit.service';

describe('FirebaseCobitService', () => {
  let service: FirebaseCobitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCobitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
