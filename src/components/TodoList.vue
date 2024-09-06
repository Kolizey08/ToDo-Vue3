<template>
  <ul class="todo-list">
    <TodoItem v-for="task in tasks" :key="task.id" :task="task" />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TodoItem from './TodoItem.vue';
import { type ITasks } from '../stores/todoStore';

export default defineComponent({
  components: {
    TodoItem,
  },
  props: {
    tasks: {
      type: Array as PropType<ITasks[]>,  
      required: true,
    },
  },
});
</script>

<style scoped>
.todo-list {
  list-style-type: none;
  padding: 0;
}
</style>
