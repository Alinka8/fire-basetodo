import React, { useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore/lite";

const TodoAppdemo = () => {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const onInputChange = (e) => {
    setCurrentTodo(e.target.value);
  };
  const onAddBtnClick = () => {
    setTodoList([currentTodo, ...todoList]);
    setCurrentTodo("");
  };
  return (
    <div className="todo-container">
      <div className="todo-container__input-box">
        <input
          value={currentTodo}
          onChange={onInputChange}
          placeholder="write todo"
        />
        <button onClick={onAddBtnClick}>Add</button>
      </div>
      <div className="todo-container__list-view">
        {todoList.map((el, index) => {
          return;
          <p key={index}>{el}</p>;
        })}
      </div>
    </div>
  );
};

export default TodoAppdemo;
