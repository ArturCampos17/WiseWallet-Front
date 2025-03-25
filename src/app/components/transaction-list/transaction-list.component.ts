import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap'; 
import { NbAccordionModule } from '@nebular/theme'; // Importar o módulo de accordion

import { TransactionService } from '../services/transaction.service';
import { TransactionFilterService } from '../services/transaction-filter.service';

interface Transaction {
  id: number;
  description: string;
  recipient: string;
  paymentType:String;
  stats:String;
  type: 'ENTRADA' | 'SAIDA';
  amount: number;
  code: string;
  category: string;
  situation: 'PAGO' | 'PENDENTE' | 'CANCELADO' | 'ATRASADO';
  date: string;
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    NbAccordionModule,
    NgbTypeaheadModule, 
    DecimalPipe
  ]
})

export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  allFilteredTransactions: Transaction[] = [];

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
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getUserTransactions().subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Erro ao carregar transações:', error);
      }
    );
  }

  applyFilters() {
    this.allFilteredTransactions = this.transactionFilterService.filterTransactions(this.transactions, this.filters);
    this.collectionSize = this.allFilteredTransactions.length;
    this.filteredTransactions = this.transactionFilterService.paginateTransactions(
      this.allFilteredTransactions,
      this.currentPage,
      this.pageSize
    );
  }

  getTotalEntrada(): number {
    return this.allFilteredTransactions
      .filter(transaction => transaction.type === 'ENTRADA')
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  }

  getTotalSaida(): number {
    return this.allFilteredTransactions
      .filter(transaction => transaction.type === 'SAIDA')
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  }

  getTotalAmount(): number {
    return this.getTotalEntrada() - this.getTotalSaida();
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
    this.currentPage = this.currentPage;;
    this.applyFilters();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.allFilteredTransactions.length / this.pageSize);
  }

  cancelTransaction(transaction: Transaction) {
    if (confirm('Tem certeza que deseja cancelar esta transação?')) {
      transaction.situation = 'CANCELADO';
      // Chamar o backend para atualizar a transação
    }
  }

  editAction(){

  }
}