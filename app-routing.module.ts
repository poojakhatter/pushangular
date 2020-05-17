import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { WeatherForecastComponent } from './weatherforcast/weatherforcast.component';


const routes: Routes = [
  {path:'',component:WeatherForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
