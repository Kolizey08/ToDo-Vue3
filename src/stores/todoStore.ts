import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todoStore', () => {
  const tasks = ref<{ id: number; text: string; completed: boolean }[]>([])

  function addTask(text: string) {
    tasks.value.push({
      id: Date.now(),
      text,
      completed: false
    })
  }

  function deleteTask(id: number) {
    const index = tasks.value.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
    }
  }

  function updateStateTask(id: number) {
    const task = tasks.value.find((el) => el.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  return { tasks, addTask, deleteTask, updateStateTask }
})
