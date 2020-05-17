import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { parse } from 'querystring';
import { PushNotifiationsSubscriptionModel } from './notificationModels';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url: string = 'https://vaptapps.evalueserve.com/PIB/PIBAPI/api/';
  pushSubscriptionModel = <PushNotifiationsSubscriptionModel>{};

  constructor(private httpClient: HttpClient) { }
  httpOptions: any

  getNotification(): Observable<any> {
    return this.httpClient.get(this.url + 'push');
  }

  sendNotification(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'events'
    };

    return this.httpClient.get(this.url + 'publickey');
  }

  postDataToServer(subscription: PushSubscription, loginModel: number): any {
    alert('Push subscription Endpoint' + subscription.endpoint);
    alert('Push subscription public keys' + subscription.getKey("p256dh"));
    alert('Push subscription private keys' + subscription.getKey("auth"));
    this.pushSubscriptionModel.pushSubscription = subscription;
    this.pushSubscriptionModel.userId = parseInt("10");
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'events'
    };

    return this.httpClient.post(this.url + 'push', this.pushSubscriptionModel, this.httpOptions)
  }

  
  sendPushNotificationsServer(subscription: PushSubscription): any {
    console.log('started send push notifications');
    console.log('Push Subscription::' + subscription);
    console.log('Push Subscription endpoint' + subscription.endpoint);
    alert('Sending Push Notifications ndpoint'+ subscription.endpoint);
    
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'events'
    };

    return this.httpClient.post(this.url + 'publickey', subscription, this.httpOptions)
  }


  getPublicKey(): Observable<any> {
    return this.httpClient.get(this.url + 'publickey')
  }
}
