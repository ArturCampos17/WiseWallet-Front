// transaction-filter.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionFilterService {
  filterTransactions(transactions: any[], filters: any): any[] {
    return transactions.filter(transaction => {
      const matchesDescription = transaction.description.toLowerCase().includes(filters.filterDescription.toLowerCase());
      const matchesCategory = !filters.filterCategory || transaction.category === filters.filterCategory;
      const matchesSituation = !filters.filterSituation || transaction.stats === filters.filterSituation;
      const matchesDate = !filters.filterDate || transaction.date.toISOString().split('T')[0] === filters.filterDate;
      return matchesDescription && matchesCategory && matchesSituation && matchesDate;
    });
  }

  paginateTransactions(transactions: any[], currentPage: number, pageSize: number): any[] {
    return transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }

  getTotalAmount(transactions: any[]): number {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }
}