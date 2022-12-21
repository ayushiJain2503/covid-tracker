import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.interceptApiRequest(req, next);
  }

  private interceptApiRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const headers = {'X-RapidAPI-Host': '', 'X-RapidAPI-Key': '' };

    if(!req.headers.has('X-RapidAPI-Host')){
      headers['X-RapidAPI-Host']='covid-193.p.rapidapi.com';
    }

    if(!req.headers.has('X-RapidAPI-Key')){
      headers['X-RapidAPI-Key']='7f98368bebmsh3450aa136d0c4b0p11fa77jsn0f976e6bc78d';
    }

    const reqWithHeaders = req.clone({
      setHeaders: headers
    });

    return next.handle(reqWithHeaders).pipe(
      map(response => {
        return this.getValidResponse(response);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private getValidResponse(response: any): any{
    if(response?.status >=200 && response?.status <=300){
      return response;
    }
    if(response?.status === 401 && response?.status === 403){
      return throwError(new Error('HTTP API call failed with response '+ response?.status));
    }
  }
}
 