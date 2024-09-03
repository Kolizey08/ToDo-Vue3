<template>
  <ul class="todo-list">
    <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
      <div class="task-content">
        <div v-if="editingTask && editingTask.id === task.id">
          <input v-model="editingTask.title" placeholder="Заголовок задачи" type='text'/>
          <input v-model="editingTask.text" placeholder="Текст задачи" type='text'/>
          <select v-model="editingTask.priority">
            <option value="низкий">Низкий</option>
            <option value="средний">Средний</option>
            <option value="высокий">Высокий</option>
          </select>
          <button @click="saveTask">Сохранить</button>
          <button @click="cancelEdit">Отменить</button>
        </div>
        <div v-else class="tasks">
          <input
            type="checkbox"
            v-model="task.completed"
            @click="updateStateTask(task.id)"
            class="task-checkbox"
          />
          <div class="todos">
            <h2 class="task-title">{{ task.title }}</h2>
            <p class="task-text">{{ task.text }}</p>
            <span class="task-priority">{{ task.priority }}</span>
          </div>
          <div class="button-content">
            <button @click="editTask(task)">Редактировать</button>
            <button @click="deleteTask(task.id)">Удалить</button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTodoStore, type Tasks } from '../stores/todoStore'

export default defineComponent({
  setup() {
    const taskStore = useTodoStore()
    const tasks = taskStore.tasks
    const editingTask = ref<Tasks | null>(null)

    const updateStateTask = (id: number): void => {
      taskStore.updateStateTask(id)
    }

    const deleteTask = (id: number): void => {
      taskStore.deleteTask(id)
    }

    const editTask = (task: Tasks): void => {
      editingTask.value = { ...task }
    }

    const saveTask = () => {
      if (editingTask.value !== null) {
        taskStore.updateTask(editingTask.value)
        editingTask.value = null
      }
    }

    const cancelEdit = () => {
      editingTask.value = null
    }

    return {
      tasks,
      updateStateTask,
      deleteTask,
      editTask,
      saveTask,
      cancelEdit,
      editingTask
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

.todo-list li.completed .todos {
  text-decoration: line-through;
  color: #999;
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.tasks {
  display: flex;
    justify-content: space-between;
    width: 380px;
}

.task-content select {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.task-content button {
  margin-left: 10px;
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

.button-content {
  display: flex;
  flex-direction: column;
}

.todo-list li button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 20px;
}

.todo-list li button:hover {
  background-color: #d44042;
}
</style>
