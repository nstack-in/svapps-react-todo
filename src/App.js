import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

function App() {
  const taskNameRef = useRef();
  const taskDateRef = useRef();
  const [todoList, updateTodoList] = useState([]);

  useEffect(function () {
    const localData = localStorage.getItem('todo');
    const dataAsArray = JSON.parse(localData);
    if (dataAsArray === null || dataAsArray === undefined) {
      updateTodoList([]);
    } else {
      updateTodoList(dataAsArray);
    }
  }, []);

  const submit = function () {
    const name = taskNameRef.current.value;
    const date = taskDateRef.current.value;
    const isCompleted = false;
    // Validation 
    if (name === '') return alert('Name is empty');
    if (date === '') return alert('Date is empty');

    const newObj = { name, date, isCompleted };
    const updatedList = [...todoList, newObj];
    // Updating State
    updateTodoList(updatedList);
    const listAsString = JSON.stringify(updatedList);
    localStorage.setItem('todo', listAsString);

    // Reset
    taskNameRef.current.value = '';
    taskDateRef.current.value = '';
  }

  const markAsCompleted = function (todo) {
    let updatedList = [];
    todoList.forEach(function (item) {
      if (item.name === todo.name) {
        updatedList.push({
          name: item.name,
          date: item.date,
          isCompleted: !item.isCompleted,
        });
      } else {
        updatedList.push(item);
      }
    });
    updateTodoList(updatedList);
    const listAsString = JSON.stringify(updatedList);
    localStorage.setItem('todo', listAsString);
  }

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>

        {/* Todo Form */}
        <Paper elevation={3} >
          <Box p={2} mt={4}>
            <Box m={2}>
              <Typography variant="h6">Create Task Form</Typography>
            </Box>

            <form noValidate autoComplete="off">

              <Box m={2}>
                <FormControl fullWidth >
                  <InputLabel htmlFor="task-name">Task Name</InputLabel>
                  <Input inputRef={taskNameRef} id="task-name" type="text" />
                </FormControl>
              </Box>

              <Box m={2}>
                <FormControl fullWidth >
                  <InputLabel htmlFor="task-date"></InputLabel>
                  <Input inputRef={taskDateRef} id="task-date" type="date" />
                </FormControl>
              </Box>

              <Box m={2}>
                <Button variant="contained" color="primary" onClick={submit}>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
        {/* Todo Form Ends */}

        {/* Todo List Item */}

        <Box p={2} my={3}>
          <Typography variant="h6">Todo List Items</Typography>
        </Box>

        {
          todoList.map(function (todo) {
            return (
              <Paper elevation={3} key={todo.name}>
                <Box p={2} my={3}>
                  <Checkbox
                    checked={todo.isCompleted}
                    onChange={() => markAsCompleted(todo)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  {todo.name} - {todo.date}
                </Box>
              </Paper>
            );
          })
        }
        {/* Todo List Item Ends */}
      </Container>
    </React.Fragment>
  );
}

export default App;