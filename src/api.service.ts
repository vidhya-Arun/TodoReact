import axios from "axios";
import { Todo } from "./components/todo-item";

const APIToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZGVqcXJ1aWJjdnFtaGZkbGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY4MTIxNTMsImV4cCI6MTk4MjM4ODE1M30.a7pK5oTvSMVrdqNspecQDZ0ik2t13_xmgVyEbDvZx1M' ;

export const createTodo = async (todo: Todo) =>{
const apiURL = 'https://pndejqruibcvqmhfdlcu.supabase.co/rest/v1/Todos';

    const rsp = await axios.post(apiURL , todo,{
        headers: {
            'apikey' : APIToken,
            'Authorization' : `Bearer ${APIToken}` ,
          }
    });

}

//export const deleteTodo = async (todo: Todo) =>{
export const deleteTodo = async (id : number | undefined) =>{

const apiURL = `https://pndejqruibcvqmhfdlcu.supabase.co/rest/v1/Todos/?id=eq.${id}`;
console.log(apiURL);
    const rsp = await axios.delete(apiURL ,{
        headers: {
            'apikey' : APIToken,
            'Authorization' : `Bearer ${APIToken}` ,
          }
    });

}