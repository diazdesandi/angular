import { Injectable } from '@angular/core';
import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map | undefined;
  // private map?: Map;'
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  constructor(private directionsApi: DirectionsApiClient) {}

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('Mapa no inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }

  createMarkers(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('Mapa no inicializado');

    this.markers.forEach((marker) => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`<h6>${place.text}</h6>
      <span>${place.place_name}</span>`);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }

    // Se reañaden los marcadores.
    this.markers = newMarkers;

    if (places.length === 0) return;

    // Límites del Mapa
    const bounds = new LngLatBounds();

    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));

    this.map.fitBounds(bounds);
  }

  getRoute(start: [number, number], end: [number, number]) {
    this.directionsApi
      .get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((resp) => this.drawPolyLine(resp.routes[0]));
  }

  // Dibujar lineas
  private drawPolyLine(route: Route) {
    console.log({ kms: route.distance / 1000, duration: route.duration / 60 });

    if (!this.map) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline | LineString
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'blue',
        'line-width': 3,
      },
    });
  }
}
