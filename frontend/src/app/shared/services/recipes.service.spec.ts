import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_ENDPOINTS } from '../constants';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(RecipesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('omits filter params that are not set', () => {
    service.findAll().subscribe();

    const req = httpMock.expectOne(
      (r) => r.url === API_ENDPOINTS.recipes,
    );
    expect(req.request.params.keys()).toEqual([]);
    req.flush({ data: [], total: 0, page: 1, limit: 12, totalPages: 1 });
  });

  it('sends search, categoryId, page and limit as query params', () => {
    service
      .findAll({ search: 'bolo', categoryId: 3, page: 2, limit: 12 })
      .subscribe();

    const req = httpMock.expectOne(
      (r) => r.url === API_ENDPOINTS.recipes,
    );
    expect(req.request.params.get('search')).toBe('bolo');
    expect(req.request.params.get('categoryId')).toBe('3');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('limit')).toBe('12');
    req.flush({ data: [], total: 0, page: 2, limit: 12, totalPages: 1 });
  });
});
