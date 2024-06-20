page.tsx

const handleClearTasks = async () => {
    try {
      await deleteAllTodos()
      setTasks([])
      setFilteredTasks([])
      setSelectedCategory('')

    } catch (error) {
      console.error("Failed to clear all tasks:", error);
      alert("Failed to clear all tasks. Please try again.");
    }
  }
<div className="flex gap-6 items-center justify-center">
  <ClearTasks clearTasks={handleClearTasks}/>

  cleartasks.tsx

  import { FC } from "react"

interface ClearTasksProps {
  clearTasks: () => void
}

const ClearTasks: FC<ClearTasksProps> = ({ clearTasks }) => {

  return (
    <button onClick={clearTasks} className="text-md rounded-md shadow-md bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 mt-[-17px]" type="button">Clear List</button>
  )
}

export default ClearTasks
