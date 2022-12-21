import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CovidStatistics } from '../data.interface';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnChanges {

  @Input() public covidHistoricalData: CovidStatistics[] = [];
  @Input() public selectedCountry: string = '';
  
  highcharts = Highcharts;
  public chartOptions: any;
  private categories = ['cases','deaths','tests'];
  
  constructor() { }

  /**
   * If there is any data from input, then we initialize the chart options and render it on UI
   * @param changes 
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if(this.selectedCountry.length){
      this.generateSeriesForChart();
      this.chartOptions = {   
        chart: {
           type: "column"
        },
        title: {
           text: "Covid-19 Statistics As Of Date and By Country"
        },
        xAxis:{
           categories: this.generateXSeriesData()
        },
        series: this.generateSeriesForChart()
     };
    }
  }

  /**
   * This function generates series data for the chart
   * @returns 
   */
  private generateSeriesForChart(): any[]{
    let series = [];
    for(let category of this.categories){
      let data:number[] = [];
      for(let val of this.covidHistoricalData){
        data.push( (val as any)[category]['total']);
      }
      series.push({name: category, data: data});
    }
    return series;
  }

  /**
   * This function generates the x axis category data for the chart
   * @returns 
   */
  private generateXSeriesData(): any[]{
    let series = [];
    for(let val of this.covidHistoricalData){
      if(series.indexOf(val['time']) === -1){
        series.push(this.formatDate(val['time']));
      }
    }
    return series;
  }

  private formatDate(date: any): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
