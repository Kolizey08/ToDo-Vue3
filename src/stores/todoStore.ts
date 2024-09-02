import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Tasks {
  title: string
  id: number
  text: string
  priority: 'низкий' | 'средний' | 'высокий'
  completed: boolean
}

export const useTodoStore = defineStore('todoStore', () => {
  const tasks = ref<Tasks[]>([])

  function addTask(title: string, text: string, priority: 'низкий' | 'средний' | 'высокий'): void {
    tasks.value.push({
      title,
      id: Date.now(),
      text,
      priority,
      completed: false
    })
  }

  function updateTask(): void {}

  function deleteTask(id: number): void {
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  function updateStateTask(id: number): void {
    const task = tasks.value.find((el) => el.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  return { tasks, addTask, updateTask, deleteTask, updateStateTask }
})
