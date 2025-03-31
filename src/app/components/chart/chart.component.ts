import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chartInstance: any;
  private isChartCreated = false; 

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit chamado.');
    if (!this.isChartCreated) {
      this.createChart();
    }
  }

  createChart(): void {
    console.log('Criando gráfico...');
    if (this.chartInstance) {
      console.log('Destruindo gráfico existente.');
      this.chartInstance.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chartInstance = new Chart(ctx, {
      type: 'bar', 
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março','Abril',  'Maio','Junho'],
        datasets: [
          {
            label: 'Entrada',
            data: [1200, 1900, 3000,6000,5500,6800],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            borderRadius: 5, 
            borderSkipped: false,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
            hoverBorderColor: 'rgba(54, 162, 235, 1)' 
          },
          {
            label: 'Saida',
            data: [800, 1500, 2500,900,1850,1600,1450], 
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)', 
            borderWidth: 1,
            borderRadius: 5,
            borderSkipped: false, 
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.6)', 
            hoverBorderColor: 'rgba(255, 99, 132, 1)' 
          }
        ]
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Contas',
            font: {
              size: 18
            }
          },
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true 
          }
        },
        interaction: {
          mode: 'index',
          intersect: false 
        },
        hover: {
          mode: 'nearest', 
          intersect: false 
        },
        scales: {
          x: {
            stacked: false 
          },
          y: {
            beginAtZero: true 
          }
        }
      }
    });

    this.isChartCreated = true; 
    console.log('Gráfico criado com sucesso.');
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      console.log('Destruindo gráfico ao sair.');
      this.chartInstance.destroy(); 
    }
  }
}