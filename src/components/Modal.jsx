import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null; 

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        onSubmit(title, description);
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Task Title" required />
                    <input type="text" name="description" placeholder="Task Description" required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
