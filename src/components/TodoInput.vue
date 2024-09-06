<template>
  <div class="todo-input">
    <div class="input-container">
      <input
        class="inputTitle"
        v-model="newTaskTitle"
        @keyup.enter="addTask"
        placeholder="Введите заголовок..."
      />
      <span class="validText" v-if="errors.title">{{ errors.title }}</span>
      <input
        class="inputText"
        v-model="newTaskText"
        @keyup.enter="addTask"
        placeholder="Введите задачу..."
      />
      <span class="validText" v-if="errors.text">{{ errors.text }}</span>
    </div>
    <span>Приоритет задачи:</span>
    <div class="priority-select">
      <label>
        <input type="radio" v-model="taskPriority" value="низкий" />
        Низкий
      </label>
      <label>
        <input type="radio" v-model="taskPriority" value="средний" />
        Средний
      </label>
      <label>
        <input type="radio" v-model="taskPriority" value="высокий" />
        Высокий
      </label>
    </div>
    <button @click="addTask">Добавить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

export default defineComponent({
  setup() {
    const taskStore = useTodoStore()
    const newTaskText = ref<string>('')
    const newTaskTitle = ref<string>('')
    const taskPriority = ref<'низкий' | 'средний' | 'высокий'>('средний')
    const errors = ref({
      title: '',
      text: ''
    })

    const validateInput = () => {
      errors.value = { title: '', text: '' }
      let isValid = true

      if (!newTaskTitle.value) {
        errors.value.title = 'Заголовок обязателен'
        isValid = false
      }
      if (!newTaskText.value) {
        errors.value.text = 'Текст задачи обязателен'
        isValid = false
      }
      return isValid
    }

    const addTask = (): void => {
      if (validateInput()) {
        taskStore.addTask(newTaskTitle.value, newTaskText.value, taskPriority.value)
        newTaskText.value = ''
        newTaskTitle.value = ''
      }
    }

    return {
      newTaskTitle,
      newTaskText,
      taskPriority,
      addTask,
      errors
    }
  }
})
</script>

<style scoped>
.todo-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 130px;
  justify-content: space-around;
  margin-bottom: 12px;
}
.inputTitle {
  font-size: 17px;
}

.inputText {
  font-size: 13px;
}

.todo-input input {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.validText {
  color: red;
  font-size: 12px;
  margin-bottom: 12px;
}

.priority-select {
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
}

.priority-select label {
  cursor: pointer;
}

.priority-select input {
  margin-right: 5px;
}

.todo-input button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  width: 150px;
}

.todo-input button:hover {
  background-color: #38a174;
}
</style>
