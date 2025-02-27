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
      return this.transactions.filter((transaction) => {
        const matchesDescription =
          !this.filterDescription ||
          transaction.description.toLowerCase().includes(this.filterDescription.toLowerCase());
        const matchesCategory =
          !this.filterCategory || transaction.category === this.filterCategory;
        const matchesSituation =
          !this.filterSituation || transaction.stats === this.filterSituation;
        const matchesDate =
          !this.filterDate || transaction.date === this.filterDate;
  
        return matchesDescription && matchesCategory && matchesSituation && matchesDate;
      });
    }
  
    getTotalAmount() {
      return this.filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
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
  }
 
  //   // Dados das transações
 
  //   transactions: any[] = [];
  //   filteredTransactions: any[] = [];
  //   paginatedTransactions: any[] = [];
  
  //   // Paginação
  //   currentPage: number = 1;
  //   itemsPerPage: number = 5;
  
  //   constructor(
  //     private authService: AuthService, // Serviço de autenticação
  //     private transactionService: TransactionService
  //   ) {}
  
  //   ngOnInit(): void {
  //     // Verificar se o usuário está autenticado
  //     if (!this.authService.getIsAuthenticated()) {
  //       console.error('Usuário não autenticado.');
  //       return;
  //     }
  
  //     // Buscar os detalhes do usuário
  //     this.authService.fetchUserDetails().subscribe(
  //       (user) => {
  //         const userEmail = user.email; // Extrair o email do usuário
  //         this.authService.setUserEmail(userEmail); // Armazenar o email no serviço
  
  //         // Carregar transações do usuário
  //         this.loadTransactions(userEmail);
  //       },
  //       (error) => {
  //         console.error('Erro ao buscar detalhes do usuário:', error);
  //       }
  //     );
  //   }
  
  //   // Carregar transações do usuário vinculado
  //   loadTransactions(userEmail: string): void {
  //     const token = localStorage.getItem('jwtToken'); // Obter o token JWT
  
  //     if (!token) {
  //       console.error('Token JWT não encontrado.');
  //       return;
  //     }
  
  //     this.transactionService.getTransactionsByEmail(userEmail, token).subscribe(
  //       (data: any[]) => {
  //         // Salvar os dados recebidos
  //         this.transactions = data.map(transaction => ({
  //           ...transaction,
  //           date: new Date(transaction.date) // Converter a data para objeto Date
  //         }));
  //         this.filteredTransactions = [...this.transactions]; // Inicializar os filtros
  //         this.updatePagination(); // Atualizar a paginação
  //       },
  //       (error) => {
  //         console.error('Erro ao carregar transações:', error);
  //       }
  //     );
  //   }
  
  //   // Aplicar filtros
  //   applyFilters(): void {
  //     this.filteredTransactions = this.transactions.filter(transaction => {
  //       return (
  //         (!this.filters.description || transaction.description.toLowerCase().includes(this.filters.description.toLowerCase())) &&
  //         (!this.filters.category || transaction.category === this.filters.category) &&
  //         (!this.filters.situation || transaction.situation === this.filters.situation) &&
  //         (!this.filters.date || transaction.date.toISOString().split('T')[0] === this.filters.date)
  //       );
  //     });
  //     this.currentPage = 1; // Resetar para a primeira página
  //     this.updatePagination();
  //   }
  
  //   // Atualizar a lista paginada
  //   updatePagination(): void {
  //     const start = (this.currentPage - 1) * this.itemsPerPage;
  //     const end = start + this.itemsPerPage;
  //     this.paginatedTransactions = this.filteredTransactions.slice(start, end);
  //   }
  
  //   // Alterar número de itens por página
  //   onItemsPerPageChange(): void {
  //     this.currentPage = 1; // Resetar para a primeira página
  //     this.updatePagination();
  //   }
  
  //   // Cancelar uma transação
  //   cancelTransaction(transaction: any): void {
  //     if (transaction.situation !== 'Cancelado') {
  //       transaction.situation = 'Cancelado';
  //     }
  //   }
  
  //   // Calcular o total
  //   getTotalAmount(): number {
  //     return this.filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  //   }
  // }



 