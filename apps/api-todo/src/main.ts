import * as express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello from api-todo</h1>');
});

app.listen(PORT, () => {
  console.log(`api-todo is listening on port ${PORT}...`);
});
