import React, { useState, useEffect } from "react";
import { db } from "./Component/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Component/todo";
import "./index.css";

const style = {
  bg: `h-screen w-screen p-4 bg-[#161E31] flex justify-center items-center`,
  container: `max-w-[400px] mx-auto bg-[#424669] p-4 rounded-md shadow-xl`,
  heading: `text-3xl font-bold text-center p-2 text-[#F8B179]`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl rounded-md bg-slate-100 outline-none text-black border-none`,
  button: `border p-4 ml-2 bg-[#F8B179] text-black border-none rounded-md`,
  count: `text-center p-2 text-[#F8B179]`,
  li: `flex justify-between bg-slate-100 p-4 my-2 rounded-md`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const editTodo = async (id, newText) => {
    await updateDoc(doc(db, "todos", id), {
      text: newText,
    });
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
