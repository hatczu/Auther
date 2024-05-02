<template>
    <div class="container">
        <a-form class="login-form" @submit.prevent="handleSubmit">
            <a-form-item>
                <a-input v-model:value="email" placeholder="Email or Username" prefix-icon="user" />
            </a-form-item>

            <a-form-item>
                <a-input-password v-model:value="password" placeholder="Password" prefix-icon="lock" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" class="btn-login">Login</a-button>
            </a-form-item>

            <div class="or-divider">
                <span>OR</span>
                <div class="divider-line"></div>
            </div>

            <a-form-item>
                <a-button type="primary" @click="handleGoogleLogin" class="btn-google">
                    <GoogleSquareFilled />
                    <span>Log in with Google</span>
                </a-button>
            </a-form-item>

            <div class="signup-link">
                <span>Don’t have an account?</span>
                <nuxt-link to="/register" class="btn-signup"> Sign up</nuxt-link>
            </div>
        </a-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Input, Button, message } from "ant-design-vue";
import Icon from "ant-design-vue/es/icon";
import axios from 'axios';

export default defineComponent({
    components: {
        'a-input': Input,
        'a-input-password': Input.Password,
        'a-button': Button,
        'a-icon': Icon
    },
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await axios.post('http://localhost:8000/auth/login', {
                    email: this.email,
                    password: this.password
                },
                { withCredentials: true }
            );
                
                localStorage.setItem('token', response.data.token);

                console.log(response.data);
                message.success('Login successful.');

                navigateTo('/user/home');
            } catch (error) {
                console.error('Login failed:', error);
                message.error('Incorrect username or password.');
            }
        },
        handleGoogleLogin() {
            // Handle Google login
        }
    }
});
</script>

<style scoped>
@import '@/assets/forms.css';
</style>