<script lang="ts">
	import type { Scooter } from '$lib/db/schema';
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	export let scooterList: Scooter[] = [];
	export let userLocation: { latitude: number; longitude: number } | null = null;
	export let selectedScooter: Scooter | null = null;

	let map: mapboxgl.Map;
	let markers: Map<string, mapboxgl.Marker> = new Map();
	let lastSelectedScooter: Scooter | null = selectedScooter;

	$: if (map && scooterList) {
		for (const [_, marker] of markers) {
			marker.remove();
		}

		for (const scooter of scooterList) {
			let marker = markers.get(scooter.id);
			if (!marker) {
				console.log(scooter.id, marker);
				marker = new mapboxgl.Marker({ scale: 1, anchor: 'center', color: 'blue' }).setLngLat([
					scooter.longitude,
					scooter.latitude
				]);
				marker.getElement().addEventListener('click', () => {
					selectedScooter = scooter;
				});
				markers.set(scooter.id, marker);
			}
			marker.addTo(map);
		}
	}

	$: if (selectedScooter) {
		// Reset the previously selected marker
		if (lastSelectedScooter) {
			const lssCopy = {...lastSelectedScooter};
			const selectedMarker = markers.get(lastSelectedScooter.id);
			if (selectedMarker) {
				selectedMarker.remove();

				const marker = new mapboxgl.Marker({ scale: 1, anchor: 'center', color: 'blue' }).setLngLat(
					[lastSelectedScooter.longitude, lastSelectedScooter.latitude]
				)
				if (scooterList.find(scooter => scooter.id === lssCopy.id)) {
					marker.addTo(map);
				}
				marker.getElement().addEventListener('click', () => {
					selectedScooter = lssCopy;
				});
				markers.set(lastSelectedScooter.id, marker);
			}
		}

		// Change the color of the selected marker
		const selectedMarker = markers.get(selectedScooter.id);
		if (selectedMarker) {
			selectedMarker.remove();

			const marker = new mapboxgl.Marker({ scale: 1, anchor: 'center', color: 'green' }).setLngLat([
				selectedScooter.longitude,
				selectedScooter.latitude
			]).addTo(map);
			marker.getElement().addEventListener('click', () => {
				selectedScooter = null;
			});
			markers.set(selectedScooter.id, marker);
		}

		// Set the lastSelectedScooter for next time
		lastSelectedScooter = selectedScooter;
	}

	const mapboxAccessToken =
		'pk.eyJ1IjoiY2Flc2FyZmlhIiwiYSI6ImNseTdxanEwNzA5aXQycW9lMDh6YmFrc2UifQ.CpwPntFIV276Nb755rg-Pg';

	onMount(() => {
		mapboxgl.accessToken = mapboxAccessToken;
		map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/caesarfia/clxzna0zz006q01p80zkl9v03'
		});

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
