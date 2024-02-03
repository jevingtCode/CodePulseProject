import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    RouterModule, CommonModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit  {

  categories$?: Observable<Category[]>;
  // categories?: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    // this.categoryService.getAllCategories()
    // .subscribe({
    //   next: (response) => {
    //     this.categories = response;
    //   }
    // })

    this.categories$ = this.categoryService.getAllCategories()
  }


}
