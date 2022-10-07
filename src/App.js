import React from 'react';
import style from './styles/style.css';
import _ from 'lodash';
import Header from './components/Header.js';
import Form from './components/Form.js';
import RenderTasks from './components/RenderTasks.js';

const App = () => {
  const [text, setText] = React.useState('');
  const [tasks, setTasks] = React.useState([]);
  const [progress, setProgress] = React.useState({ commonCount: 0, completedCount: 0, percentage: 0 });
  
  const updateText = (e) => {
    const newValue = e.target.value;
    setText(newValue);
  };
  
  const updateTasks = (e) => {
    e.preventDefault();
    const newTask = { id: _.uniqueId(), name: text, completed: false };
    const newTasks = [newTask, ...tasks];
    
    setTasks(newTasks);
    setText('');
  };
  
  const toggleActiveTask = (id) => (e) => {
    const copyTasks = tasks.slice();
    const indexTask = copyTasks.findIndex((task) => task.id === id);
    copyTasks[indexTask]['completed'] = e.target.checked;
    setTasks(copyTasks);
  }
  
  const deleteTask = (id) => () => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }
  
  React.useEffect(() => {
    const commonCount = tasks.length;
    const completedCount = tasks.filter((task) => task.completed).length;
    const percentage = Math.floor(((completedCount / commonCount) * 100)) || 0;
    const newProgress = { commonCount, completedCount, percentage };
    setProgress(newProgress);
  }, [tasks]);
 
  return (
    <>
      <Header />
      <Form value={text} updateText={updateText} updateTasks={updateTasks}/>
      {tasks.length > 0 && (
        <div className="tasks-container">
          <RenderTasks tasks={tasks} toggleActiveTask={toggleActiveTask} deleteTask={deleteTask}/>
          <div className="progress-container">
            <label className="progress" for="progress">Выполнено задач:</label>
            <progress className="progress" id="progress" max="100" value={progress.percentage}></progress>
            <span className="progress">{`${progress.completedCount} / ${progress.commonCount}`}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default App;
