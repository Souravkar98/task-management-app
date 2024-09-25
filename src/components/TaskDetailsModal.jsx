import React from 'react';

const TaskDetailsModal = ({ isOpen, onClose, task, onUpdateStatus }) => {
    if (!isOpen || !task) return null;

    const handleStatusChange = (event) => {
        onUpdateStatus(task.id, event.target.value); 
    };
    const handleOverlayClick = (event) => {

        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>Task Details</h2>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <label>
                    Status:
                    <select value={task.status} onChange={handleStatusChange}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Complete">Complete</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default TaskDetailsModal;
