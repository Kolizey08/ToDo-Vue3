<template>
  <TodoList :tasks="activeTasks" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import TodoList from '../components/TodoList.vue'
import { useTodoStore } from '../stores/todoStore'

export default defineComponent({
  components: {
    TodoList
  },
  setup() {
    const taskStore = useTodoStore()
    const activeTasks = computed(() => taskStore.tasks.filter((el) => !el.completed))

    return {
      activeTasks
    }
  }
})
</script>
