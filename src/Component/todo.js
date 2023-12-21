import React, { useState } from "react";
import { FaRegTrashAlt, FaPencilAlt, FaRegSave } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-100 p-4 my-2 rounded-md`,
  liComplete: `flex justify-between bg-slate-300 p-4 my-2 rounded-md`,
  row: `flex justify-between items-center w-full`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
  input: `rounded-sm ml-2 bg-transparent outline-none`,
  icon: `flex items-center`,
  trash: `text-red-900 cursor-pointer`,
  edit: `text-blue-900 cursor-pointer mr-2`,
  save: `text-green-900 cursor-pointer ml-3`,
};

const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editTodo(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <div className={style.icon}>
          <input
            onChange={() => toggleComplete(todo)}
            type="checkbox"
            checked={todo.completed ? "checked" : ""}
          />
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className={style.input}
            />
          ) : (
            <p
              onClick={() => toggleComplete(todo)}
              className={todo.completed ? style.textComplete : style.text}
            >
              {todo.text}
            </p>
          )}
        </div>
        {isEditing && (
          <div className={style.icon}>
            <button onClick={handleSaveClick}>
              <FaRegSave className={style.save} />
            </button>
          </div>
        )}
      </div>
      <div className={style.icon}>
        {!isEditing && (
          <div className={style.button}>
            <button className={style.edit} onClick={handleEditClick}>
              <FaPencilAlt />
            </button>
            <button onClick={() => deleteTodo(todo.id)}>
              <FaRegTrashAlt className={style.trash} />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default Todo;
