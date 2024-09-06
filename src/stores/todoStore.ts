import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export interface ITasks {
  title: string
  id: number
  text: string
  priority: 'низкий' | 'средний' | 'высокий'
  completed: boolean,
  date: string
}

export const useTodoStore = defineStore('todoStore', () => {
  const tasks = ref<ITasks[]>([])

  const tasksLocalstorage = localStorage.getItem('tasks')
  if (tasksLocalstorage) {
    tasks.value = JSON.parse(tasksLocalstorage)._value
  }

  function addTask(title: string, text: string, priority: 'низкий' | 'средний' | 'высокий'): void {
    const today = new Date().toLocaleDateString()
    tasks.value.push({
      title,
      id: Date.now(),
      text,
      priority,
      completed: false,
      date: today
    })

  }

  function updateTask(updatedTask: ITasks): void {
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

  const completedTasks = computed(() => tasks.value.filter(task => task.completed))
  const activeTasks = computed(() => tasks.value.filter(task => !task.completed))


  watch(() => tasks, (state) => {
    localStorage.setItem('tasks', JSON.stringify(state))
  }, {deep: true})

  return { tasks, addTask, updateTask, deleteTask, updateStateTask, completedTasks, activeTasks }
})
