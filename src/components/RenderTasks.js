const RenderTasks = (props) => {
  const { tasks, toggleActiveTask, deleteTask } = props;
  
  return (
    tasks.map(({ id, name, completed }) => (
      <div className='task-wraper' key={`task-${id}`}>
        <div className={ completed ? "task completed": "task" }>
          <span>{name}</span>
          <input type="date" />
        </div>
        <input type="checkbox" onChange={toggleActiveTask(id)}/>
        <input className="btn done" type="submit" value="Удалить" onClick={deleteTask(id)}/>
      </div>
    ))
  );
};

export default RenderTasks;