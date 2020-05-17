import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotificationComponent } from './notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { PushSubscriberComponent } from './notification/push-subscriber/push-subscriber.component';
import { WeatherForecastComponent } from './weatherforcast/weatherforcast.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    PushSubscriberComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
