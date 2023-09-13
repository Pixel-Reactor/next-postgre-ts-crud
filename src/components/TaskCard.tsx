import React, { useState, useEffect, ChangeEvent } from "react";
import { MdDone } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { Task } from "@/interfaces/Task";

export interface TaskCardProps {
  task: Task;
  upt: number;
  updset: (upt: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, upt, updset }) => {
  const [taskState, settaskState] = useState(task);
  const [updatetaskState, setupdatetaskState] = useState(task);
  const [edit, setedit] = useState(false);
  
  const HandleDone = async () => {
    settaskState({
      ...taskState,
      done: 1,
    });
    const Updated = { ...taskState, done: 1 };
    const response = await fetch("http://localhost:3000/api/tasks/" + task.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Updated),
    });
    updset(upt + 1);
  };
  const HandleUpdate = async () => {
    try {
      const Updated = {...updatetaskState} 
      settaskState(Updated)
      const response = await fetch("http://localhost:3000/api/tasks/" + task.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Updated),
      });
      setedit(false);
      updset(upt + 1);
  
    } catch (error) {
      console.log(error)
    }
  
  };

  const HandleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setupdatetaskState({ ...updatetaskState, [name]: value });
  };

  const HandleDelete = async () => {
    const response = await fetch("http://localhost:3000/api/tasks/" + task.id, {
      method: "DELETE",
    });
    const result = await response.json();
    updset(upt + 1);
  };

  return (
    <div className="flex justify-between items-center border-b h-full border-slate-200 py-3 px-2 border-l-4  border-l-transparent">
      <div className="inline-flex items-center space-x-2 ">
        <div
          onClick={HandleDone}
          className=" w-8 h-full flex items-center justify-center"
        >
          {taskState.done ? (
            <MdDone />
          ) : (
            <IoMdCheckmarkCircleOutline size={25} />
          )}
        </div>
        <div className=" flex flex-col">
          <div className="">
            {edit ? (
              <input
                type="text"
                className="p-1 mb-1"
                name="title"
                placeholder={updatetaskState.title}
                onChange={HandleChange}
                value={updatetaskState.title}
                autoFocus
              />
            ) : (
              <div
                className={`text-slate-500 font-semibold ${
                  taskState.done ? "line-through" : ""
                }`}
              >
                {taskState.title}
              </div>
            )}

            {edit ? (
              <input
                type="text"
                className="p-1"
                name="description"
                onChange={HandleChange}
                placeholder={updatetaskState.description}
                value={updatetaskState.description}
              />
            ) : (
              <div
                className={`text-slate-500 ${
                  taskState.done ? "line-through" : ""
                }`}
              >
                {taskState.description}
              </div>
            )}
          </div>
          {edit &&   
          <button 
          onClick={HandleUpdate}
          className="relative w-full h-10 p-[2px] inline-flex items-center justify-center  my-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 w-full h-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center justify-center">
              Guardar
            </span>
          </button>}
        
        </div>
      </div>
      {!edit? 
        <div className="flex ">
        <div
          onClick={() => setedit(true)}
          className=" w-7 h-7 flex justify-center items-center hover:scale-110 hover:text-amber-600  transition-all"
        >
          <AiOutlineEdit />
        </div>
        <div
          onClick={HandleDelete}
          className=" w-7 h-7 flex justify-center items-center hover:scale-110 hover:text-red-700  transition-all"
        >
          <MdOutlineDeleteOutline />
        </div>
      </div> : 
      <div 
      className="border border-zinc w-10 h-6 flex items-center justify-center"
      onClick={()=>setedit(false)}
      >
        <AiOutlineClose size={17}/> 
      </div>}
    
    </div>
  );
};

export default TaskCard;

