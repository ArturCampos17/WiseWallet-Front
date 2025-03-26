import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  categories: any[] = [];
  categoryForm!: FormGroup;
  showModal = false;
  loading = true;
  error = '';
  isEditMode = false;
  editingCategoryId: number | null = null;


  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar categorias';
        this.loading = false;
      }
    });
  }

  openModalForCreate (): void{
    this.isEditMode = false;
    this.editingCategoryId = null;
    this.categoryForm.reset();
    this.showModal = true;
  }

  openModalForEdit(category: any): void {
    this.isEditMode = true; // Modo de edição
    this.editingCategoryId = category.id;
    this.categoryForm.patchValue({ name: category.name });
    this.showModal = true;
  }
  
  openModal(): void {
    this.showModal = true; 
  }

  closeModal(): void {
    this.showModal = false; 
    this.categoryForm.reset(); 
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;

      if (this.isEditMode && this.editingCategoryId) {
        // Atualiza a categoria existente
        this.categoryService.updateCategory(this.editingCategoryId, categoryData).subscribe({
          next: (response) => {
            console.log('Categoria atualizada com sucesso!', response);
            this.closeModal();
            this.loadCategories(); // Atualiza a lista de categorias
          },
          error: (err) => {
            console.error('Erro ao atualizar categoria:', err);
          }
        });
      } else {
        // Cria uma nova categoria
        this.categoryService.createCategory(categoryData).subscribe({
          next: (response) => {
            console.log('Categoria criada com sucesso!', response);
            this.closeModal();
            this.loadCategories(); // Atualiza a lista de categorias
          },
          error: (err) => {
            console.error('Erro ao criar categoria:', err);
          }
        });
      }
    } else {
      console.error('Formulário inválido');
    }
  }
}