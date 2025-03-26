import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Category, CategoryService } from '../services/category.service';


@Component({
  selector: 'app-register-transaction',
  templateUrl: './register-transaction.component.html',
  styleUrls: ['./register-transaction.component.css']
})
export class RegisterTransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  category: Category[] = [];
  loading = true;
  error = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      recipient: ['', Validators.required],
      categoryId: ['', Validators.required],
      type: ['', Validators.required],
      paymentType: ['', Validators.required],
      stats: ['PENDENTE', Validators.required],
      date: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });

    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.category = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar categorias';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transactionData = {
        ...this.transactionForm.value,
        categoryId: Number(this.transactionForm.value.categoryId),
      };

      this.transactionService.createTransaction(this.transactionForm.value).subscribe({
        next: (response) => {
        },
        error: (err) => {
          console.error('Erro ao criar transação:', err);
        }
      });
    } else {
      console.error('Formulário inválido');
    }
  }
}