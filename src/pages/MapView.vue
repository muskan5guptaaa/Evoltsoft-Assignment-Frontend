<template>
  <div id="map" class="h-[500px] w-full rounded-lg shadow-md"></div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import api from '../services/api'

onMounted(async () => {
  // Initialize the map
  const map = L.map('map').setView([20.5937, 78.9629], 5) // Default view over India (or adjust)
  
  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  try {
    const res = await api.get('/stations')
    const chargers = res.data

    const bounds = []

    chargers.forEach(charger => {
      const lat = charger?.latitude ?? charger?.location?.latitude
      const lng = charger?.longitude ?? charger?.location?.longitude

      if (lat && lng) {
        const marker = L.marker([lat, lng]).addTo(map)
        marker.bindPopup(`<b>${charger.name}</b><br>Status: ${charger.status}`)
        bounds.push([lat, lng])
      }
    })

    // Auto-fit map to show all markers
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [20, 20] })
    }
  } catch (error) {
    console.error('Failed to fetch charging stations:', error)
  }
})
</script>

<style scoped>
#map {
  height: 500px;
}
</style>
