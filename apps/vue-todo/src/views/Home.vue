<template>
  <div class="container">
    <TodoForm @submitted="fetchTodoItems()" />

    <TodoForm
      v-for="todo of todoItems"
      :key="todo.id"
      :todo="todo"
      @submitted="fetchTodoItems()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import TodoForm from '../components/TodoForm.vue';
import { useHttpClient } from '../composables/use-http-client';
import { ITodo } from '@zeferinix/api-todo-interfaces';

export default defineComponent({
  name: 'Home',
  components: {
    TodoForm,
  },
  setup() {
    const { get } = useHttpClient('http://localhost:3000');

    const todoItems = ref<ITodo[]>([]);

    async function fetchTodoItems() {
      const result = await get('/todos');
      todoItems.value = result.todos;
    }

    onMounted(async () => {
      await fetchTodoItems();
    });

    return {
      todoItems,
      fetchTodoItems,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
}
</style>
