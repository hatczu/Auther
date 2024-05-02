<template>
  <a-layout>
    <sidebar />
    <a-layout-content>
      <div class="profile-container">
        <h1 class="welcome-title">Welcome, <span class="username">Username</span>!</h1>
        <p class="welcome-message">Your journey starts here. Explore and connect.</p>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
definePageMeta({
  middleware: ["auth"]
})

import sidebar from '@/components/userSide.vue';
import { Layout } from 'ant-design-vue';

export default {
  components: {
    sidebar,
    'a-layout': Layout,
    'a-layout-content': Layout.Content,
  },
}
</script>

<style scoped>
.profile-container {
  background: #fff;
  padding: 24px;
  min-height: 100vh;
  text-align: center;
}

.welcome-title {
  font-size: 2em;
  color: #2f3445;
}

.username {
  color: #4b8af1;
}

.welcome-message {
  font-size: 1.2em;
  color: #888888;
  margin-top: 10px;
}
</style>
