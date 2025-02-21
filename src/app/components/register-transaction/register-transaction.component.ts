import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-transaction',
  templateUrl: './register-transaction.component.html',
  styleUrls: ['./register-transaction.component.css']
})
export class RegisterTransactionComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      receiver: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      paymentType: ['', Validators.required],
      situation: ['', Validators.required],
      date: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      console.log('Transação registrada:', this.transactionForm.value);
    
    } else {
      console.error('Formulário inválido');
    }
  }
}
