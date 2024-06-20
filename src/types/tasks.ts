import { CATEGORIES, PRIORITIES } from "@/constants";

type Category = typeof CATEGORIES[number];
type Priority = typeof PRIORITIES[number];

export interface ITask {
  id: string,
  desc: string,
  category: Category,
  priority: Priority,
  completed: boolean,
}
