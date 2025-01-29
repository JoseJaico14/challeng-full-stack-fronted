<template>
    <div class="content">
        <div class="form-container login">
            <h1>Login</h1>
            <p>Ingresa tus credenciales</p>
            <div class="input-container">
                <input type="email" id="email" v-model="email" placeholder="" />
                <label for="email">Correo electrónico: </label>
            </div>
            <div class="input-container">
                <input type="password" id="password" v-model="password" placeholder="" />
                <label for="password">Contraseña:</label>
            </div>
            <button type="button" v-if="!loading" @click="login">Login</button>
            <span class="loader" v-if="loading"></span>
        </div>
    </div>
</template>
<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import Swal from 'sweetalert2'

    const loading = ref(false);
    const email = ref(null);
    const password = ref(null);

    const login = () => {
        if(!email.value || !password.value){
            Swal.fire({
                title: 'Error!',
                text: 'Necesitas ingresar las credenciales',
                icon: 'error',
            })
            return;
        }
        loading.value = true;
        try {
            axios.post('api/auth/login', {
                email: email.value,
                password: password.value
            })
            .then(response => {
                loading.value = false;
                console.log(response);
                localStorage.setItem("token",response.data.access_token);
                localStorage.setItem("user",JSON.stringify(response.data.user));
                window.location.reload();
            })
            .catch(error => {
                loading.value = false;
                Swal.fire({
                    title: 'Error!',
                    text: 'Hubo un problema en el servidor. Intentalo nuevamente',
                    icon: 'error',
                })
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }
</script>