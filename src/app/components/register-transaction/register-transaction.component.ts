import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-register-transaction',
  templateUrl: './register-transaction.component.html',
  styleUrls: ['./register-transaction.component.css']
})
export class RegisterTransactionComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {} // Injetando o serviço


  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      recipient: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      paymentType: ['', Validators.required],
      stats: ['PENDENTE', Validators.required],
      date: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      console.log('Transação registrada:', this.transactionForm.value);

      this.transactionService.createTransaction(this.transactionForm.value).subscribe({
        next: (response) => {
          console.log('Transação criada com sucesso!', response);
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