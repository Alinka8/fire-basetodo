import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore/lite";

const TodoApp = () => {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const getAllTodos = async () => {
    try {
      const todosCollection = collection(db, "todolist");
      const todosSnapshot = await getDocs(todosCollection);
      const dbTodoList = todosSnapshot.docs.map((doc) => {
        // console.log("each item", doc.data(), doc.id);
        return { ...doc.data(), id: doc.id };
      });
      setTodoList(dbTodoList);
      //   console.log("todoList", dbTodoList)
      // console.log("todos snap", todosSnapshot);
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    getAllTodos();
    console.log("useEffect running");
  }, []);

  const onInputChange = (e) => {
    setCurrentTodo(e.target.value);
  };

  const onAddBtnClick = async () => {
    try {
      const addingTodo = {
        text: currentTodo,
        isCompleted: false,
      };
      const todosCollection = collection(db, "todolist");
      await addDoc(todosCollection, addingTodo);
      setCurrentTodo("");
      await getAllTodos();
      //   console.log("adding todo:", addingTodo);
    } catch (err) {
      console.log("error", err);
    }
    // setTodoList([currentTodo, ...todoList]);
    // setCurrentTodo("");
  };

  const onCheckboxClick = async (todoId) => {
    const updatingTodo = doc(db, "todolist", todoId);
    await setDoc(updatingTodo, { isCompleted: true }, { merge: true });
    await getAllTodos();
    // console.log("checkbox clicked");
  };
  const onDeleteClicked = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todolist", todoId));
      await getAllTodos();
    } catch (err) {
      console.log("error", err);
    }
    // console.log("checkbox clicked", id);
  };
  return (
    <div className="todo-container">
      <div className="todo-container__input-box">
        <input
          value={currentTodo}
          onChange={onInputChange}
          placeholder="Enter to do"
        />
        <button onClick={onAddBtnClick}>Add</button>
      </div>
      <div className="todo-container__list-view">
        {todoList.map((el, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={el.isCompleted}
                onChange={() => onCheckboxClick(el.id)}
              ></input>
              <span>{el.text}</span>
              <button onClick={() => onDeleteClicked(el.id)}>X</button>
              {/* <p>{el.isCompleted +""}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoApp;
