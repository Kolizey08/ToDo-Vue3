<template>
    <li :key="task.id" :class="{ completed: localTask.completed }">
      <div class="task-content">
        <div v-if="editingTask && editingTask.id === localTask.id">
          <input v-model="editingTask.title" placeholder="Заголовок задачи" type="text" />
          <input v-model="editingTask.text" placeholder="Текст задачи" type="text" />
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
            v-model="localTask.completed"
            @click="updateStateTask(localTask.id)"
            class="task-checkbox"
          />
          <div class="todos">
            <h2 class="task-title">{{ localTask.title }}</h2>
            <p class="task-text">{{ localTask.text }}</p>
            <hr />
            <span class="task-priority">Приоритет: {{ localTask.priority }}</span>
            <br />
            <span class="task-date">Дата: {{ localTask.date }}</span>
          </div>
          <div class="button-content">
            <button @click="editTask(localTask)">Редактировать</button>
            <button @click="deleteTask(localTask.id)">Удалить</button>
          </div>
        </div>
      </div>
    </li>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, PropType, computed } from 'vue'
  import { useTodoStore, type ITasks } from '../stores/todoStore'
  
  export default defineComponent({
    props: {
      task: {
        type: Object as PropType<ITasks>,
        required: true
      }
    },
    setup(props) {
      const taskStore = useTodoStore()
      const editingTask = ref<ITasks | null>(null)
      const localTask = computed(() => ({ ...props.task }))
  
      const updateStateTask = (id: number): void => {
        taskStore.updateStateTask(id)
      }
      const deleteTask = (id: number): void => {
        taskStore.deleteTask(id)
      }
      const editTask = (task: ITasks): void => {
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
        localTask, 
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
.task-date {
  font-size: 12px;
  color: #666;
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
