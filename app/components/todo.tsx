"use client";
import React, { useState } from 'react';
import {useAutoAnimate} from '@formkit/auto-animate/react'
import { todo } from 'node:test';

function TodoApp() {
  const [animateParent] = useAutoAnimate();
  const [todos, setTodos] = useState([
    { id: 1, text: "Todo 1" },
    { id: 2, text: "Todo 2" },
    { id: 3, text: "Todo 3" }
  ]);

  const [inputText, setInputText] = useState("");
  const [editeMode, setEditeMode] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");


  function addTodo(){
    if(inputText.trim() !== ''){
        const isExistingTodo = todos.some((todo) => 
                                    todo.text === inputText);

        if (isExistingTodo){
            alert("This todo already exists!");
            setInputText("");
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            text: inputText
        };

        setTodos([...todos,newTodo]);
        setInputText("");
    }
  }
  function deleteTodo(id: number){
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function editTodo(id: number){
    setEditeMode(id);
    const todoToEdit = todos.find((todo) => todo.id == id);
    if(todoToEdit){
        setEditedText(todoToEdit.text)
    }
  }
  function saveEditedTodo(){
    const updatedTodos = todos.map((todo) => todo.id === 
                            editeMode ? {...todo, text:editedText} : todo
                        );

    setTodos(updatedTodos);
    setEditeMode(null);
  }


  return (
    <div className="">
        <h2  className="text-9x1 font-bold mb-4"> Todo App</h2>
        <div className="flex mb-4">
            <input onChange ={(e) => setInputText(e.target.value)}
                   value={inputText}
                   type="text"
                   placeholder="Add a todo ..."
                   className="border-gray-300 
                              border rounded-1 
                              px-4 py2"/>
            <button onClick={addTodo}
                    className="bg-blue-500
                               text-white 
                               px-4
                               py-2
                               rounded-r">
                Add
            </button>
        </div>
        <ul ref={animateParent} >
            {todos.map((todo) => (

                <li key={todo.id}
                    className="flex items-center
                               justify-between
                               border-b py-2">

                    {editeMode === todo.id ? (
                        <>
                            <input onChange ={(e) => setEditedText(e.target.value)}
                                   value={editedText}
                                   type="text"
                                   className="border-gray-300 
                                              border rounded-1 
                                              px-4 py2" />
                            <button onClick={saveEditedTodo}
                                    className="bg-green-500
                                               text-white 
                                               px-4 py-2
                                               rounded-r">
                                Save
                            </button>
                        </> 
                    ) : (
                        <>
                            {/* todo, edit, and delete buttons*/ }
                            <span>{todo.text}</span>
                            <div>
                                <button onClick={() => editTodo(todo.id)}
                                        className="text-yellow-500
                                                mr-2">
                                    Edit
                                </button>
                                <button onClick={() => deleteTodo(todo.id)}
                                        className="text-red-500">
                                    Delete
                                </button>
                            </div>
                        </>
                )}
                </li>
            ))}

        </ul>
    </div>
  );
}

export default TodoApp;