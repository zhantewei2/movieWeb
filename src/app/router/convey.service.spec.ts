import { TestBed, inject } from '@angular/core/testing';

import { ConveyService } from './convey.service';

describe('ConveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConveyService]
    });
  });

  it('should ...', inject([ConveyService], (service: ConveyService) => {
    expect(service).toBeTruthy();
  }));
});
