import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    function getRandomNumber(min:number, max:number) {
      return Math.ceil(Math.random() * (max - min) + min);
    }

    if (newTaskTitle != "") {
      let task:Task = {
        id: getRandomNumber(1,9999),
        title: newTaskTitle,
        isComplete: false
      }
      setNewTaskTitle('');
      setTasks([...tasks,task]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let tempTasks:Task[] = [...tasks];
    for (var i in tasks) {
      if (tasks[i].id === id) {
        tempTasks[i].isComplete = !tempTasks[i].isComplete;
      }
    }
    setTasks(tempTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let tempTasks:Task[] = [...tasks];
    for (var i in tasks) {
      if (tasks[i].id === id) {
        delete tempTasks[i];
      }
    }
    setTasks(tempTasks.filter(function( element ) {return element !== undefined;}));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}