import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: "AIzaSyClnykvOYwFZeS_uy8Y12kXaQbmQqFYffA"
    })
    loader.load().then(() => {
      const cords = {lat: 50.0678663, lng: 19.9127801};
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: cords,
        zoom: 18,
      })
      const marker = new google.maps.Marker({
        position: cords,
        map: map,
      });

    })
  }

}
