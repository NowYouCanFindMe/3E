import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { CompressorComponent } from './compressor/compressor.component';
import { UsageComponent } from './usage/usage.component';
import { HomeComponent } from './home/home.component';

// charts
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LineSeriesService, BoxAndWhiskerSeriesService, DataLabelService } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-ng-grids';
import { PageService } from '@syncfusion/ej2-ng-grids';

// ng grid
import { AgGridModule } from 'ag-grid-angular';

// api calls
import { HttpClientModule } from '@angular/common/http';

// services
import { CompressorService } from './shared/services/compressor.service';
import { MeterService } from './shared/services/meter.service';
import { OvenService } from './shared/services/oven.service';
import { OvensComponent } from './ovens/ovens.component';


@NgModule({
  declarations: [
    AppComponent,
    CompressorComponent,
    HomeComponent,
    UsageComponent,
    OvensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    GridModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    BoxAndWhiskerSeriesService,
    CompressorService,
    CategoryService,
    DataLabelService,
    LineSeriesService, 
    MeterService,
    OvenService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
