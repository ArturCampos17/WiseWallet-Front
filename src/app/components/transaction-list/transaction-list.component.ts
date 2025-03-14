// transaction-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { TransactionFilterService } from '../services/transaction-filter.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NbAccordionModule } from '@nebular/theme';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule, NbAccordionModule]
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  filters = {
    filterDescription: '',
    filterCategory: '',
    filterSituation: '',
    filterDate: ''
  };
  categories: string[] = ['Alimentação', 'Transporte', 'Lazer', 'Outros'];
  situations: string[] = ['PAGO', 'PENDENTE', 'CANCELADO', 'ATRASADO'];
  currentPage = 1;
  pageSize = 10;
  collectionSize = 0;
  page = 1;

  constructor(
    private transactionService: TransactionService,
    private transactionFilterService: TransactionFilterService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getUserTransactions().subscribe(
      (data) => {
        this.transactions = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Erro ao carregar transações:', error);
      }
    );
  }

  applyFilters() {
    const filtered = this.transactionFilterService.filterTransactions(this.transactions, this.filters);
    this.collectionSize = filtered.length;
    this.filteredTransactions = this.transactionFilterService.paginateTransactions(filtered, this.currentPage, this.pageSize);
  }

  getTotalAmount(): number {
    const filtered = this.transactionFilterService.filterTransactions(this.transactions, this.filters);
    return this.transactionFilterService.getTotalAmount(filtered);
  }

  getCurrentPageTotal(): number {
    return this.filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  refreshTransactions() {
    this.filters = {
      filterDescription: '',
      filterCategory: '',
      filterSituation: '',
      filterDate: ''
    };
    this.currentPage = this.currentPage;
    this.applyFilters();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  editAction() { }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  get totalPages() {
    const filtered = this.transactionFilterService.filterTransactions(this.transactions, this.filters);
    return Math.ceil(filtered.length / this.pageSize);
  }

  cancelTransaction(transaction: any) {
    if (confirm('Tem certeza que deseja cancelar esta transação?')) {
      transaction.stats = 'CANCELADO';
      // Chamar o backend para atualizar a transação
    }
  }
}