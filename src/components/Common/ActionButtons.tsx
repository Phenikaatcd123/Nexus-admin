import React from 'react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete, onView }) => {
  return (
    <div className="action-buttons">
      {onView && <button onClick={onView}>👁️</button>}
      {onEdit && <button onClick={onEdit}>✏️</button>}
      {onDelete && <button onClick={onDelete}>🗑️</button>}
    </div>
  );
};

export default ActionButtons;