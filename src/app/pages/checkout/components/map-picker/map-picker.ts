import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-picker',
  standalone: true,
  templateUrl: './map-picker.html',
  styleUrl: './map-picker.scss',
})
export class MapPicker implements AfterViewInit {
  @Output() pinned = new EventEmitter<{ lat: number; lng: number }>();

  private map!: L.Map;
  private marker?: L.Marker;

  private customIcon = L.icon({
    iconUrl: 'assets/icons/pin.svg',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -42],
  });

  ngAfterViewInit() {
    this.map = L.map('map').setView([33.8938, 35.5018], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng], { icon: this.customIcon }).addTo(this.map);
      }

      this.pinned.emit({ lat, lng });
    });
  }

  useCurrentLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        this.map.setView([lat, lng], 15);

        if (this.marker) {
          this.marker.setLatLng([lat, lng]);
        } else {
          this.marker = L.marker([lat, lng], { icon: this.customIcon }).addTo(this.map);
        }

        this.pinned.emit({ lat, lng });
      },
      (error) => {
        alert('Unable to get your location.');
        console.error(error);
      },
    );
  }
}
