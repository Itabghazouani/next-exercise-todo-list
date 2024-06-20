"use client";

import { ITask } from "@/types/tasks";
import { FC, FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../../api";


interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {

  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [editTaskInfo, setEditTaskInfo] = useState<ITask>({
    id: task.id,
    desc: task.desc,
  });

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: editTaskInfo.id,
      desc: editTaskInfo.desc,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className='w-full'>{task.desc}</td>
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
            <div className='modal-action'>
              <input
                value={editTaskInfo.desc}
                onChange={(e) => setEditTaskInfo({...editTaskInfo, desc: e.target.value})}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
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
