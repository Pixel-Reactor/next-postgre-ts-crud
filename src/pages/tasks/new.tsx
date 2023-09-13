import { Task } from "@/interfaces/Task";
import React, { ChangeEvent, FormEvent, useState ,useEffect} from "react";

export interface NewCardProps {
  on:boolean;
  upt: number;
  updset: (upt: number) => void;
}


const  NewPage:React.FC<NewCardProps> = ({ on,upt, updset })=> {
  const [open, setopen] = useState(false);
  const [newtask, setNewtask] = useState({
    title: "",
    description: "",
    done:0
  });
  useEffect(() => {
   on? setopen(true) :setopen(false)
  }, [on])
  
  const HandleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewtask({ ...newtask, [name]: value });
  };

  const CreateTask = async (task: Task) => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),

      });
      console.log(res)
      updset(upt+1)
    } catch (error) {
      console.log('error',error);
    }
  };
  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreateTask(newtask);
  };
  return (
    <div className={`flex mx-auto items-center justify-center ${open? 'h-60': 'h-0'} overflow-hidden transition-all  shadow-lg  max-w-lg`}>
      <form
        onSubmit={HandleSubmit}
        className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <input
              type="text"
              placeholder="Write a title"
              name="title"
              onChange={HandleChange}
              className="bg-gray-100/10 rounded border border-gray-400 placeholder:text-zinc-600/80 leading-normal resize-none w-full h-10 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            />
          </div>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100/10 rounded border border-gray-400 leading-normal  placeholder:text-zinc-600/80 resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="description"
              placeholder="Type Your Comment"
              onChange={HandleChange}
              required
            />
          </div>
          <div className="w-full md:w-full flex items-start px-3">
            <div className="-mr-1 w-full">
              <input
                type="submit"
                className="bg-white w-full text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                value="Guardar"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default NewPage