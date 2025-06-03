<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">🔌 Charger Listings</h1>

      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="charger in chargers" :key="charger._id"
             class="bg-white rounded-xl p-4 shadow hover:shadow-md transition border border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-700">{{ charger.name }}</h2>
            <span class="text-sm px-2 py-1 rounded-full"
                  :class="charger.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
              {{ charger.status }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-1">Latitude: {{ charger.location.latitude }}</p>
          <p class="text-sm text-gray-600 mb-1">Longitude: {{ charger.location.longitude }}</p>
          <p class="text-sm text-gray-600 mb-1">Power Output: {{ charger.powerOutput }} kW</p>
          <p class="text-sm text-gray-600 mb-3">Connector Type: {{ charger.connectorType }}</p>
          <div class="flex gap-2">
            <button @click="openEditModal(charger)"
                    class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
            <button @click="deleteCharger(charger._id)"
                    class="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">Edit Charger</h3>
        <form @submit.prevent="updateCharger">
          <input v-model="form.name" placeholder="Name" class="w-full border px-3 py-2 rounded mb-3" required />
          <div class="flex gap-2 mb-3">
            <input v-model.number="form.location.latitude" placeholder="Latitude" class="w-1/2 border px-3 py-2 rounded" required />
            <input v-model.number="form.location.longitude" placeholder="Longitude" class="w-1/2 border px-3 py-2 rounded" required />
          </div>
          <select v-model="form.status" class="w-full border px-3 py-2 rounded mb-3" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input v-model.number="form.powerOutput" type="number" placeholder="Power Output (kW)" class="w-full border px-3 py-2 rounded mb-3" required />
          <input v-model="form.connectorType" placeholder="Connector Type" class="w-full border px-3 py-2 rounded mb-4" required />

          <div class="flex justify-end gap-2">
            <button type="button" @click="closeModal"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded">Cancel</button>
            <button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const chargers = ref([])
const showModal = ref(false)
const editingCharger = ref(null)

const form = ref({
  name: '',
  location: { latitude: '', longitude: '' },
  status: 'Active',
  powerOutput: 0,
  connectorType: ''
})

const fetchChargers = async () => {
  try {
    const res = await api.get('/stations')
    chargers.value = res.data
  } catch (err) {
    console.error('Fetch failed:', err)
  }
}

onMounted(fetchChargers)

const openEditModal = (charger) => {
  editingCharger.value = charger
  form.value = {
    name: charger.name,
    location: { ...charger.location },
    status: charger.status,
    powerOutput: charger.powerOutput,
    connectorType: charger.connectorType
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const updateCharger = async () => {
  try {
    const payload = {
      name: form.value.name,
      location: {
        latitude: parseFloat(form.value.location.latitude),
        longitude: parseFloat(form.value.location.longitude)
      },
      status: form.value.status,
      powerOutput: form.value.powerOutput,
      connectorType: form.value.connectorType
    }

    await api.put(`/stations/${editingCharger.value._id}`, payload)
    showModal.value = false
    await fetchChargers()
  } catch (err) {
    console.error('Update failed:', err)
  }
}

const deleteCharger = async (id) => {
  try {
    if (confirm('Are you sure you want to delete this charger?')) {
      await api.delete(`/stations/${id}`)
      await fetchChargers()
    }
  } catch (err) {
    console.error('Delete failed:', err)
  }
}
</script>
