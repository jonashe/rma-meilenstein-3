import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';

import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    type: string = "";
    date: string = "";
    duration: number = 0;
    activitiesExist: boolean = false;

  constructor(public navCtrl: NavController, private storage: LocalStorageProvider, private events: Events) {
        this.storage = storage;
        this.loadLastActivity();
  }

    private loadLastActivity() {
        this.activitiesExist = (this.storage.amount > 0);

        if(this.activitiesExist){
            let activity = this.storage.getActivity(this.storage.amount-1);
            this.type = activity.type;
            this.date = activity.date;
            this.duration = activity.duration;
        }
    }

    addNewActivity(){
      this.events.publish('change-tab', 'addActivity');
      this.navCtrl.parent.select(1);
    }
}
