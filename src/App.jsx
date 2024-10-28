import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState(() => {
    let allTodosJson = localStorage.getItem("todos");
    if (allTodosJson) {
      let allTodos = JSON.parse(allTodosJson);
      return allTodos;
    }
    else {
      return ([]);
    }
  });
  const [finishedTasks, setFinishedTasks] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setFinishedTasks(!finishedTasks);
  }

  const handleNewTodo = (e) => {
    setNewTodo(e.target.value);
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), newTodo, isCompleted: false }]);
    setNewTodo('');
    saveToLocalStorage();
  }

  const handleEdit = (e, id) => {
    let thatTodo = todos.filter(item => {
      return (item.id === id);
    })
    setNewTodo(thatTodo[0].newTodo);
    let newTodos = todos.filter(item => {
      return (item.id !== id) // This is a great method as filter adds only those ids who do not match with the deleting request one!
    })
    setTodos(newTodos);
    saveToLocalStorage();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return (item.id !== id) // This is a great method as filter adds only those ids who do not match with the deleting request one!
    })
    setTodos(newTodos);
    saveToLocalStorage();
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(thatTodo => {
      return (thatTodo.id === id);
    })
    let newTodos = [...todos]; //let newTodos = todos; --> This copies the reference of the array and no new array is formed which hinders the line-striking style effect as the reference does not count as a state and the element does not re-render! (VVIMP concept)
    newTodos[index].isCompleted = !(newTodos[index].isCompleted);
    setTodos(newTodos);
    saveToLocalStorage();
  }

  return (
    <>
      <Navbar />
      <div className="todoContainer bg-[#378370] w-full md:w-[50%] md:mx-auto py-2 md:m-5 my-3 rounded-lg min-h-[80vh] md:min-h-[85vh]">
        <div className="addTodo flex gap-3 md:gap-6 items-center my-3 px-2 md:px-6 pb-3 border-b md:justify-normal justify-between">
          <h2 className='add w-auto whitespace-nowrap text-sm md:text-xl'>Add a Todo</h2>
          <input className='text-black w-full p-2 rounded-xl' type="text" name="todo" value={newTodo} onChange={handleNewTodo} />
          <button className="add p-2 rounded-full border disabled:bg-red-500 hover:bg-[#7340A0] transition-all duration-300" disabled={newTodo.length < 1} onClick={handleAdd}>
            <img src="./src/assets/add.svg " alt="add" />
          </button>
        </div>
        <div className="showingTodos flex justify-between">
          <h1 className="yourTodo text-lg md:text-3xl font-bold my-3 px-2 md:px-6 md:justify-normal justify-between">Your To-DOs</h1>
          <div className="input flex items-center md:mx-7 mx-3 gap-3 md:text-xl text-sm">
            <input className='md:h-7 h-5 md:w-7 w-5' type="checkbox" onChange={toggleFinished} checked={finishedTasks} />
            Show Finished
          </div>
        </div>
        <div className="todos flex md:px-6 px-3 pb-3">
          <ol className='list-decimal px-3 w-full md:text-2xl text-md mx-auto'>
            {
              todos.length === 0 && <div className='md:my-3 pl-2 md:pl-7 text-lg md:text-2xl'>
                No To-Dos to Display
              </div>
            }
            {
              todos.map(singleTodo => {
                return ((finishedTasks || !singleTodo.isCompleted) &&
                  <li key={singleTodo.id} className="text flex justify-between items-center my-3 md:pl-7 pl-2">
                    <div className="list-item w-[45%] md:w-[80%]">
                      <p style={singleTodo.isCompleted ? { textDecorationLine: 'line-through' } : { textDecorationLine: '' }} className="text truncate">{singleTodo.newTodo}</p>
                    </div>
                    <div className="buttonOps flex gap-5 items-center">
                      <input className='md:h-7 h-5 md:w-7 w-5' type="checkbox" name={singleTodo.id} onChange={handleCheckBox} checked={singleTodo.isCompleted} />
                      <button className="edit p-2 rounded-full border hover:bg-[#7340A0] transition-all duration-300" onClick={(e) => { handleEdit(e, singleTodo.id) }}>
                        <img src="./src/assets/edit.svg" alt="edit" />
                      </button>
                      <button className="delete p-2 rounded-full border hover:bg-red-500 transition-all duration-300" onClick={(e) => { handleDelete(e, singleTodo.id) }}>
                        <img src="./src/assets/delete.svg" alt="delete" />
                      </button>
                    </div>
                  </li>
                )
              })
            /* 
            Logic of this return statements starting logic: (finishedTasks || !singleTodo.isCompleted) && elemnt
            E.g. finished tasks = false --> I dont want to show finished tasks
            false || !(all tasks who are not complete = false) --> True --> Show : Yes --> Works
            false || !(all tasks who are completed = true) --> False --> Show : No --> Works
            */}
          </ol>
        </div>
      </div>
      <footer className='text-center flex justify-around md:w-1/2 md:mx-auto mb-3'>
        <a className='hover:underline' href="http://github.com/lakshmeghani" target='_blank'>Code Base</a>
        <p className="moto font-bold">Sow the Seeds of Productivity</p>
      </footer>
    </>
  )
}

export default App