<template>
    <div class="container">
        <h1>Generador de reportes TK</h1>
        <div class="content">
            <div class="table">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th class="text-center">Fecha de creación</th>
                            <th class="text-end">Acción</th>
                        </tr>
                        <tr class="spacer"><td colspan="100"></td></tr>
                    </thead>
                    <tbody>
                        <tr class="spacer"><td colspan="100"></td></tr>
                        <template v-for="(report, index) in reports" :key="index">
                            <tr class="record">
                                <td class="title">{{ report.title }}</td>
                                <td class="created-at">{{ report.created_at }}</td>
                                <td class="action">
                                    <a href="#" onclick="return false" @click="downloadReport(report)">
                                        Descargar 
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_13_33)">
                                            <path d="M15.8333 7.5H12.5V2.5H7.5V7.5H4.16667L10 13.3333L15.8333 7.5ZM9.16667 9.16667V4.16667H10.8333V9.16667H11.8083L10 10.975L8.19167 9.16667H9.16667ZM4.16667 15H15.8333V16.6667H4.16667V15Z" fill="white"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_13_33">
                                            <rect width="20" height="20" fill="white"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                            <tr class="spacer" v-if="reports.length != (index+1)">
                                <td colspan="100">
                                    <div></div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <button class="create-report-btn" v-if="!loading" @click="$router.push({name:'report'})">Crear reporte</button>
            <span class="loader" v-if="loading"></span>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted,ref } from 'vue';
import Swal from 'sweetalert2'

const loading = ref(false);
const reports = ref([]);

const list = () => {
    try {
        loading.value = true;
        axios.get('api/list-reports')
        .then(response => {
            loading.value = false;
            console.log(response);
            reports.value = response.data.reports.data;
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

const downloadReport = (report) => {
    try {
        axios.get('api/get-report/'+report.id)
        .then(response => {
            window.open(response.data.url,'_blank');
        })
        .catch(error => {
            // this.isSaving = false
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
onMounted(() => {
    list()
} )
</script>