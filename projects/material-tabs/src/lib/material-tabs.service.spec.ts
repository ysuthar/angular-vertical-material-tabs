import { TestBed, inject } from '@angular/core/testing';

import { MaterialTabsService } from './material-tabs.service';

describe('MaterialTabsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialTabsService]
    });
  });

  it('should be created', inject([MaterialTabsService], (service: MaterialTabsService) => {
    expect(service).toBeTruthy();
  }));
});
