<template>
    <a-card :style="{ marginBottom: '20px' }">
        <div class="user-info">
            <a-avatar :src="defaultAvatar" :size="80" style="margin-bottom: 10px;"></a-avatar>
            <div class="user-name">
                <strong>
                    <p>{{ user.username }}</p>
                </strong>
                <p>{{ user.email }}</p>
                <NuxtLink :to="`/user/${user.id}`">Edit Profile</NuxtLink>
            </div>
        </div>
    </a-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user: Object
});

const defaultAvatar = 'https://svgshare.com/i/4V0.svg';

</script>

<style scoped>
.profile-card {
    max-width: 400px;
    margin: 20px auto 0;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
    display: flex;
    align-items: center;
    padding: 20px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: #f5f5f5;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
}

.username {
    margin-left: 16px;
}

.profile-header h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
}

.email h3 {
    margin-bottom: 8px;
    font-size: 16px;
    color: #333;
}

.email p {
    margin: 4px 0;
    font-size: 14px;
    color: #666;
}
</style>