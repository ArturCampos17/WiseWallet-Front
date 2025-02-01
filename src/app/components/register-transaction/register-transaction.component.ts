import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-transaction',
  templateUrl: './register-transaction.component.html',
  styleUrls: ['./register-transaction.component.css']
})
export class RegisterTransactionComponent {
  transactionForm: FormGroup;
  categories: string[] = ['Food', 'Transport', 'Leisure', 'Housing', 'Health', 'Others'];
  transactionTypes: string[] = ['Expense', 'Income'];

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      type: ['Expense', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      category: ['Food', Validators.required],
      description: ['', Validators.maxLength(100)]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      console.log('Transaction registered:', this.transactionForm.value);
      this.transactionForm.reset({
        type: 'Expense',
        date: new Date().toISOString().substring(0, 10),
        category: 'Food'
      });
    } else {
      console.log('Invalid form');
    }
  }
}