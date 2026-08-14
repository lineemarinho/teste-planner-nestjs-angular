import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../shared/models';
import { CategoriesService } from '../../../shared/services';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  standalone: false,
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns = ['name', 'description', 'actions'];

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onNew(): void {
    this.router.navigate(['/admin/categories/new']);
  }

  onEdit(category: Category): void {
    this.router.navigate(['/admin/categories', category.id, 'edit']);
  }

  onDelete(category: Category): void {
    if (!confirm(`Excluir a categoria "${category.name}"?`)) {
      return;
    }

    this.categoriesService
      .remove(category.id)
      .subscribe(() => this.loadCategories());
  }

  private loadCategories(): void {
    this.categoriesService.findAll().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
