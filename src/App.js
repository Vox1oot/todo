import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import _ from 'lodash';
import Header from './components/Header.js';
import Form from './components/Form.js';
import RenderTasks from './components/RenderTasks.js';
import  './styles/style.css';

const App = () => {
  const [state, setState] = useImmer({ text: '', tasks: [] });
  const [progress, setProgress] = useState({ commonCount: 0, completedCount: 0, percentage: 0 });
  
  const updateText = (e) => {
    setState((draft) => {
      draft.text = e.target.value;
    });
  };
  
  const updateTasks = (e) => {
    e.preventDefault();
    const newTask = { id: _.uniqueId(), name: state.text, completed: false };
    const newTasks = [newTask, ...state.tasks];

    setState((draft) => {
      draft.tasks = newTasks;
      draft.text = '';
    });
  };
  
  const toggleActiveTask = (id) => (e) => {
    const indexTask = state.tasks.findIndex((task) => task.id === id);
    setState((draft) => {
      draft.tasks[indexTask]['completed'] = e.target.checked;
    });
  };
  
  const deleteTask = (id) => () => {
    const filteredTasks = state.tasks.filter((task) => task.id !== id);
    setState((draft) => {
      draft.tasks = filteredTasks;
    })
  };
  
  React.useEffect(() => {
    const commonCount = state.tasks.length;
    const completedCount = state.tasks.filter((task) => task.completed).length;
    const percentage = Math.floor(((completedCount / commonCount) * 100)) || 0;
    const newProgress = { commonCount, completedCount, percentage };
    setProgress(newProgress);
  }, [state]);
 
  return (
    <>
      <Header />
      <Form value={state.text} updateText={updateText} updateTasks={updateTasks}/>
      {state.tasks.length > 0 && (
        <div className="tasks-container">
          <RenderTasks tasks={state.tasks} toggleActiveTask={toggleActiveTask} deleteTask={deleteTask}/>
          <div className="progress-container">
            <label className="progress"htmlFor="progress">Выполнено задач:</label>
            <progress className="progress" id="progress" max="100" value={progress.percentage}></progress>
            <span className="progress">{`${progress.completedCount} / ${progress.commonCount}`}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default App;
