<template>
  <form @submit.prevent="save">
    <input v-model="form.name" placeholder="Name" />
    <select v-model="form.status">
      <option>Available</option>
      <option>Unavailable</option>
    </select>
    <input v-model="form.powerOutput" placeholder="Power (kW)" type="number" />
    <input v-model="form.connectorType" placeholder="Connector Type" />
    <button type="submit">Save</button>
    <button type="button" @click="$emit('close')">Cancel</button>
  </form>
</template>
<script setup>
import { reactive, watch, onMounted } from 'vue'
import api from '../services/api'

const props = defineProps({ charger: Object })
const emit = defineEmits(['close'])

const form = reactive({ name: '', status: '', powerOutput: 0, connectorType: '' })

watch(() => props.charger, (val) => {
  if (val) Object.assign(form, val)
}, { immediate: true })

const save = async () => {
  if (props.charger && props.charger._id) {
    await api.put(`/chargers/${props.charger._id}`, form)
  } else {
    await api.post('/chargers', form)
  }
  emit('close')
}
</script>

