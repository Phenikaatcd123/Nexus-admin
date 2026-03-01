import React, { useState } from 'react';
import './DeleteConfirmModal.css';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = 'mục'
}) => {
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmText === itemName) {
      onConfirm();
      setConfirmText('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <div className="modal-header delete-header">
          <h2>Xác nhận xóa</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="warning-icon">⚠️</div>
          <p className="warning-text">
            Bạn có chắc chắn muốn xóa {itemType} <strong>"{itemName}"</strong>?
          </p>
          <p className="warning-description">
            Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
          </p>
          
          <div className="confirmation-input">
            <label>
              Vui lòng gõ <strong>"{itemName}"</strong> để xác nhận:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Nhập tên để xác nhận"
              autoFocus
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Hủy
          </button>
          <button 
            type="button" 
            className="btn-delete"
            onClick={handleConfirm}
            disabled={confirmText !== itemName}
          >
            Xóa {itemType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;