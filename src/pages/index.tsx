import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";
import TaskCard from "@/components/TaskCard";
import Title from "@/components/Header";
import { GrAdd } from "react-icons/gr";
import NewPage from "./tasks/new";


interface Props {
  tasks: Task[];
}

export const index = ({ tasks }: Props) => {
  const [update, setupdate] = useState(0);
  const [newSection, setnewSection] = useState(false)
  const [tasksState, settasksState] = useState(tasks);
  useEffect(() => {
    const Refresh = async () => {
      const res = await fetch(`http://localhost:3000/api/tasks`);
      const tasks = await res.json();
      settasksState(tasks);
      setnewSection(false);
    };
    Refresh();
  }, [update]);

  return (
    <div className=" bg-white text-slate-700  min-h-screen p-2">
      <Title />

      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-400">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-medium">Tasks list</h1>
          </div>
          <div onClick={()=>newSection? setnewSection(false): setnewSection(true)} className={`${newSection? 'rotate-[315deg]':'rotate-0'} rounded-full hover:bg-slate-400/10 transition-all hover:border hover:border-zinc-600/60 w-7 h-7 flex justify-center items-center`}>
            <GrAdd />
          </div>
        </div>
        <p className="text-slate-500">Hello, here are your latest tasks</p>

        <NewPage upt={update} updset={setupdate} on={newSection} />

        <div className="my-5 p-3">

          {tasksState ? (
            tasksState.map((item) => (
              <TaskCard
                key={item.id}
                task={item}
                upt={update}
                updset={setupdate}
              />
            ))
          ) : (
            <h1>No tasks yet</h1>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  return {
    props: {
      tasks: tasks,
    },
  };
};
