<template>
  <div class="todo-app">
    <h1>Vue3 ToDo</h1>
    <div class="todo-input">
      <input v-model="newTaskText" @keyup.enter="addTask" placeholder="Введите задачу..." />
      <button @click="addTask">Добавить</button>
    </div>

    <ul class="todo-list">
      <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
        <span @click="updateStateTask(task.id)">
          {{ task.text }}
        </span>
        <button @click="deleteTask(task.id)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTodoStore } from './stores/todoStore'

export default defineComponent({
  setup() {
    const taskStore = useTodoStore()
    const newTaskText = ref('')

    const addTask = () => {
      if (newTaskText.value.trim()) {
        taskStore.addTask(newTaskText.value)
        newTaskText.value = ''
      }
    }

    const updateStateTask = (id: number) => {
      taskStore.updateStateTask(id)
    }

    const deleteTask = (id: number) => {
      taskStore.deleteTask(id)
    }
    return {
      newTaskText,
      tasks: taskStore.tasks,
      addTask,
      updateStateTask,
      deleteTask
    }
  }
})
</script>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.todo-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.todo-input input {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-input button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-input button:hover {
  background-color: #38a174;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.todo-list li.completed span {
  text-decoration: line-through;
  color: #999;
}

.todo-list li button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-list li button:hover {
  background-color: #d44042;
}
</style>

function todoStore() {
  throw new Error('Function not implemented.')
}

function todoStore() {
  throw new Error('Function not implemented.')
}
