"use client";

import { ITask } from "@/types/tasks";
import { Dispatch, FC, FormEventHandler, SetStateAction, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { deleteTodo, editTodo } from "../../../api";
import { CATEGORIES, CATEGORY_COLORS, PRIORITIES, PRIORITY_COLORS, PRIORITY_ORDER } from "@/constants";


interface TaskProps {
  task: ITask;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  setFilteredTasks: Dispatch<SetStateAction<ITask[]>>;
}

const Task: FC<TaskProps> = ({ task, setTasks, setFilteredTasks }) => {


  const categoryColorClass = CATEGORY_COLORS[task.category] || 'bg-gray-500';
  const priorityColorClass = PRIORITY_COLORS[task.priority] || "bg-gray-500";

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [editTaskInfo, setEditTaskInfo] = useState<ITask>({
    id: task.id,
    desc: task.desc,
    category: task.category,
    priority: task.priority,
    completed: task.completed,
  });

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await editTodo({
        id: editTaskInfo.id,
        desc: editTaskInfo.desc,
        category: editTaskInfo.category,
        priority: editTaskInfo.priority,
        completed: false,
      });
      const updateAndSortTasks = (tasks: ITask[]) => {
        const updatedTasks = tasks.map(task => task.id === updatedTask.id? updatedTask : task)
        return updatedTasks.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
      }
      setTasks(prevTasks => updateAndSortTasks(prevTasks));
      setFilteredTasks(prevTasks => updateAndSortTasks(prevTasks));

      setOpenModalEdit(false);
    } catch (error) {
      console.error("Failed to edit task:", error);
      alert("Failed to edit task. Please try again.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      setFilteredTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      setOpenModalDeleted(false);
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const toggleCompleted = async (task: ITask) => {
    try {
      const updatedTask = {...task, completed:!task.completed };
      await editTodo(updatedTask);
      setTasks(prevTasks => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      setFilteredTasks(prevTasks => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  useEffect(() => {
    setTasks(prevTasks => [...prevTasks].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]))
    setFilteredTasks(prevTasks => [...prevTasks].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]))
  }, [setTasks, setFilteredTasks]);
  return (
    <tr key={task.id}>
      <td className='font-semibold text-md flex gap-2 items-center'>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task)} />
        <span className={task.completed ? "line-through" : ""}>{task.desc}</span>
      </td>
      <td>
        <span className={`text-white px-2 py-1 rounded-md ${categoryColorClass}`}>{task.category}</span>
      </td>
      <td>
        <span className={`text-white px-2 py-1 rounded-md ${priorityColorClass}`}>{task.priority}</span>
      </td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form
            onSubmit={handleSubmitEditTodo}
            className="flex flex-col items-center gap-8 pt-8 pb-32">
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action flex flex-col gap-6'>
              <input
                value={editTaskInfo.desc}
                onChange={(e) => setEditTaskInfo({ ...editTaskInfo, desc: e.target.value })}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <select
                value={editTaskInfo.category}
                onChange={(e) => setEditTaskInfo({ ...editTaskInfo, category: e.target.value })}
                className="rounded-md bordered text-lg outline-none">
                <option selected hidden>{editTaskInfo.category || "Category"}</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={editTaskInfo.priority}
                onChange={(e) => setEditTaskInfo({ ...editTaskInfo, priority: e.target.value })}
                className="rounded-md bordered text-lg outline-none">
                <option selected hidden>{editTaskInfo.priority || "Priority"}</option>
                {PRIORITIES.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn  bg-red-600 text-white hover:bg-red-500'>
              Yes
            </button>
            <button className="btn" onClick={() => setOpenModalDeleted(false)}>No</button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
