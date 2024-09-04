// import { defineStore } from 'pinia'

// export interface Tasks {
//   title: string
//   id: number
//   text: string
//   priority: 'низкий' | 'средний' | 'высокий'
//   completed: boolean
// }

// export const useTodoStore = defineStore('todoStore', {
//   state: () => ({
//     tasks: [] as Tasks[]
//   }),

//   actions: {
//     addTask(title: string, text: string, priority: 'низкий' | 'средний' | 'высокий'): void {
//       this.tasks.push({
//         title,
//         id: Date.now(),
//         text,
//         priority,
//         completed: false
//       })
//     },

//     updateTask(updatedTask: Tasks): void {
//       const index = this.tasks.findIndex((task) => task.id === updatedTask.id)
//       if (index !== -1) {
//         this.tasks[index] = updatedTask
//       }
//     },

//     deleteTask(id: number): void {
//       const index = this.tasks.findIndex((task) => task.id === id)
//       if (index !== -1) {
//         this.tasks.splice(index, 1)
//       }
//     },

//     updateStateTask(id: number): void {
//       const task = this.tasks.find((el) => el.id === id)
//       if (task) {
//         task.completed = !task.completed
//       }
//     }
//   }
// })

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Tasks {
  title: string
  id: number
  text: string
  priority: 'низкий' | 'средний' | 'высокий'
  completed: boolean
}

export const useTodoStore = defineStore('todoStore', () => {
  const tasks = ref<Tasks[]>([])

  const tasksLocalstorage = localStorage.getItem('tasks')
  if (tasksLocalstorage) {
    tasks.value = JSON.parse(tasksLocalstorage)._value
    console.log(JSON.parse(tasksLocalstorage))
  }

  function addTask(title: string, text: string, priority: 'низкий' | 'средний' | 'высокий'): void {
    tasks.value.push({
      title,
      id: Date.now(),
      text,
      priority,
      completed: false
    })
  }

  function updateTask(updatedTask: Tasks): void {
    const index = tasks.value.findIndex((task) => task.id === updatedTask.id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  }

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

  watch(() => tasks, (state) => {
    localStorage.setItem('tasks', JSON.stringify(state))
  }, {deep: true})

  return { tasks, addTask, updateTask, deleteTask, updateStateTask }
})
