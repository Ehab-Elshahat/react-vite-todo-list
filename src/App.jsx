/** @format */

import { useState, useEffect } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
     if (newTask.trim() === "") {
       alert("Please enter a task");
       return;
     }
    const newTasks = [...tasks, { text: newTask, completed: false }];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setNewTask(" ");
  };

  const handleToggleCompleted  = (index) => {
    const updatedTasks = tasks.map((task, i) =>{
      if(i === index) {
        task.completed = !task.completed
      }
      return task;
    })
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }


  const handleUncompletedTasks = ()=>{
    const updatedTasks = JSON.parse(localStorage.getItem("tasks")).filter(
      (task) => !task.completed
    );
    setTasks(updatedTasks)
   
  }
  const handleCompletedTasks = ()=>{
    const updatedTasks = JSON.parse(localStorage.getItem("tasks")).filter(
      (task) => task.completed
    );
    setTasks(updatedTasks)
   
  }
  const handleShowAllTasks = ()=>{
   
   setTasks(JSON.parse(localStorage.getItem("tasks")));
   
  }

  const handleDeleteCompletedTasks = ()=>{
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    const updateTasks = tasks.filter(task=> !task.completed)
    localStorage.setItem('tasks',JSON.stringify(updateTasks))
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }
 

  return (
    <div className="container">
      <h1 className="title">To do list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="buttons">
        <button onClick={handleCompletedTasks}>Completed</button>
        <button onClick={handleUncompletedTasks}>Uncompleted</button>
        <button onClick={handleShowAllTasks}>All</button>

        <button onClick={handleDeleteCompletedTasks}>Delete Completed</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            text={task.text}
            completed={task.completed}
            onToggleCompleted={() => handleToggleCompleted(index)}
            onDelete={() => handleDeleteTask(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
