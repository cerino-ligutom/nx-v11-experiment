<template>
  <div class="todo-form">
    <label v-if="todo?.id">id: {{ todo?.id }}</label>

    <div class="form">
      <div class="form-control">
        <label>Description</label>
        <textarea type="text" v-model="form.description" />
      </div>

      <div class="form-control" v-if="todo?.id">
        <label>Status</label>
        <input type="checkbox" v-model="form.status" />
      </div>
    </div>

    <div class="buttons">
      <button @click="submit()">Submit</button>
      <button v-if="todo?.id" @click="deleteTodo()">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed } from 'vue';
import { ITodo } from '@zeferinix/api-todo-interfaces';
import { useHttpClient } from '../composables/use-http-client';

export default defineComponent({
  name: 'Todoform',
  props: {
    todo: {
      type: Object as PropType<ITodo>,
      required: false,
    },
  },
  emits: ['submitted'],
  setup(props, { emit }) {
    const isEditMode = computed<boolean>(() => {
      return !!props.todo;
    });

    const form = reactive<ITodo>({
      id: props.todo?.id,
      description: props.todo?.description ?? '',
      status: props.todo?.status ?? false,
    });

    const { post, patch, del } = useHttpClient('http://localhost:3000');
    async function submit() {
      if (isEditMode.value) {
        const { id, ...body } = form;
        await patch(`/todos/${form.id}`, body);
      } else {
        await post('/todos', form);
        form.description = '';
        form.status = false;
      }

      emit('submitted');
      alert('submitted');
    }

    async function deleteTodo() {
      await del(`/todos/${form.id}`);
      emit('submitted');
    }

    return {
      form,
      submit,
      deleteTodo,
    };
  },
});
</script>

<style lang="scss" scoped>
.todo-form {
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 16px;
  margin: 8px;
  padding: 8px;

  .form {
    display: flex;
    flex-direction: row;

    .form-control {
      display: flex;
      flex-direction: column;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
    }
  }
}
</style>
