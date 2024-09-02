<template>
  <div class="todo-app">
    <h1>Vue3 ToDo</h1>
    <TodoInput />
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'

export default defineComponent({
  components: {
    TodoInput,
    TodoList
  }
})
</script>

<style scoped>
.todo-app {
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
