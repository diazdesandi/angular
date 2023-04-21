import { Component, OnInit, ViewChild } from '@angular/core';
import { GraficasService } from '../../services/graficas.service';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [],
})
export class DonaHttpComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private graficasService: GraficasService) {}

  ngOnInit(): void {
    // this.graficasService.getUsarios().subscribe((data) => {
    //   // console.log(data);
    //   // const labels = Object.keys(data);
    //   // const values = Object.values(data);
    //   this.doughnutChartData = {
    //     labels: Object.keys(data),
    //     datasets: [{ data: Object.values(data) }],
    //   };
    // });

    this.graficasService.getDonutData().subscribe(({ labels, values }) => {
      this.doughnutChartData = { labels: labels, datasets: values };
      this.chart?.update();
    });
  }

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };

  public doughnutChartType: ChartType = 'doughnut';
}
