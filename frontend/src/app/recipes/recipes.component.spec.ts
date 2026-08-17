import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PaginatedResult, Recipe } from '../shared/models';
import { CategoriesService, RecipesService } from '../shared/services';
import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  const emptyPage: PaginatedResult<Recipe> = {
    data: [],
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function createComponent() {
    const recipesService = {
      findAll: vi.fn().mockReturnValue(of(emptyPage)),
    } as unknown as RecipesService;

    const categoriesService = {
      findAll: vi.fn().mockReturnValue(of([])),
    } as unknown as CategoriesService;

    const router = { navigate: vi.fn() } as unknown as Router;

    const component = new RecipesComponent(
      recipesService,
      categoriesService,
      router,
    );

    return { component, recipesService };
  }

  it('reacts to every search change, not just the first', () => {
    const { component, recipesService } = createComponent();

    component.ngOnInit();
    vi.mocked(recipesService.findAll).mockClear();

    component.search = 'bolo';
    component.onSearchChange();
    vi.advanceTimersByTime(300);
    expect(recipesService.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'bolo' }),
    );

    component.search = 'brigadeiro';
    component.onSearchChange();
    vi.advanceTimersByTime(300);
    expect(recipesService.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'brigadeiro' }),
    );

    component.search = '';
    component.onSearchChange();
    vi.advanceTimersByTime(300);
    expect(recipesService.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ search: undefined }),
    );
  });

  it('resets to page 1 when the search or category changes', () => {
    const { component, recipesService } = createComponent();
    vi.mocked(recipesService.findAll).mockReturnValue(
      of({ ...emptyPage, totalPages: 3 }),
    );

    component.ngOnInit();

    component.goToPage(2);
    expect(component.page).toBe(2);

    component.search = 'bolo';
    component.onSearchChange();
    vi.advanceTimersByTime(300);

    expect(component.page).toBe(1);
    expect(recipesService.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1 }),
    );
  });
});
