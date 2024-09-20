/** @format */

const TaskItem = ({ text, completed, onToggleCompleted, onDelete }) => {
  return (
    <li>
      <input type="checkbox" checked={completed} onChange={onToggleCompleted} />
      <span
        onClick={onToggleCompleted}
        style={
          completed ? { textDecorationLine: "line-through", opacity: ".3" } : {}
        }
      >
        {text}
      </span>
      <button className="delete" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
