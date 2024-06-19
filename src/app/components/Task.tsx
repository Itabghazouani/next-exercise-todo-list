"use client"

import { ITask } from "@/types/tasks"
import { FC, FormEventHandler, useState } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import Modal from "./Modal"
import { useRouter } from "next/navigation"
import { deleteTodo, editTodo } from "../../../api"
import { CATEGORIES, CATEGORY_COLORS, PRIORITIES, PRIORITY_COLORS } from "@/constants"

interface TaskProps {
  task: ITask
}

const Task: FC<TaskProps> = ({ task }) => {

  const router = useRouter()

  const categoryColorClass = CATEGORY_COLORS[task.category] || 'bg-gray-500';
  const priorityColorClass = PRIORITY_COLORS[task.priority] || "bg-gray-500";

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [editTaskInfo, setEditTaskInfo] = useState<ITask>({
    id: task.id,
    desc: task.desc,
    category: task.category,
    priority: task.priority,
    completed: task.completed,
  })

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await editTodo({
      id: editTaskInfo.id,
      desc: editTaskInfo.desc,
      category: editTaskInfo.category,
      priority: editTaskInfo.priority,
      completed: editTaskInfo.completed,
    })
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id)
    setOpenModalDelete(false)
    router.refresh()
  }

  console.log(`Category: ${task.category}, Color Class: ${categoryColorClass}`)

  return (
    <tr key={task.id}>
      <td className="font-semibold text-md">{task.desc}</td>
      <td>
        <span className={`text-white px-2 py-1 rounded-md ${categoryColorClass}`}>{task.category}</span>
      </td>
      <td>
        <span className={`text-white px-2 py-1 rounded-md ${priorityColorClass}`}>{task.priority}</span>
      </td>
      <td className="flex gap-3">
        <FiEdit
          cursor="pointer"
          className="text-blue-600"
          size={20}
          onClick={() => setOpenModalEdit(true)} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form
            onSubmit={handleSubmitEditTodo}
            className="flex flex-col items-center gap-8 pt-8 pb-32">
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action flex flex-col gap-6">
              <input
                value={editTaskInfo.desc}
                onChange={(e) => setEditTaskInfo({ ...editTaskInfo, desc: e.target.value })}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-full" />
              <select
                value={editTaskInfo.category}
                onChange={(e) => setEditTaskInfo({ ...editTaskInfo, category: e.target.value })}
                className="rounded-md bordered text-lg outline-none">
                <option selected hidden>{editTaskInfo.category}</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={editTaskInfo.priority}
                onChange={(e) => setEditTaskInfo({ ...editTaskInfo, priority: e.target.value })}
                className="rounded-md bordered text-lg outline-none">
                <option selected hidden>{editTaskInfo.priority}</option>
                {PRIORITIES.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          cursor="pointer"
          className="text-red-600"
          size={20}
          onClick={() => setOpenModalDelete(true)} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Are you sure you want to delete this task?</h3>
          <div className="modal-action">
            <button className="btn bg-red-600 text-white hover:bg-red-500" onClick={() => handleDeleteTask(task.id)}>Yes</button>
            <button className="btn" onClick={() => setOpenModalDelete(false)}>No</button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task