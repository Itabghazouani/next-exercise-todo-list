"use client"

import { ITask } from "@/types/tasks";
import { PRIORITY_ORDER } from "@/constants";
import { getAllTodos } from "../../api";
import { AddTask, TodoList } from "./components";
import { useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";

const Home = () => {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getAllTodos()
      setTasks(fetchedTasks)
      setFilteredTasks(fetchedTasks)
    }
    fetchTasks()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      const filtered = tasks.filter(task => task.category === selectedCategory)
      setFilteredTasks(filtered)
    } else {
      setFilteredTasks(tasks)
    }
  }, [selectedCategory, tasks])

  // const sortedTasks = tasks.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  // ;

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
        <AddTask  setTasks={setTasks} setFilteredTasks={setFilteredTasks}/>
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>
      <TodoList tasks={filteredTasks} setTasks={setTasks} setFilteredTasks={setFilteredTasks}/>
    </main>
  );
}

export default Home;
