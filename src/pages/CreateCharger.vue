<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 class="text-xl font-bold mb-4">Add Charging Station</h2>
      <form @submit.prevent="createCharger" class="space-y-4">
        <input
          v-model="form.name"
          class="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Station Name"
          required
        />

        <div class="flex gap-4">
          <input
            v-model.number="form.location.latitude"
            class="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="Latitude"
            required
          />
          <input
            v-model.number="form.location.longitude"
            class="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="Longitude"
            required
          />
        </div>

        <input
          v-model.number="form.powerOutput"
          class="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Power Output (kW)"
          required
        />

        <select
          v-model="form.connectorType"
          class="border border-gray-300 rounded px-3 py-2 w-full"
          required
        >
          <option disabled value="">Select Connector Type</option>
          <option value="Type1">Type 1</option>
          <option value="Type2">Type 2</option>
          <option value="CCS">CCS</option>
        </select>

        <select
          v-model="form.status"
          class="border border-gray-300 rounded px-3 py-2 w-full"
          required
        >
          <option disabled value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Create
        </button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        name: '',
        location: {
          latitude: '',
          longitude: ''
        },
        status: '',
        powerOutput: '',
        connectorType: ''
      }
    };
  },
  methods: {
    async createCharger() {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}stations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(this.form)
      });

      if (res.ok) {
        this.$router.push('/show'); // redirect to listing page
      } else {
        const error = await res.json();
        alert('Failed to create charger: ' + error.message);
      }
    }
  }
};
</script>
<style></style>


