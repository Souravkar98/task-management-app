import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadTasksFromLocalStorage(), 
    loading: false,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks); 
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = updatedTasks;
      saveTasksToLocalStorage(state.tasks); 
    },
    updatedStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      state.tasks = updatedTasks;
      saveTasksToLocalStorage(state.tasks); 
    }
  }
});

export const { addTask, deleteTask, updatedStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
