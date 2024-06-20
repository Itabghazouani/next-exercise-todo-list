import { ITask } from "@/types/tasks";
import { Dispatch, FC, SetStateAction } from "react";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  setFilteredTasks: Dispatch<SetStateAction<ITask[]>>;
}

const TodoList: FC<TodoListProps> = ({ tasks, setTasks, setFilteredTasks }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} setTasks={setTasks} setFilteredTasks={setFilteredTasks} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
