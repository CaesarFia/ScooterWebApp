<script lang='ts'>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
  
    let map: mapboxgl.Map;
  const mapboxAccessToken = 'pk.eyJ1IjoiY2Flc2FyZmlhIiwiYSI6ImNseTdxanEwNzA5aXQycW9lMDh6YmFrc2UifQ.CpwPntFIV276Nb755rg-Pg';


  onMount(() => {
    mapboxgl.accessToken = mapboxAccessToken;
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/caesarfia/clxzna0zz006q01p80zkl9v03'
    });
  });
  </script>
    
  <div id="map" class="absolute h-screen z-0 w-screen m-0 p-0">
  </div>
  