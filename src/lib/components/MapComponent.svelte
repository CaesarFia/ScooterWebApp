<script lang="ts">
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	export let scooterList: Scooter[] = [];
	export let userLocation: { latitude: number; longitude: number } | null = null;
	export let selectedScooter: Scooter | null = null;

	let map: mapboxgl.Map;
	let markers: Map<string, mapboxgl.Marker> = new Map();

	$: if (selectedScooter) {
		for (const [id, marker] of markers) {
			if (id === selectedScooter.id) {
				marker.getElement().style.backgroundColor = 'blue';
			} else {
				marker.getElement().style.backgroundColor = '';
			}
		}
	}

	const mapboxAccessToken =
		'pk.eyJ1IjoiY2Flc2FyZmlhIiwiYSI6ImNseTdxanEwNzA5aXQycW9lMDh6YmFrc2UifQ.CpwPntFIV276Nb755rg-Pg';
	interface Scooter {
		latitude: number;
		longitude: number;
		id: string;
	}

	onMount(() => {
		mapboxgl.accessToken = mapboxAccessToken;
		map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/caesarfia/clxzna0zz006q01p80zkl9v03'
		});

		for (const scooter of scooterList) {
			const marker = new mapboxgl.Marker({ scale: 1, anchor: 'center' })
				.setLngLat([scooter.longitude, scooter.latitude])
				.addTo(map);
			marker.getElement().addEventListener('click', () => {
				selectedScooter = scooter;
			});
			markers.set(scooter.id, marker);
		}

		if (userLocation) {
			new mapboxgl.Marker({ scale: 1, anchor: 'center', color: 'orange' })
				.setLngLat([userLocation.longitude, userLocation.latitude])
				.addTo(map);
		}
	});
</script>

<div id="map" class="!absolute h-screen z-0 w-screen !m-0 !p-0"></div>
<div class="overlay">
	<slot></slot>
</div>

<style>
	.overlay {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%, -20%);
		z-index: 1;
	}
</style>
