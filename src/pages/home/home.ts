import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ModalController, ToastController } from 'ionic-angular';
import { AddPlacePage } from "../add-place/add-place";
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places";
import { PlacePage } from "../place/place";
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private placesService: PlacesService,
            private androidPermissions: AndroidPermissions,
          private toastCtrl: ToastController,) {

          androidPermissions.requestPermissions(
           [
             androidPermissions.PERMISSION.CAMERA,
             androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
             androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
           ]
         );

  }

  ngOnInit() {
    this.placesService.fetchPlaces()
      .then(
        (places: Place[]) => this.places = places
      );


  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.places = this.placesService.loadPlaces();
      }
    );
  }

}
