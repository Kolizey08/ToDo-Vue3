<template>
  <ul class="todo-list">
    <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
      <div class="task-content">
        <input
          type="checkbox"
          v-model="task.completed"
          @click="updateStateTask(task.id)"
          class="task-checkbox"
        />
        <div class="tasks">
          <h2 class="task-title">{{ task.title }}</h2>
          <p class="task-text">{{ task.text }}</p>
          <span class="task-priority">{{ task.priority }}</span>
        </div>
        <button @click="deleteTask(task.id)">Удалить</button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTodoStore } from '../stores/todoStore'

export default defineComponent({
  setup() {
    const taskStore = useTodoStore()
    const tasks = taskStore.tasks

    const updateStateTask = (id: number): void => {
      taskStore.updateStateTask(id)
    }

    const deleteTask = (id: number): void => {
      taskStore.deleteTask(id)
    }

    return {
      tasks,
      updateStateTask,
      deleteTask
    }
  }
})
</script>

<style scoped>
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

.todo-list li.completed .tasks {
  text-decoration: line-through;
  color: #999;
}

.task-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.task-checkbox {
  margin-right: 10px;
}

.task-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 10px;
  margin-bottom: 10px;
}

.task-text {
  font-size: 16px;
  color: #666;
  margin: 0 0 5px 0;
}

.task-priority {
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 3px;
  text-transform: capitalize;
  margin-top: 5px;
}

.todo-list li button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 40px;
}

.todo-list li button:hover {
  background-color: #d44042;
}
</style>
