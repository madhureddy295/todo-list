import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority]=useState('');
  const [editIndex, setEditIndex] = useState(null);
  const priorities=['Hospital','Work','Game','other'];
  const categories = ['All','Complete','Incomplete'];
  const addTask = () => {
    if (input.trim() && ! tasks.some(task => task.text ===input.trim())) {
      const newTask ={
        text:input.trim(),
        
        completed:false,
        date:new
        Date().toLocaleString(),
        category:category,
        priority:priority
      };
      if (editIndex !== null){
        const updatedTasks = tasks.map((task,index) =>
        index === editIndex ?  newTask :task);
        setTasks(updatedTasks);
        setEditIndex(null);
}  
else{
  
    
      setTasks([...tasks,newTask,]);}
      setInput('');
      setCategory('All');
      setPriority('Hospital');
    }
  };
  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };
  const deleteTask = (index) => {
    if (window.confirm('Are you sure you want to delete this task?')){
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    }
  };
  const startEditTask =(index) => {
    setInput(tasks[index].text);
    setCategory(tasks[index].category);
   setPriority(tasks[index].priority)
    setEditIndex(index);
  };

  const filteredTasks=tasks.filter(task =>category === 'All' || (category === 'Complete' && task.completed)||(category ==='Incomplete'&& ! task.completed));
  
    return (
    <div className="app">
      <header className="header">
        <h1>TODO LIST APPLICATION</h1>
      </header>
      <div className='spacing'>
      <select value={category}onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat,index) =>( <option key ={index} value={cat}>{cat}</option>
            ))}
            </select>
           
            </div>
      <div className="input-container">
        
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {priorities.map((pri, index) => (
            <option key={index} value={pri}>{pri}</option>
          ))}
        </select>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className='task-input'/>


          
          <button onClick={addTask}> AddTask</button>
          
      
      </div>
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? 'task completed' : 'task'}>
            <input type="checkbox" checked={task.completed}onChange={()=>toggleTask(index)}/>

              <span onClick={() => toggleTask(index)}>{task.text}</span>
         
            
            <span className="task-date">{task.date} </span>
          
            <div className='task-priority'>{task.priority}</div>
            <div className='task-actions'>
            <button onClick={() => deleteTask(index)}>🗑</button>
            <button onClick={() =>startEditTask(index)}>✎</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;











