<template>
    <div class="container">
        <a-form class="registration-form" @submit.prevent="handleSubmit">
            <a-form-item>
                <a-button type="primary" @click="handleGoogleLogin" class="btn-google">
                    <GoogleSquareFilled />
                    <span>Sign up with Google</span>
                </a-button>
            </a-form-item>

            <div class="or-divider">
                <span>OR</span>
                <div class="divider-line"></div>
            </div>

            <a-form-item>
                <a-input v-model:value="username" placeholder="Username" prefix-icon="user" />
            </a-form-item>

            <a-form-item>
                <a-input v-model:value="email" placeholder="Email" prefix-icon="mail" />
            </a-form-item>

            <a-form-item>
                <a-input-password v-model:value="password" placeholder="Password" prefix-icon="lock" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" class="btn-register">Register</a-button>
            </a-form-item>

            <div class="login-link">
                <span>Already have an account?</span>
                <nuxt-link to="/login" class="btn-login2"> Log in</nuxt-link>
            </div>
        </a-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Input, Button, message } from "ant-design-vue";
import axios from 'axios';

export default defineComponent({
    components: {
        'a-input': Input,
        'a-input-password': Input.Password,
        'a-button': Button,
    },
    data() {
        return {
            username: '',
            email: '',
            password: ''
        };
    },
    methods: {
        async handleSubmit() {

            if (!this.username.trim()) {
                return message.error('Username cannot be empty.');
            }
            if (this.username.length < 5) {
                return message.error('Username be more than 5 characters.');
            }
            if (!this.email.trim()) {
                return message.error('Email cannot be empty.');
            }
            if (!this.password) {
                return message.error('Password cannot be empty.');
            }
            if (this.password.length < 8) {
                return message.error('Password must be more than 8 characters.');
            }
            
            const emailToValidate = this.email.trim().toLowerCase();
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(emailToValidate)) {
                return message.error('Please enter a valid email address.');
            }

            try {
                const response = await axios.post('http://localhost:8000/auth/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                });

                console.log(response.data);
                message.success('Registration successful.');
                navigateTo('/login');
            } catch (error) {
                console.error('Registration failed:', error);
                message.error('Registration failed. Please try again later.');
            }
        },
        handleGoogleLogin() {
            // Handle Google login
        },
    }
});
</script>

<style scoped>
@import '@/assets/forms.css';
</style>