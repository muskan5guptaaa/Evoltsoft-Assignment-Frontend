<template>
  <div>
    <h2>Chargers</h2>
    <div>
      <input v-model="search" placeholder="Search by location" />
    </div>
    <ul>
      <li v-for="charger in filteredChargers" :key="charger._id">
        {{ charger.name }} - {{ charger.status }}
        <button @click="editCharger(charger)">Edit</button>
        <button @click="deleteCharger(charger._id)">Delete</button>
      </li>
    </ul>
    <ChargerForm v-if="selected" :charger="selected" @close="selected = null" />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import ChargerForm from '../components/ChargerForm.vue'

const chargers = ref([])
const selected = ref(null)
const search = ref('')

const fetchChargers = async () => {
  const res = await api.get('VITE_BASE_URLstations')
  chargers.value = res.data
}

onMounted(fetchChargers)

const editCharger = (charger) => {
  selected.value = charger
}

const deleteCharger = async (id) => {
  await api.delete(`/chargers/${id}`)
  fetchChargers()
}

const filteredChargers = computed(() =>
  chargers.value.filter(c =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>
