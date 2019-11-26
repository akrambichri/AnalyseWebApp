import { TestBed } from '@angular/core/testing';

import { AnalyseService } from './analyse.service';

describe('CatalogueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalyseService = TestBed.get(AnalyseService);
    expect(service).toBeTruthy();
  });
});
