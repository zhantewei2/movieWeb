import { TestBed, inject } from '@angular/core/testing';

import { LeaveMovieService } from './leave-movie.service';

describe('LeaveMovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveMovieService]
    });
  });

  it('should ...', inject([LeaveMovieService], (service: LeaveMovieService) => {
    expect(service).toBeTruthy();
  }));
});
