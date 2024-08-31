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
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  function updateStateTask(id: number) {
    const task = tasks.value.find((el) => el.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  return { tasks, addTask, deleteTask, updateStateTask }
})
