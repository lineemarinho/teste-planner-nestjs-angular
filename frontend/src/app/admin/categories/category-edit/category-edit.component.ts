import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryInput } from '../../../shared/models';
import { CategoriesService } from '../../../shared/services';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  standalone: false,
  styleUrl: './category-edit.component.scss',
})
export class CategoryEditComponent implements OnInit {
  isEditMode = false;
  categoryId: number | null = null;
  saving = false;

  form: CategoryInput = {
    name: '',
    description: '',
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.categoryId = Number(idParam);

      this.categoriesService.findOne(this.categoryId).subscribe((category) => {
        this.form = {
          name: category.name,
          description: category.description ?? '',
        };
      });
    }
  }

  onSubmit(): void {
    this.saving = true;

    const request =
      this.isEditMode && this.categoryId
        ? this.categoriesService.update(this.categoryId, this.form)
        : this.categoriesService.create(this.form);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/categories']);
      },
      error: () => {
        this.saving = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/categories']);
  }
}
