<script lang='ts'>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css'

    let map: mapboxgl.Map;
  const mapboxAccessToken = 'pk.eyJ1IjoiY2Flc2FyZmlhIiwiYSI6ImNseTdxanEwNzA5aXQycW9lMDh6YmFrc2UifQ.CpwPntFIV276Nb755rg-Pg';

  type Scooter = {
    latitude: number,
    longitude: number
  }

  let scooterList: Scooter[] =[{latitude: 29.644323 , longitude: -82.347999}, {latitude: 29.644780, longitude: -82.351581}]

  onMount( () => {
    mapboxgl.accessToken = mapboxAccessToken;
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/caesarfia/clxzna0zz006q01p80zkl9v03'
    });
    for (const scoot of scooterList) {
      new mapboxgl.Marker({scale: 1, anchor: 'center'}).setLngLat([scoot.longitude, scoot.latitude]).addTo(map)
    }
    new mapboxgl.Marker({scale: 1, anchor: 'center'}).setLngLat([-82.347999, 29.644323]).addTo(map);
    });
  </script>
  
  <style>
    .overlay {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -20%);
      z-index: 1;
    }
  </style>
  
  <div id="map" class="!absolute h-screen z-0 w-screen !m-0 !p-0"></div>
  <div class="overlay">
    <slot></slot>
  </div>
  