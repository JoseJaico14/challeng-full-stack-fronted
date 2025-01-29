<template>
    <div class="content">
        <div class="form-container">
            <h1>Reporte por fecha de nacimiento</h1>
            <p>Ingresa los siguientes datos para generar tu reporte</p>
            <div class="input-container">
                <input type="text" v-model="title" id="description" placeholder="" />
                <label for="description">Descripción del reporte</label>
            </div>
            <div class="form-group">
                <p>Fecha de nacimiento</p>
                <div class="date-group">
                    <div class="input-container">
                        <label for="start">Inicio</label>
                        <input type="date" v-model="start_date"
                        min="1980-01-01" 
                        max="2010-12-31" 
                        id="start-date" />
                        <div class="date-placeholder" id="date-placeholder">Selecciona una fecha</div>
                    </div>
                    <div class="input-container">
                        <label for="end">Fin</label>
                        <input type="date" v-model="end_date" 
                        min="1980-01-01" 
                        max="2010-12-31" 
                        id="end-date" />
                    </div>
                </div>
            </div>
            <button type="button" v-if="!loading" @click="registerReport">Generar reporte</button>
            <span class="loader" v-if="loading"></span>
        </div>
    </div>
</template>
<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2'

    const router = useRouter()
    const loading = ref(false);

    const title = ref(null);
    const start_date = ref(null);
    const end_date = ref(null);

    const registerReport = () => {
        if(!title.value){
            Swal.fire({
                title: 'Error!',
                text: 'Necesitas ingresar la descripción del reporte',
                icon: 'error',
            })
            return;
        }
        if(!start_date.value){
            Swal.fire({
                title: 'Error!',
                text: 'Necesitas seleccionar una fecha de inicio',
                icon: 'error',
            })
            return;
        }
        if(!end_date.value){
            Swal.fire({
                title: 'Error!',
                text: 'Necesitas seleccionar una fecha de fin',
                icon: 'error',
            })
            return;
        }
        loading.value = true;
        try {
            axios.post('api/generate-report', {
                title: title.value,
                start_date: start_date.value,
                end_date: end_date.value,
            })
            .then(response => {
                console.log(response);
                Swal.fire({
                    title: 'Genial',
                    text: 'Se registro el reporte',
                    icon: 'success',
                })
                router.push({
                    name: 'home'
                });
                setTimeout(() => {
                    loading.value = false;
                },1500)
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