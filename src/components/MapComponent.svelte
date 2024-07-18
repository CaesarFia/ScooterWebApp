<script lang='ts'>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    // import 'mapbox-gl/dist/mapbox-gl.css'; 
  
    let map: mapboxgl.Map;
  const mapboxAccessToken = 'pk.eyJ1IjoiY2Flc2FyZmlhIiwiYSI6ImNseTdxanEwNzA5aXQycW9lMDh6YmFrc2UifQ.CpwPntFIV276Nb755rg-Pg';


  onMount(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/caesarfia/clxzna0zz006q01p80zkl9v03'
    });

    // example locations:

    // interface Location {
    //     latitude: number;
    //     longitude: number;
    // }

    // const locations: Location[] = [
    //     { latitude: 29.650201, longitude: -82.340019 }, 
    //     { latitude: 29.648469, longitude: -82.349935 }, 
    //     { latitude: 29.637931, longitude: -82.368317 },  
    // ];

    // locations.forEach(location => {
    //     new mapboxgl.Marker()
    //         .setLngLat([location.longitude, location.latitude])
    //         .addTo(map);
    // });
  });
  </script>
  
  <style>
  </style>
  
  <div id="map" class="absolute h-screen z-0 w-screen m-0 p-0">
  </div>
  