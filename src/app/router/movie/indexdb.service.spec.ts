import { TestBed, inject } from '@angular/core/testing';

import { IndexdbService } from './indexdb.service';

describe('IndexdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexdbService]
    });
  });

  it('should ...', inject([IndexdbService], (service: IndexdbService) => {
    expect(service).toBeTruthy();
  }));
});
