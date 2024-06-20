"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../../api";
import { CATEGORIES, PRIORITIES } from "@/constants";


const AddTask = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskDesc, setNewTaskDesc] = useState<string>("");
  const [newTaskCategory, setNewTaskCategory] = useState<string>("")
  const [newTaskPriority, setNewTaskPriority] = useState<string>("")

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!newTaskDesc) {
      alert("Please enter a task description");
      return;
    }

    if (!newTaskCategory) {
      alert("Please enter a category")
      return
    }

    if (!newTaskPriority) {
      alert("Please enter a description")
      return
    }
    try {
      await addTodo({
        id: uuidv4(),
        desc: newTaskDesc,
        category: newTaskCategory,
        priority: newTaskPriority,
        completed: false,
      });
      setNewTaskDesc("");
      setNewTaskCategory("");
      setNewTaskPriority("");
      setModalOpen(false);
      router.refresh();

    } catch (error) {
      console.error("Failed to add task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-success w-full text-white'
      >
        Add new task <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>

        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-action flex flex-col gap-2'>
            <input
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full max-w-full'
            />
            <select
              value={newTaskCategory}
              onChange={e => setNewTaskCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-1" >
              <option value="" disabled hidden selected>Category</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={newTaskPriority}
              onChange={e => setNewTaskPriority(e.target.value)}
              className="border border-gray-300 rounded-md p-1" >
              <option value="" disabled hidden selected>Priority</option>
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
    </div>
  );
};

export default AddTask;
