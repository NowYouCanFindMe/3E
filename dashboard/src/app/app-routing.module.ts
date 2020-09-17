import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsageComponent } from './usage/usage.component';

const routes: Routes = [
  {path: '', redirectTo: '/home',  pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'usage', component: UsageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
