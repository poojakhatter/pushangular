import { Component, OnInit } from '@angular/core';
import { SwPush } from '../../../../node_modules/@angular/service-worker';
import { NotificationService } from '../notification.service';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-push-subscriber',
  templateUrl: './push-subscriber.component.html',
  styleUrls: ['./push-subscriber.component.css']
})
export class PushSubscriberComponent implements OnInit {

  private _subscription: PushSubscription;
  public operationName: string;
 // baseUrl: string = 'http://localhost:63582/'
  baseUrl: string = 'https://vaptapps.evalueserve.com/PIB/PIBAPI/';
  private httpOptions: any;

  constructor(private swPush: SwPush, private notification: NotificationService, private httpClient: HttpClient) {


  }

  ngOnInit() {
    //this.swPush.subscription.subscribe((subscription) => {
    //  this._subscription = subscription;
    //  console.log(this._subscription)
    //  alert('subs' + this._subscription);
    
    //});
    this.subscribe();
  }

  operation() {
    console.log(this._subscription);
    (this._subscription === null) ? this.subscribe() : this.unsubscribe(this._subscription.endpoint);
  }

  private subscribe() {

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'events'
    };


    // Retrieve public VAPID key from the server
    this.notification.getPublicKey().subscribe(P => {
      alert('Get key success');
      // Request subscription with the service worker
      this.swPush.requestSubscription({
        serverPublicKey: P.publicKey
      })
        // Distribute subscription to the server
        .then(subscription =>
          this.notification.postDataToServer(subscription, 20).subscribe(
          () => {
            this.operationName = (subscription === null) ? 'Subscribe' : 'Unsubscribe';
            console.log('Notifications subscribed success');
            this.SendNotifications(subscription);
          },
          error => console.error(error)
        ))
        .catch(error => {
          console.error(error)

        });
    },
      error => console.error(error));
  }


  
  SendNotifications(subscription:PushSubscription) {
    alert('Sending notifications');
    this.notification.sendPushNotificationsServer(subscription);

    //this.notification.getNotification();
    console.log('Push notifications sent');
  }



  unsubscribe(endpoint) {
    this.swPush.unsubscribe()
      .then(() => this.httpClient.delete(this.baseUrl + 'api/PushSubscriptions/' + encodeURIComponent(endpoint)).subscribe(() => { },
        error => console.error(error)
      ))
      .catch(error => console.error(error));

  }


}
