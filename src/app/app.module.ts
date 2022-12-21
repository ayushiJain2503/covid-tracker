import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HighchartsChartModule} from 'highcharts-angular';
import { TrackerUiComponent } from './tracker-ui/tracker-ui.component';
import { InterceptorService } from './services/interceptor.service';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import { StaticticsChartComponent } from './statictics-chart/statictics-chart.component';
import { HistoryChartComponent } from './history-chart/history-chart.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    TrackerUiComponent,
    StaticticsChartComponent,
    HistoryChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    FormsModule,  
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    HttpCacheInterceptorModule.forRoot()  
  ],
  providers: [
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
