import { ITask } from "@/types/tasks"
import { FC } from "react"
import Task from "./Task"

interface TodoListProps {
  tasks: ITask[]
}
const TodoList: FC<TodoListProps> = ({tasks}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task task={task} key={task.id}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
