<template>
  <a-layout>
    <a-layout-sider>
      <sidebar />
    </a-layout-sider>
    <a-layout-content>
      <div class="users-page">
        <div class="search-bar">
          <a-input-search placeholder="Search users" v-model:value="search" @search="fetchUsers" />
        </div>
        <div class="user-list">
          <div v-if="filteredUsers.length === 0 && search.trim() !== ''">
            <p>No results found</p>
          </div>
          <UserCard v-for="(user, index) in filteredUsers" :key="index" :user="user"
            @viewUserProfile="redirectToUserProfile" />
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import sidebar from '@/components/adminSide.vue';
import UserCard from '@/components/userList.vue';
import axios from 'axios';

export default {
  components: {
    UserCard,
    sidebar,
  },
  data() {
    return {
      users: [],
      search: ''
    };
  },
  created() {
    // Fetch all users initially
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        // If search is empty, fetch all users
        const url = this.search ? `localhost:8000/auth/user/search?q=${this.search}` : 'https://dummyjson.com/users';
        const response = await axios.get(url);
        if (response.status === 200) {
          this.users = response.data.users;
        } else {
          console.error('Failed to fetch users:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    },
    redirectToUserProfile(userId) {
      this.$router.push({ name: 'UserProfile', params: { id: userId } });
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        (user.firstName + ' ' + user.maidenName + ' ' + user.lastName)
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
.users-page {
  background: #fff;
  padding: 25px;
  height: 100%;
  text-align: center;
}

.search-bar {
  margin-bottom: 20px;
  padding: 10px;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>