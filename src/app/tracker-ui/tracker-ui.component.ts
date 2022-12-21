import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { CovidStatistics } from '../data.interface';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-tracker-ui',
  templateUrl: './tracker-ui.component.html',
  styleUrls: ['./tracker-ui.component.scss']
})
export class TrackerUiComponent implements OnInit {

  @Output() emitSelectedCOuntry: EventEmitter<string> = new EventEmitter<string>;
  public countryList: string[] = [];
  public covidData: CovidStatistics[] = [];
  public selectedCountry: string = 'All';
  public selectedDay: string = '';
  public covidHitoricalData: CovidStatistics[] = [];

  public covidForm: FormGroup = new FormGroup({  
    countries: new FormControl(),
    day: new FormControl()  
  });

  constructor(private httpService: HttpService) { }

  /**
   * We are fetching initial data and setting default value on load
   */
  public ngOnInit(): void {
    this.fetchCountries();
    this.fetchStatistics();
    this.covidForm.get('countries')?.setValue('All');
    this.covidForm.get('day')?.setValue((this.formatDate(new Date())));
  }

  /**
   * This function fetches country related covid data on the dropdown value change
   */
  public getCountryStatistics(): void{
    let country;
    this.getSelectedCountry();
    if(this.selectedCountry === 'All'){
      country = '';
    }else{
      country = this.selectedCountry;
    }
    this.emitSelectedCOuntry.emit(this.selectedCountry);
    this.fetchStatistics(country);
    this.fetchHistoricalData(this.selectedCountry,this.selectedDay);
  } 

  /**
   * This function triggers the historical statistic data fetch when the date is changes on UI
   */
  public getCountryHistoricalStatistics(): void{
    this.getSelectedDay();
    this.fetchHistoricalData(this.selectedCountry,this.selectedDay);
  }

  /**
   * This function gets the selected country from the form control dropdown
   */
  private getSelectedCountry(): void{
    this.selectedCountry = this.covidForm.get('countries')?.value;
  }

  /**
   * This function gets the selected day from the form control
   */
  private getSelectedDay(): void{
    this.selectedDay= this.covidForm.get('day')?.value;
  }

  /**
   * This function fetches list of countries
   */
  private fetchCountries(): void{
    this.httpService.getCountries().pipe(first()).subscribe((countries) => {
      this.countryList = countries?.response;
    },error => {
      throw new Error('Error in getting countries list'+error);
    });
  }

  /**
   * This function is used to fetch statistics of country
   * @param country 
   */
  private fetchStatistics(country?: string): void{
    this.httpService.getStatistics(country).pipe(first()).subscribe((statistic) => {
      this.covidData = statistic?.response;
    },error => {
      throw new Error('Error in getting statistic for the country'+error);
    });
  }

  /**
   * This function is used to fetch historical data on the basis of country and day
   * @param country 
   * @param day 
   */
  private fetchHistoricalData(country: string, day?:string): void{
    this.httpService.getHistory(country,day).pipe(first()).subscribe((historicalData) => {
      this.covidHitoricalData = historicalData?.response;
    },error => {
      throw new Error('Error in getting historical statistic for the country'+error);
    });
  }

  /**
   * This function is to format date in yyyy-mm-dd format
   * @param date 
   * @returns 
   */
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
