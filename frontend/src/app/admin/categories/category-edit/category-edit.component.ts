import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  readonly form: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;

  constructor(
    fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly categoriesService: CategoriesService,
  ) {
    this.form = fb.nonNullable.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.categoryId = Number(idParam);

      this.categoriesService.findOne(this.categoryId).subscribe((category) => {
        this.form.setValue({
          name: category.name,
          description: category.description ?? '',
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const value = this.form.getRawValue();

    const request =
      this.isEditMode && this.categoryId
        ? this.categoriesService.update(this.categoryId, value)
        : this.categoriesService.create(value);

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
