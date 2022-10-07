import React from "react";

const Form = (props) => {
  const { value, updateText, updateTasks } = props;
  
  const elem = React.useRef(null);
  
  const toggleTasks = (e) => {
    updateTasks(e);
    elem.current.focus();
  };
  
  return (
    <form onSubmit={toggleTasks}>
      <input type="text" maxlength="40" ref={elem} value={value} onChange={updateText} placeholder="Новая задача" required/>
      <input className="btn add" type="submit" value="Добавить" />
    </form>
  )
};

export default Form;