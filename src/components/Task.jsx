import { useEffect, useState } from 'react';

const Task = ({ title, onDelete,onClick }) => {

  return   (
    <div className="task-box" >
  <h4 onClick={onClick}>{title}</h4>
  <button onClick={onDelete}>Delete</button>
</div>
  )      
};

export default Task;
