import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// modules
import { UsageChartsModule } from './charts/usagecharts.module';
import { UsageComponent } from './usage/usage.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsageChartsModule,
    ChartsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
