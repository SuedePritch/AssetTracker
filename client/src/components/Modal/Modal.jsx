import React from 'react';
import './Modal.scss';

function Modal({ isOpen, formComponent, onClose }) {
    const closeModal = () => {
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal-container">
                    {formComponent}
                    <button className="close-button" onClick={closeModal}>
                        <span role="img" aria-label="close">
                            ❌
                        </span>
                    </button>
                </div>
            )}
        </>
    );
}

export default Modal;
