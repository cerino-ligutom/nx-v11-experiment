import * as express from 'express';
import { ITodo } from '@zeferinix/api-todo-interfaces';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello from api-todo</h1>');
});

let todoItems: ITodo[] = [];

app.get('/todos', (req, res) => {
  res.send({
    count: todoItems.length,
    todos: todoItems,
  });
});

app.get('/todos/:todoId', (req, res) => {
  const { todoId } = req.params;
  const todo = todoItems.find((x) => x.id === todoId);

  if (!todo) {
    res.status(404).send();
    return;
  }

  res.send(todo);
});

app.post('/todos', (req, res) => {
  const { description } = req.body as any;

  const newTodo: ITodo = {
    id: new Date().getTime().toString(),
    description,
    status: false,
  };

  todoItems.push(newTodo);

  res.send(newTodo);
});

app.patch('/todos/:todoId', (req, res) => {
  const { todoId } = req.params;
  const { description, status } = req.body;

  const todo = todoItems.find((x) => x.id === todoId);

  if (!todo) {
    res.status(404).send();
    return;
  }

  todo.description = description ?? todo.description;
  todo.status = status ?? todo.status;

  res.send(todo);
});

app.delete('/todos/:todoId', (req, res) => {
  const { todoId } = req.params;

  const prevArrayLength = todoItems.length;
  todoItems = todoItems.filter((x) => x.id !== todoId);

  const success = prevArrayLength > todoItems.length;

  res.send({
    success,
  });
});

app.listen(PORT, () => {
  console.log(`[api-todo] is listening on port ${PORT}`);
});
