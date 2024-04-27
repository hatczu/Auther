<template>
    <Layout>
        <div class="landing">
            <div class="content">
                <div class="welcome">
                    <h1 class="title">Welcome to Auther</h1>
                    <p class="description">Seamless access, secure connections: Login and register with confidence.</p>
                </div>
                <div class="actions">
                    <a-button type="primary" class="login-button" @click="redirectToLogin">Login</a-button>
                    <a-button class="register-button" @click="redirectToRegister">Register</a-button>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>

const router = useRouter()
const redirectToLogin = () => {
    router.push('/login')
}

const redirectToRegister = () => {
    router.push('/register')
}
</script>

<style scoped>
@import '@/assets/landing.css';
</style>