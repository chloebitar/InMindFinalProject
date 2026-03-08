import { Component, AfterViewInit, output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-picker',
  standalone: true,
  templateUrl: './map-picker.html',
  styleUrl: './map-picker.scss',
})
export class MapPicker implements AfterViewInit {
  pinned = output<{ lat: number; lng: number }>();

  private map!: L.Map;
  private marker?: L.Marker;

  private customIcon = L.icon({
    iconUrl: 'assets/icons/pin.svg',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  ngAfterViewInit() {
    this.map = L.map('map').setView([33.8938, 35.5018], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.map.on('click', ({ latlng }: L.LeafletMouseEvent) => {
      const { lat, lng } = latlng;

      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng], { icon: this.customIcon }).addTo(this.map);
      }

      this.pinned.emit({ lat, lng });
    });
  }

  async useCurrentLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject),
      );

      const { latitude: lat, longitude: lng } = position.coords;

      this.map.setView([lat, lng], 15);

      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng], { icon: this.customIcon }).addTo(this.map);
      }

      this.pinned.emit({ lat, lng });
    } catch (error) {
      alert('Unable to get location');
      console.error(error);
    }
  }
}
