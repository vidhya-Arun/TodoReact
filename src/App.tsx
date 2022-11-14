import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todoitem , {Todo} from './components/todo-item';
import axios from 'axios';
import { createTodo } from './api.service';
import { deleteTodo } from './api.service';

const APIToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZGVqcXJ1aWJjdnFtaGZkbGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY4MTIxNTMsImV4cCI6MTk4MjM4ODE1M30.a7pK5oTvSMVrdqNspecQDZ0ik2t13_xmgVyEbDvZx1M' ;
function App() {
// state in function using hooks (useState)
const [todoText, setTodoText] = useState('');
const [todoList, setTodoList] = useState<Array<Todo>>([]);
useEffect(() => {
  axios.get('https://pndejqruibcvqmhfdlcu.supabase.co/rest/v1/Todos', {
    headers: {
      'apikey' : APIToken,
      'Authorization' : `Bearer ${APIToken}` ,
    }
  }).then((rsp)=>{
    console.log('rsp' , rsp.data);
    setTodoList(rsp.data);
    console.log(todoList);
  });
  //db table field name must match with the code name used. 
  return() =>{
    console.log('Call this when component unloads');
  };
  
},[]);

const onTodoChange =(e:any)=>{
console.log('Event is ' + e.target.value);
setTodoText( e.target.value);
};

const onTodoKeyDown = async (e:any)=>{
if (e.keyCode===13){

  //call the API to post the data into table
  const apiResponse = await createTodo({
    name : todoText,
  }).catch(Error)
  {
    console.log(Error)
  }
  setTodoList(
    todoList.concat({
      isDone : false,
      name : todoText,
    })
  );
  setTodoText('');
}
};

const onTodoDelete = async (index: number)=>{
    const arrayCopy = [...todoList];
    arrayCopy.splice(index,1);
    const selectedItem = todoList[index]
    //delete from db 
    console.log("select",selectedItem.id)
    const apiResponse = await deleteTodo(selectedItem.id)
    .then(rsp =>{
      console.log("res",rsp)
      //setTodoList(rsp.data)
    })
    .catch(Error)
  {
    console.log(Error)
  }
       
    setTodoList(arrayCopy);
};

const onTodoStatusChange = (index:number)=>{
    const arrayCopy = [...todoList];
    arrayCopy[index].isDone = !arrayCopy[index].isDone;
    setTodoList(arrayCopy);
};

const onTodoTextChange = (index:number, text: string) =>{
    const arrayCopy = [...todoList];
    arrayCopy[index].name = text;
    setTodoList(arrayCopy);
};

  return (
    <div className='container line mt-5 ml-5 mr-5 mb-5 bg-green-300'>
      <br></br>
      <h3 className='text-center'> Todo List</h3>
      <input 
      type="text" 
      className='flex justify-center ml-11 mt-7' 
      placeholder='enter a task'
      onChange={onTodoChange}
      onKeyDown={onTodoKeyDown} 
      value={todoText} />
    
       <div id="todolist" className='flex-col mt-5'>
        {todoList.map((todo,index)=>
        <Todoitem 
        key={index} 
        todo={todo} 
        onDelete={()=> onTodoDelete(index)}
        onTodoStatusChange={()=>onTodoStatusChange(index)}
        onTextChange = {(text)=>onTodoTextChange(index,text)}
        />)}

      </div>
    </div>
  );
}

export default App;
