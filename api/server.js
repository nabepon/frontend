import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/todos', (request, response) => {
  state.todos = state.todos.filter(todo => !todo.status);
  response.json({ todos: state.todos });
});

app.post('/addTodo', (request, response) => {
  if (request.body.data) {
    const todo = {
      value: request.body.data,
      createTime: Date.now(),
      id: Date.now().toString(),
      status: false,
    };
    state.todos.push(todo);
  }
  response.json({ todos: state.todos });
});

app.post('/toggleTodo', (request, response) => {
  const id = request.body.data;
  const todo = state.todos.find(todo => todo.id === id);
  todo.status = !todo.status;
  response.json({ todos: state.todos });
});

const state = {
  todos: [],
};

const listener = app.listen(9010, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
