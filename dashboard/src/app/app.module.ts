import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// modules
import { UsageComponent } from './usage/usage.component';

// charts
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-ng-grids';
import { PageService } from '@syncfusion/ej2-ng-grids';

// ng grid
import { AgGridModule } from 'ag-grid-angular';

// api calls
import { HttpClientModule } from '@angular/common/http';

// services
import { MeterService } from './shared/services/meter.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    GridModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [MeterService, CategoryService, LineSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
