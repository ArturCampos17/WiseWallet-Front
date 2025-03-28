import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  activeCategories: any[] = [];
  categoryForm!: FormGroup;
  showModal = false;
  loading = true;
  error = '';
  isEditMode = false;
  editingCategoryId: number | null = null;
  isSubmitting = false;
  cacategory: any;
  mostrarInativos: boolean = false;
  allCategories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.activeCategories = this.categories.filter(category => category.stats === 'A');

    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
        this.allCategories = data;
        this.categories = this.allCategories.filter(cat => cat.stats === 'A');
        this.loading = false;
      },
      error: (err) => {
        // this.toastrService.danger('Erro ao carregar suas categorias.', 'Erro', {
        //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
        //   duration: 3000,
        // });
        this.error = 'Erro ao carregar categorias';
        this.loading = false;
      }
    });
  }

  onCheckboxChange() {
    console.log('Mostrar Inativos:', this.mostrarInativos);
  
    if (this.mostrarInativos) {
      this.categories = this.allCategories; 
    } else {
      this.categories = this.allCategories.filter(cat => cat.stats === 'A');
    }
  }


  toggleCategoryStatus(category: any): void {
    const action = category.stats === 'A' ? 'inativar' : 'reativar';
    const newStatus = category.stats === 'A' ? 'I' : 'A';
  
    const request = category.stats === 'A'
      ? this.categoryService.deactivateCategory(category.id)
      : this.categoryService.activateCategory(category.id);
  
    request.subscribe({
      next: () => {
        // this.toastrService.success(
        //   `Categoria ${category.name} ${action}da com sucesso.`,
        //   'Sucesso',
        //   { position: NbGlobalPhysicalPosition.TOP_RIGHT, duration: 3000 }
        // );
        category.stats = newStatus; // Atualiza o status localmente
        this.loadCategories(); // Recarrega a lista de categorias
      },
      error: (err) => {
        // this.toastrService.danger(
        //   `Erro ao ${action} categoria.`,
        //   'Erro',
        //   { position: NbGlobalPhysicalPosition.TOP_RIGHT, duration: 3000 }
        // );
        console.error(`Erro ao ${action} categoria:`, err);
      }
    });
  }

  openModal(category?: any): void {
    if (category) {
      this.isEditMode = true;
      this.editingCategoryId = category.id;
      this.categoryForm.patchValue({ name: category.name });
    } else {
      this.isEditMode = false;
      this.editingCategoryId = null;
      this.categoryForm.reset();
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.categoryForm.reset();
  }

  onSubmit(): void {
    if (this.categoryForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const categoryData = this.categoryForm.value;

      const request = this.isEditMode && this.editingCategoryId
        ? this.categoryService.updateCategory(this.editingCategoryId, categoryData)
        : this.categoryService.createCategory(categoryData);

      request.subscribe({
        next: () => {
          // this.toastrService.success(
          //   this.isEditMode ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!',
          //   'Sucesso',
          //   { position: NbGlobalPhysicalPosition.TOP_RIGHT, duration: 3000 }
          // );
          this.closeModal();
          this.loadCategories(); 
        },
        error: (err) => {
          // this.toastrService.danger(
          //   this.isEditMode ? 'Erro ao atualizar categoria' : 'Erro ao criar categoria',
          //   'Erro',
          //   { position: NbGlobalPhysicalPosition.TOP_RIGHT, duration: 3000 }
          // );
          console.error('Erro:', err);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      // this.toastrService.danger('Preencha o nome da categoria.', 'Erro', {
      //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
      //   duration: 3000,
      // });
    }
  }
}