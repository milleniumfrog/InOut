import { Component } from '@angular/core'; 
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EntriesProvider, InoutEntry, DateFormat } from '../../providers/entries/entries';

/**
 * Generated class for the AddEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {
  private inputObj: any = {
    repeat: {repeat: false}
  };
  private actualDate: string = InoutEntry.formatDate(Date.now(), DateFormat.dateInput);
  private showSubList: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private entriesProv: EntriesProvider, public events: Events) {
    this.showSubList = 'none'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryPage');
  }
  changeInputObj (ev: any, name: string) {
    this.inputObj[name] = ev.target.value;
  }

  addEntryToStorage (factor: number){
    this.inputObj.price *= factor;
    let inout = InoutEntry.toObject(JSON.stringify(this.inputObj));
    this.entriesProv.set(inout);
    this.events.publish('reloadData');
  };

  timeAsNumber (ev: any) {
    let d = new Date(ev.target.value);
    return d.getTime();
  }

}
