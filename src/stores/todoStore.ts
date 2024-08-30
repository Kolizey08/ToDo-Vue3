import { defineStore } from 'pinia'

export const todoStore = defineStore('todoStore', {
  state: () => ({
    tasks: [] as { id: number; text: string; completed: boolean }[]
  }),
  actions: {
    addTask(text: string) {
      this.tasks.push({
        id: Date.now(),
        text,
        completed: false
      })
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
    updateStateTask(id: number) {
      const task = this.tasks.find((el) => el.id === id)
      if (task) {
        task.completed = !task.completed
      }
    }
  }
})
