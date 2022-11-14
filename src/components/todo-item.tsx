import React, { useState } from "react";
import { isPropertySignature } from "typescript";
interface Props {
 todo : Todo;
 onDelete : ()=>void;
 onTodoStatusChange : ()=>void;
 onTextChange : (text:string)=>void;
}

export interface Todo {
    id? : number;
    name : string;
    isDone? : boolean;
}

const Todoitem = (props : Props) => {
    const [isTextEditable, setIsTextEditable] = useState<boolean>(false);

    
const handleTextChange = (e:any)=>{
   
    props.onTextChange(e.target.value);
};

const onTextKeyPress = (e:any)=>{
    if (e.keyCode === 13){
        setIsTextEditable(false);
        return;
    }
};
    return (

        <div className="flex gap-9 flex-none">
            <input type="checkbox" 
                checked={props.todo.isDone}
                onChange={props.onTodoStatusChange} />
           {!isTextEditable && ( <label 
                className={props.todo.isDone ? 'line-through' : '' }
                onClick={()=>setIsTextEditable(true)}
            >{props.todo.name}</label> )}
            {isTextEditable && <input type="text" className="bg-teal-400"
                                      value={props.todo.name}
                                      onChange={handleTextChange}
                                      onKeyDown ={onTextKeyPress} /> }  
            <button onClick={props.onDelete}>X</button>
        </div>
    );
};

export default Todoitem;