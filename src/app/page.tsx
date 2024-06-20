
import { PRIORITY_ORDER } from "@/constants";
import { getAllTodos } from "../../api";
import { AddTask, TodoList } from "./components";


export default async function Home() {
  const tasks = await getAllTodos();

  const sortedTasks = tasks.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  ;
  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
        <AddTask />
      </div>
      <TodoList tasks={sortedTasks} />
    </main>
  );
}
