import { useState } from 'react';
import Task from './Task';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, updatedStatus } from '../reducers/taskReducer';
import TaskDetailsModal from './TaskDetailsModal';

const Board = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [taskToClone, setTaskToClone] = useState('');

  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskSubmit = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: 'pending', // Default status as 'pending'
    };
    dispatch(addTask(newTask));
    closeModal();
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const closeTaskDetailsModal = () => {
    setIsTaskDetailsOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const obj = {
      taskId: taskId,
      newStatus: newStatus,
    };
    dispatch(updatedStatus(obj));
    closeTaskDetailsModal();
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const handleCloneTask = () => {
    const task = tasks.find((task) => task.id === parseInt(taskToClone));
    if (task) {
      const clonedTask = {
        ...task,
        id: Date.now(), 
        title: `${task.title} (Clone)`,
      };
      dispatch(addTask(clonedTask));
    }
    setIsDropdownOpen(false); 
  };

  const pendingTasks = tasks.filter((task) => task.status === 'pending');
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
  const completedTasks = tasks.filter((task) => task.status === 'Complete');

  return (
    <div className="board-container">
      <h2>Task Board</h2>
      <button onClick={openModal}>Create Task</button>
      <button onClick={toggleDropdown}>Clone Task</button>


      {isDropdownOpen && (
        <div className="dropdown">
          <select
            value={taskToClone}
            onChange={(e) => setTaskToClone(e.target.value)}
          >
            <option value="">Select a task to clone</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
          <button onClick={handleCloneTask} disabled={!taskToClone}>
            Clone Selected Task
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleTaskSubmit}
      />

      <TaskDetailsModal
        isOpen={isTaskDetailsOpen}
        onClose={closeTaskDetailsModal}
        task={selectedTask}
        onUpdateStatus={handleUpdateStatus}
      />

      <div className="task-columns">
        <div className="column">
          <h3>Pending</h3>
          <div className="task-grid">
            {pendingTasks.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                onDelete={() => handleDeleteTask(task.id)}
                onClick={() => openTaskDetailsModal(task)}
              />
            ))}
          </div>
        </div>

        <div className="column">
          <h3>In Progress</h3>
          <div className="task-grid">
            {inProgressTasks.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                onDelete={() => handleDeleteTask(task.id)}
                onClick={() => openTaskDetailsModal(task)}
              />
            ))}
          </div>
        </div>

        <div className="column">
          <h3>Complete</h3>
          <div className="task-grid">
            {completedTasks.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                onDelete={() => handleDeleteTask(task.id)}
                onClick={() => openTaskDetailsModal(task)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
