import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly API_BASE_URL = 'https://covid-193.p.rapidapi.com';
  
  constructor(private http: HttpClient) { }

  public getCountries(): Observable<any> {
    return this.http.get(this.API_BASE_URL + '/countries', {
      context: withCache()
    });
  }

  public getStatistics(country?:string): Observable<any>{
    return this.http.get(this.API_BASE_URL + '/statistics' + (country?('?country=' + country):''), {
      context: withCache()
    });
  } 

  public getHistory(country: string, day?:string): Observable<any>{
    return this.http.get(this.API_BASE_URL + '/history?country=' + country + (day? ('&day=' + day):''), {
      context: withCache()
    });
  }
}