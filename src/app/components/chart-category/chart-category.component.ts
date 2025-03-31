import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { CategoryService } from '../services/category.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-chart-category',
  templateUrl: './chart-category.component.html',
  styleUrls: ['./chart-category.component.css']
})
export class ChartCategoryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chartInstance: any;
  private isChartCreated = false;

  selectedPeriod: string = 'year'; 
  selectedMonth: string = '';      
  selectedYear: number | null = null;
  
  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
  }

  ngAfterViewInit(): void {
    this.loadChartData();
  }

  onPeriodChange(): void {
   
    this.loadChartData();
  }

  onMonthChange(): void {
   
    this.loadChartData();
  }

  onYearChange(): void {
    
    this.loadChartData();
  }

  loadChartData(): void {
    Promise.all([
      this.categoryService.getCategory().toPromise(),
      this.transactionService.getUserTransactions().toPromise()
    ]).then(([categories, transactions]) => {
      if (!categories || categories.length === 0) {
        console.warn('Nenhuma categoria disponível.');
        return;
      }

      const activeCategories = categories.filter((cat: any) => cat.stats === 'A');
      if (activeCategories.length === 0) {
        console.warn('Nenhuma categoria ativa disponível.');
        return;
      }

      const filteredTransactions = this.filterTransactionsByPeriod(transactions);

      const categoryTotals = activeCategories.map((cat: any) => {
        const total = filteredTransactions
          .filter((tx: any) => tx.categoryId === cat.id)
          .reduce((sum: number, tx: any) => sum + tx.amount, 0);
        return { name: cat.name, total };
      });

      console.table(categoryTotals);

      const labels = categoryTotals.map((item: any) => item.name);
      const values = categoryTotals.map((item: any) => item.total);
      const backgroundColors = this.generateColors(categoryTotals.length);

      this.createChart(labels, values, backgroundColors, categoryTotals);
    }).catch(error => {
      console.error('Erro ao carregar dados:', error);
      alert('Não foi possível carregar os dados. Tente novamente mais tarde.');
    });
  }

  filterTransactionsByPeriod(transactions: any[]): any[] {
    const today = new Date();

    switch (this.selectedPeriod) {
      case 'week':
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() + 6));
        return transactions.filter((tx: any) => {
          const txDate = new Date(tx.date);
          return txDate >= startOfWeek && txDate <= endOfWeek;
        });

      case 'month':
        if (!this.selectedMonth) {
          return transactions; 
        }
        const [year, month] = this.selectedMonth.split('-').map(Number);
        return transactions.filter((tx: any) => {
          const txDate = new Date(tx.date);
          return txDate.getFullYear() === year && txDate.getMonth() + 1 === month;
        });

      case 'year':
        if (!this.selectedYear) {
          return transactions; 
        }
        return transactions.filter((tx: any) => {
          const txDate = new Date(tx.date);
          return txDate.getFullYear() === this.selectedYear;
        });

      default:
        return transactions; 
    }
  }

  generateColors(count: number): string[] {
    const predefinedColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    const colors: string[] = [];

    for (let i = 0; i < count; i++) {
      colors.push(predefinedColors[i % predefinedColors.length]);
    }

    return colors;
  }

  createChart(labels: string[], values: number[], backgroundColors: string[], categoryTotals: any[]): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Gastos por Categoria',
            data: values,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribuição de Gastos por Categoria',
            font: {
              size: 18
            }
          },
          legend: {
            display: true,
            position: 'right'
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const category = categoryTotals[tooltipItem.dataIndex];
                return `${category.name}: R$ ${category.total.toFixed(2)}`;
              }
            }
          }
        }
      }
    });

    this.isChartCreated = true;
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}