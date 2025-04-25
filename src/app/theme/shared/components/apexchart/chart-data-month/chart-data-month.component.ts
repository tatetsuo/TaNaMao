// angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

// project import
import { WalletService } from 'src/app/core/services/wallet.service';
import { Transacao } from 'src/app/core/interfaces/usuario';

// third party
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-chart-data-month',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './chart-data-month.component.html',
  styleUrl: './chart-data-month.component.scss'
})
export class ChartDataMonthComponent implements OnInit {
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ApexOptions> = {};
  amount = 0;
  btnActive!: string;
  transactions: Transacao[] = [];
  fontSizeClass = '';

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.btnActive = 'month';
    
    this.setupChartOptions();
    
    // Obter transações iniciais
    this.transactions = this.walletService.getTransactions();
    const dailyData = this.processTransactionsForChart(this.transactions);
    this.updateChart(dailyData);
    
    // Inscrever para atualizações futuras
    this.walletService.transactions.subscribe(newTransactions => {
      this.transactions = newTransactions;
      this.updateChartData();
    });
    
    setTimeout(() => {
      this.updateChartData();
    }, 0);
  }

  setupChartOptions(): void {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 90,
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#FFF'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      series: [
        {
          name: 'Gastos',
          data: [0, 0, 0, 0, 0, 0, 0, 0] // valores iniciais para evitar undefineds
        }
      ],
      yaxis: {
        min: 0
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: true,
          formatter: (val) => `Dia ${val}`
        },
        y: {
          formatter: (val) => `R$ ${val.toFixed(2)}`
        },
        marker: {
          show: false
        }
      }
    };
  }

  handleKeyDown(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleActive(value);
      event.preventDefault(); // Prevent default scrolling for the spacebar key
    }
  }

  // public method
  toggleActive(value: string) {
    this.btnActive = value;
    this.updateChartData();
  }

  updateChartData(): void {
    if (!this.chartOptions || !this.chartOptions.series) {
      return; // Sair da função se as opções ainda não estiverem inicializadas
    }
    
    if (this.btnActive === 'month') {
      this.updateMonthlyData();
    } else {
      this.updateYearlyData();
    }
  }

  updateMonthlyData(): void {
    // Verificar se o objeto chartOptions está definido corretamente
    if (!this.chartOptions || !this.chartOptions.series) {
      console.error('Chart options não estão totalmente inicializadas');
      return;
    }
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Filtrar transações do mês atual - melhorar a filtragem para garantir datas corretas
    const monthlyTransactions = this.transactions.filter(transaction => {
      if (!transaction.data) return false;
      
      const transactionDate = new Date(transaction.data);
      return transactionDate instanceof Date && !isNaN(transactionDate.getTime()) && // Verificar se a data é válida
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear &&
             (transaction.tipo === 'saque' || transaction.tipo === 'pagamento' );
    });
    
    // Organizar dados por dia do mês
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dailyExpenses = Array(daysInMonth).fill(0);
    
    monthlyTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.data);
      const day = transactionDate.getDate();
      if (day >= 1 && day <= daysInMonth) {
        dailyExpenses[day - 1] += Math.abs(transaction.valor);
      }
    });
    
    // Calcular total mensal
    const totalMonthlyExpense = dailyExpenses.reduce((sum, value) => sum + value, 0);
    this.amount = totalMonthlyExpense;
    
    // Definir classe de tamanho de fonte com base no valor
    this.updateFontSizeClass(totalMonthlyExpense);
    
    // Atualizar série do gráfico (usar dados completos do mês para melhor visualização)
    // Criar uma cópia completa do objeto chartOptions para evitar erros de referência
    const newOptions = {...this.chartOptions};
    
    // Verificar onde estão os dados reais no mês para não exibir períodos vazios
    let firstDayWithData = 0;
    let lastDayWithData = dailyExpenses.length - 1;
    
    // Encontrar o primeiro dia com gastos
    for (let i = 0; i < dailyExpenses.length; i++) {
      if (dailyExpenses[i] > 0) {
        firstDayWithData = i;
        break;
      }
    }
    
    // Encontrar o último dia com gastos
    for (let i = dailyExpenses.length - 1; i >= 0; i--) {
      if (dailyExpenses[i] > 0) {
        lastDayWithData = i;
        break;
      }
    }
    
    // Se não houver dados, usar o mês inteiro
    if (firstDayWithData === 0 && dailyExpenses[0] === 0 && lastDayWithData === dailyExpenses.length - 1 && dailyExpenses[lastDayWithData] === 0) {
      firstDayWithData = 0;
      lastDayWithData = Math.min(dailyExpenses.length - 1, 29); // Limitar a 30 dias para visualização
    }
    
    // Obter os dados relevantes
    const relevantData = dailyExpenses.slice(firstDayWithData, lastDayWithData + 1);
    
    newOptions.series = [{
      name: 'Gastos',
      data: relevantData.length > 0 ? relevantData : [0]
    }];
    
    // Atualizar o tooltip para mostrar o dia do mês correto
    if (newOptions.tooltip) {
      newOptions.tooltip.x = {
        show: true,
        formatter: (val) => `Dia ${Math.floor(val) + firstDayWithData + 1}`
      };
    }
    
    // Atualizar as opções do gráfico com o novo objeto
    this.chartOptions = newOptions;
  }

  updateYearlyData(): void {
    // Verificar se o objeto chartOptions está definido corretamente
    if (!this.chartOptions || !this.chartOptions.series) {
      console.error('Chart options não estão totalmente inicializadas');
      return;
    }
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Filtrar transações do ano atual
    const yearlyTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.data);
      return transactionDate.getFullYear() === currentYear &&
      (transaction.tipo === 'saque' || transaction.tipo === 'pagamento' );
    });
    
    // Organizar dados por mês
    const monthlyExpenses = Array(12).fill(0);
    
    yearlyTransactions.forEach(transaction => {
      const month = new Date(transaction.data).getMonth();
      monthlyExpenses[month] += Math.abs(transaction.valor);
    });
    
    // Calcular total anual
    const totalYearlyExpense = monthlyExpenses.reduce((sum, value) => sum + value, 0);
    this.amount = totalYearlyExpense;
    
    // Definir classe de tamanho de fonte com base no valor
    this.updateFontSizeClass(totalYearlyExpense);
    
    // Criar uma cópia completa do objeto chartOptions para evitar erros de referência
    const newOptions = {...this.chartOptions};
    newOptions.series = [{
      name: 'Gastos',
      data: monthlyExpenses.length > 0 ? monthlyExpenses : [0]
    }];
    
    if (newOptions.tooltip) {
      newOptions.tooltip.x = {
        show: true,
        formatter: (val) => {
          const monthNames = [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          ];
          return monthNames[val - 1];
        }
      };
    }
    
    // Atualizar as opções do gráfico com o novo objeto
    this.chartOptions = newOptions;
  }
  
  // Método para determinar o tamanho da fonte com base no valor
  updateFontSizeClass(value: number): void {
    if (value >= 1000000) {
      this.fontSizeClass = 'font-xxs';
    } else if (value >= 100000) {
      this.fontSizeClass = 'font-xs';
    } else if (value >= 10000) {
      this.fontSizeClass = 'font-sm';
    } else {
      this.fontSizeClass = 'font-md';
    }
  }

  private processTransactionsForChart(transactions: Transacao[]) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Arrays para armazenar dados de receitas e despesas por dia
    const incomeByDay = Array(daysInMonth).fill(0);
    const expensesByDay = Array(daysInMonth).fill(0);
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.data);
      
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        const dayOfMonth = date.getDate();
        
        if (transaction.tipo === 'deposito' || transaction.tipo === 'receita' || transaction.tipo === 'reembolso') {
          incomeByDay[dayOfMonth - 1] += transaction.valor;
        } else if (transaction.tipo === 'saque' || transaction.tipo === 'pagamento') {
          expensesByDay[dayOfMonth - 1] += Math.abs(transaction.valor);
        }
      }
    });
    
    return { incomeByDay, expensesByDay, daysInMonth };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private updateChart(chartData: any) {
    // Implementação para atualizar as opções do gráfico com os dados processados
    const { incomeByDay, expensesByDay, daysInMonth } = chartData;
    
    // Preparar categorias do eixo X (dias do mês)
    const categories = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    
    // Atualizar as séries de dados do gráfico
    this.chartOptions.series = [
      {
        name: 'Receitas',
        data: incomeByDay
      },
      {
        name: 'Despesas',
        data: expensesByDay
      }
    ];
    
    // Atualizar as categorias do eixo X
    if (this.chartOptions.xaxis) {
      this.chartOptions.xaxis.categories = categories;
    }
    
    // Se necessário, atualizar outras opções do gráfico...
  }

  private processWeeklyTransactions(transactions: Transacao[]) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const incomeByWeek = Array(4).fill(0);
    const expensesByWeek = Array(4).fill(0);

    transactions.forEach(transaction => {
      const date = new Date(transaction.data);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        const weekIndex = Math.floor(date.getDate() / 7);
        const safeWeekIndex = Math.min(weekIndex, 3);
        if (transaction.tipo === 'deposito' || transaction.tipo === 'receita' || transaction.tipo === 'reembolso') {
          incomeByWeek[safeWeekIndex] += transaction.valor;
        } else if (transaction.tipo === 'saque' || transaction.tipo === 'pagamento') {
          expensesByWeek[safeWeekIndex] += Math.abs(transaction.valor);
        }
      }
    });

    return { incomeByWeek, expensesByWeek };
  }
}
