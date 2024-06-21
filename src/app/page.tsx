"use client"

import { ITask } from "@/types/tasks";
import { deleteAllTodos, getAllTodos } from "../../api";
import { AddTask, CategoryFilter, ClearTasks, TodoList } from "./components";
import { useEffect, useState } from "react";


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

  const handleClearTasks = async () => {
    await deleteAllTodos()
    setTasks([])
    setFilteredTasks([])
    setSelectedCategory('')
  }

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
        <AddTask setTasks={setTasks} setFilteredTasks={setFilteredTasks} />
        <div className="flex gap-6 items-center justify-center">
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <ClearTasks clearTasks={handleClearTasks} />
        </div>
      </div>
      <TodoList tasks={filteredTasks} setTasks={setTasks} setFilteredTasks={setFilteredTasks} />
    </main>
  );
}

export default Home;
