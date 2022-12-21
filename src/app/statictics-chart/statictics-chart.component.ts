import { Component, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CovidStatistics } from '../data.interface';

@Component({
  selector: 'app-statictics-chart',
  templateUrl: './statictics-chart.component.html',
  styleUrls: ['./statictics-chart.component.scss']
})
export class StaticticsChartComponent implements OnChanges {

  @Input() public countries: string[] = [];
  @Input() public covidData: CovidStatistics[] = [];
  @Input() public selectedCountry: string = '';

  public highcharts = Highcharts;
  public chartOptions: any;
  private categories = ['cases','deaths','tests'];

  constructor() { }

  /**
   * Initializing the chart options when we have some data from the API call as input
   */
  public ngOnChanges(): void {
    if(this.covidData?.length) {
      this.generateSeriesForChart();
      this.chartOptions = {   
        chart: {
           type: "column"
        },
        loading: {
          hideDuration: 1000,
          showDuration: 1000
        },
        title: {
           text: "Covid-19 Statistics"
        },
        xAxis:{
           categories: this.selectedCountry === 'All' ? this.countries: [this.selectedCountry]
        },
        series: this.generateSeriesForChart()
     };
    }
  }

  /**
   * This function is used to generate series for chart on the basis of categories defined
   * @returns chart series
   */
  private generateSeriesForChart(): any[]{
    let series = [];
    for(let category of this.categories){
      let data:number[] = [];
      for(let val of this.covidData){
        data.push( (val as any)[category]['total']);
      }
      series.push({name: category, data: data});
    }
    return series;
  }
}
