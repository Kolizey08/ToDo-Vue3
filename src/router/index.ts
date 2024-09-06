import { createRouter, createWebHistory } from "vue-router";
import TasksAll from "../pages/TasksAll.vue";
import TasksActive from "../pages/TasksActive.vue";
import TasksCompleted from "../pages/TasksCompleted.vue";



const routes = [
    {path: '/', name: 'TaskAll', component: TasksAll},
    {path: '/active', name: 'Taskactive', component: TasksActive},
    {path: '/completed', name: 'TaskCompleted', component: TasksCompleted}

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router