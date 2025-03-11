  import { Component, OnInit } from '@angular/core';
  import { TransactionService } from '../services/transaction.service';
  
  @Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
  })

 
  export class TransactionListComponent implements OnInit {
    transactions: any[] = []; // Lista de todas as transações
    filterDescription: string = ''; // Filtro por descrição
    filterCategory: string = ''; // Filtro por categoria
    filterSituation: string = ''; // Filtro por situação
    filterDate: string = ''; // Filtro por data
    categories: string[] = ['Alimentação', 'Transporte', 'Lazer', 'Outros']; // Exemplo de categorias
    situations: string[] = ['PAGO', 'PENDENTE', 'CANCELADO', 'ATRASADO']; // Situações possíveis
    currentPage = 1; // Página atual
    pageSize = 15;

    constructor(private transactionService: TransactionService) {}
  
    ngOnInit(): void {
      this.loadTransactions();
    }
  
    loadTransactions() {
      // Carregar transações do backend
      this.transactionService.getUserTransactions().subscribe(
        (data) => {
          this.transactions = data;
        },
        (error) => {
          console.error('Erro ao carregar transações:', error);
        }
      );
    }
  
    get filteredTransactions() {
      return this.transactions
        .filter(transaction => {
          const matchesDescription = transaction.description.toLowerCase().includes(this.filterDescription.toLowerCase());
          const matchesCategory = !this.filterCategory || transaction.category === this.filterCategory;
          const matchesSituation = !this.filterSituation || transaction.stats === this.filterSituation;
          const matchesDate = !this.filterDate || transaction.date.toISOString().split('T')[0] === this.filterDate;
          return matchesDescription && matchesCategory && matchesSituation && matchesDate;
        })
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize); // Paginação
    }

    getTotalAmount() {
      return this.transactions
        .filter(transaction => {
          const matchesDescription = transaction.description.toLowerCase().includes(this.filterDescription.toLowerCase());
          const matchesCategory = !this.filterCategory || transaction.category === this.filterCategory;
          const matchesSituation = !this.filterSituation || transaction.stats === this.filterSituation;
          const matchesDate = !this.filterDate || transaction.date.toISOString().split('T')[0] === this.filterDate;
          return matchesDescription && matchesCategory && matchesSituation && matchesDate;
        })
        .reduce((total, transaction) => total + transaction.amount, 0);
    }

    isCancelable(transaction: any) {
      return transaction.stats !== 'CANCELADO';
    }

    editAction() {
      // Code for editing action
      console.log('Edit button clicked!');
    }
  
    cancelTransaction(transaction: any) {
      if (confirm('Tem certeza que deseja cancelar esta transação?')) {
        transaction.stats = 'CANCELADO';
        // Chamar o backend para atualizar a transação
        // this.transactionService.updateTransaction(transaction).subscribe(
        //   () => {
        //     console.log('Transação cancelada com sucesso');
        //   },
        //   (error) => {
        //     console.error('Erro ao cancelar transação:', error);
        //   }
        //);
      }
    }

    get totalPages() {
      return Math.ceil(
        this.transactions.filter(transaction => {
          const matchesDescription = transaction.description.toLowerCase().includes(this.filterDescription.toLowerCase());
          const matchesCategory = !this.filterCategory || transaction.category === this.filterCategory;
          const matchesSituation = !this.filterSituation || transaction.stats === this.filterSituation;
          const matchesDate = !this.filterDate || transaction.date.toISOString().split('T')[0] === this.filterDate;
          return matchesDescription && matchesCategory && matchesSituation && matchesDate;
        }).length / this.pageSize
      );
    }
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
    
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
 