import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild("map") mapElement: ElementRef
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService =new google.maps.DirectionsService;
  directionsDisplay =new google.maps.DirectionsRenderer;


  constructor(public navCtrl: NavController, private platform: Platform) {
    platform.ready().then(() => {
      this.initMap();
    })
  }
  
  initMap(){
    var happycode = {
      lat: 38.651309,
      lng: -9.060346
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 16,
      center: happycode,
      disableDefaultUI: true
    });

    var marker = new google.maps.Marker({
      position: happycode,
      map:this.map,
      title: 'My position!'
    });

  }

  calculateAndDisplayRoute(){
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'Driving'
    }, (response, status) => {
      if(status ==='Ok'){
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Direction request failed due to' + status);
      }
    })
  }

}
