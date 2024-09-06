<template>
  <TodoList :tasks="tasks"/>
</template>

<script lang="ts">
import { useTodoStore } from '../stores/todoStore'
import TodoList from '../components/TodoList.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TodoList
  },
  setup() {
    const taskStore = useTodoStore()
    const tasks = taskStore.tasks
    

    return {
      tasks
    }
  }
})
</script>
