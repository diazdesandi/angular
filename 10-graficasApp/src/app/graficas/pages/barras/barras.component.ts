import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styles: [],
})
export class BarrasComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // scales: {
    //   x: {},
    //   y: {
    //     min: 10,
    //   },
    // },
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Graficos De Barra',
    //   },
    // },
  };

  public barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'> = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2016'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label:
          'Series A' /*backgroundColor: '#F00000',hoverBackgroundColor: 'red' */,
      },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
      { data: [8, 33, 70, 59, 65, 80, 100], label: 'Series C' },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    this.barChartData.datasets[1].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    this.barChartData.datasets[2].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    // console.log(this.randomize);
    this.chart?.update();
  }
}
