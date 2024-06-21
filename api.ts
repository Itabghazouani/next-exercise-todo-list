import { ITask } from "@/types/tasks";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`HTTP error! status ${res.status}`);
    }

    const todos = await res.json();
    return todos;

  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      throw new Error(`Failed to add todo: ${res.statusText}`);
    }

    const newTodo = await res.json();
    return newTodo;

  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      throw new Error(`Failed to edit todo: ${res.statusText}`);
    }

    const updatedTodo = await res.json();
    return updatedTodo;

  } catch (error) {
    console.error("Error editing todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${id}`, { method: "DELETE" });

    if (!res.ok) {
      throw new Error(`Failed to delete todo: ${res.statusText}`);
    }

  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const deleteAllTodos = async (): Promise<void> => {
  try {
    const todos = await getAllTodos();
    const deletePromises = todos.map(todo => deleteTodo(todo.id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Failed to delete todos:", error);
    throw error;
  }
};
