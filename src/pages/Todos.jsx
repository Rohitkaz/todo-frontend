import { useState, useRef, useEffect } from "react";
import "../style.css";

import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
//import { CiCircleCheck } from "react-icons/ci";
//import { MdDelete } from "react-icons/md";
export default function Todos() {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const Loaddata = useLoaderData();
  const [todos, setTodos] = useState(Loaddata);
  const [task_id, setTask_id] = useState("");
  const myArray = ["apple", "banana", "orange"];
  async function deletetask(e) {
    const task_id = e.target.id;
    // const queryparams = new URLSearchParams(task_id);

    const res = await axios.delete(
      `https://todo-backend-mv0j.onrender.com/${task_id}`,

      { withCredentials: true }
    );
    const todo = res.data;
    setTodos((prev) => prev.filter((todo) => todo._id != task_id));
  }
  async function handleclick() {
    try {
      const res = await axios.post(
        "https://todo-backend-mv0j.onrender.com/todos",
        { task },
        { withCredentials: true }
      );
      const todo = await res.data;
      setTodos((prev) => [...prev, todo]);
    } catch (err) {
      console.log(err.message);
      navigate("/login");
    }
  }

  async function Logout() {
    try {
      const res = await axios.get(
        "https://todo-backend-mv0j.onrender.com/logout",
        {
          withCredentials: true,
        }
      );
      console.log(res.status);
      if (res.status === 204) navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  }
  async function completed(e) {
    const task_id = e.target.id;
    console.log(task_id);

    try {
      const res = await axios.put(
        `https://todo-backend-mv0j.onrender.com/todos`,
        { task_id },
        { withCredentials: true }
      );
      const todo = await res.data;
      console.log(todo);
      setTodos(todo);
    } catch (err) {
      console.log("ERROR");
      navigate("/login");
    }
  }
  return (
    <>
      <div id="mainbox">
        <div id="text"> JUST DO IT.|</div>
        <div id="inputwrapper">
          <input
            id="todoinput"
            type="text"
            placeholder="Add a task."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></input>
          <button id="todobutton" onClick={handleclick}>
            I GOT THIS!
          </button>
          <button id="getdata" onClick={Logout}>
            logout
          </button>
        </div>
      </div>
      <div id="todos">
        {error}
        {todos && todos.length !== 0 ? (
          todos.map((todo, index) => (
            <>
              <div className="todoitem">
                <div className={todo.completed} key={index}>
                  {todo.task}
                </div>
                <div className="cardbuttons">
                  <button
                    className="todocheck"
                    onClick={completed}
                    id={todo._id}
                  >
                    {" "}
                    check
                  </button>
                  <button
                    className="tododelete"
                    id={todo._id}
                    onClick={deletetask}
                  >
                    delete
                  </button>
                </div>
              </div>
            </>
          ))
        ) : (
          <span id="tasktest">Add task to see</span>
        )}
      </div>
    </>
  );
}
