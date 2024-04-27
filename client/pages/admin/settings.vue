<!-- user.vue -->
<template>
  <a-layout>
    <!-- Use the correct component name -->
    <sidebar />

    <a-layout-content style="padding: 0 50px">
      <!-- Main Content -->
      <div style="background: #fff; padding: 24px; min-height: 280px">
        ADMIN SETTINGS
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
// Import the correct component name
import sidebar from '@/components/adminSide.vue'
import { Layout } from 'ant-design-vue'

export default {
  components: {
    // Use the correct component name
    sidebar,
    'a-layout': Layout,
    'a-layout-content': Layout.Content
  }
}
</script>

<style>
/* Your styles go here */
</style>
