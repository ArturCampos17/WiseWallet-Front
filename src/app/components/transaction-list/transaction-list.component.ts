import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  // Filtros
  filterDescription: string = '';
  filterCategory: string = '';
  filterSituation: string = '';
  filterDate: string ='';

  // Opções para os selects
  categories: string[] = ['Lazer', 'Alimentação', 'Transporte', 'Moradia', 'Outros'];
  situations: string[] = ['Pago', 'Pendente', 'Agendado'];

  // Dados originais
  transactions: any[] = [
    { description: 'PIX', favored: "Criciuma EC", category: "Lazer", amount: 80, tipoPagamento: "Credito", situation: "Pago", date: new Date('2025/03/01') },
    { description: 'PIX', favored: "Santo Alho", category: "Alimentação", amount: 80, tipoPagamento: "Credito", situation: "Pendente", date: new Date('2025/03/12') },
    { description: 'Debito', favored: "Yoshin", category: "Alimentação", amount: 80, tipoPagamento: "Credito", situation: "Pago", date: new Date('2025/03/01') },
    { description: 'PIX', favored: "Santo Alho", category: "Lazer", amount: 80, tipoPagamento: "Credito", situation: "Pago", date: new Date('2025/03/01') }
  ];

  // Lista filtrada
  get filteredTransactions() {
    return this.transactions.filter(transaction => {
      return (
        (!this.filterDescription || transaction.description.toLowerCase().includes(this.filterDescription.toLowerCase())) &&
        (!this.filterCategory || transaction.category === this.filterCategory) &&
        (!this.filterSituation || transaction.situation === this.filterSituation)
        && (!this.filterDate || transaction.date.toISOString().split('T')[0] === this.filterDate)
      );
    });
  }

  getTotalAmount(): number{
    return this.filteredTransactions.reduce((total,transactions) => total + transactions.amount,0);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
