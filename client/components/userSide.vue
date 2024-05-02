<template>
  <a-layout-sider
    :theme="theme"
    :collapsed-width="80"
    :trigger="null"
    :collapsed="collapsed"
    class="custom-sidebar"
    style="height: 100vh;"
  >
    <div class="sidebar-content">
      <nuxt-link
        v-for="item in sidebarItems"
        :key="item.key"
        :to="item.route"
        :exact="true"
        :exact-active-class="'active-button'"
      >
        <a-button
          :class="{ 'active-button': activeButton === item.key }"
          style="margin-bottom: 10px; 
          width: 100%; 
          background-color: transparent; 
          border: none; 
          padding: 20px 30px; 
          color: #f3fefe; 
          text-align: left;"
          @click="handleSidebarItemClick(item.key)"
        >
          <a-icon :component="item.icon" style="margin-right: 8px; margin-bottom: 5px; vertical-align: middle;" />
          <span class="button-text">{{ item.title }}</span>
        </a-button>
      </nuxt-link>
    </div>
  </a-layout-sider>
</template>

<script>
import { Layout, Button } from 'ant-design-vue';
import Icon from '@ant-design/icons-vue';
import { UserOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    'a-layout-sider': Layout.Sider,
    'a-button': Button,
    'a-icon': Icon
  },
  data() {
    return {
      theme: 'dark',
      collapsed: false,
      sidebarItems: [
        { key: 'home', icon: HomeOutlined, title: 'Home', route: '/user/home' },
        { key: 'settings', icon: SettingOutlined, title: 'Settings', route: '/user/settings' },
        { key: 'account', icon: UserOutlined, title: 'Account', route: '/user/account' }
      ],
      activeButton: null
    }
  },
  methods: {
    handleSidebarItemClick(key) {
      this.activeButton = key;
      console.log('Clicked on item with key:', key)
    }
  }
}
</script>

<style>
.sidebar-content {
  padding: 20px;
}

.button-text {
  display: inline-block;
}
  
.active-button {
  background-color: #4b8af1; 
  color: #ffffff; 
  border-radius: 20px; 
  padding: 10px 0px; 
  text-align: center; 
  transition: background-color 0.5s ease; 
}

.custom-sidebar {
  background-color: #101731; 
  position: fixed;
}

.ant-layout-sider.custom-sidebar {
  background-color: #101731 !important;
  position: fixed;
}
</style>
