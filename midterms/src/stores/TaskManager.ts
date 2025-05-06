import {
  deleteItem,
  editItem,
  insertItem,
  triggerCompleteTask,
} from "@/app/actions";
import { tasks } from "@/generated/prisma";
import { SortDirection } from "@/types/Sort";
import { create } from "zustand";

interface TaskStore {
  tasksAmount: number;
  tasks: tasks[];
  loading: boolean;
  sortDirection: SortDirection;

  // initialize
  setTasks: (tasks: tasks[]) => void;

  // mutations
  insertItem: (task: Omit<tasks, "id">) => Promise<void>;
  editItem: (task: tasks) => Promise<void>;
  deleteItem: (taskId: string) => Promise<void>;
  triggerCompleteTask: (task: tasks) => Promise<void>;

  // sorting
  sortTasks: (direction: SortDirection) => void;

  setLoading: (isLoading: boolean) => void;
}

const sortTasks = (tasks: tasks[], direction: SortDirection) => {
  const copyTasks = [...tasks];
  if (direction === "asc") {
    copyTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (direction === "desc") {
    copyTasks.sort((a, b) => b.title.localeCompare(a.title));
  }
  return copyTasks;
};

// Define the store using Zustand
const useTaskStore = create<TaskStore>()((set) => ({
  tasksAmount: 0,
  sortDirection: "none" as SortDirection,
  tasks: [],
  setTasks(tasks) {
    set({ tasks, tasksAmount: tasks.length });
  },
  loading: false,
  async insertItem(task: Omit<tasks, "id">) {
    const insertedTask = await insertItem(task);
    set((prev) => {
      const sortedTasks = sortTasks(
        [...prev.tasks, insertedTask],
        prev.sortDirection
      );

      return {
        ...prev,
        tasks: sortedTasks,
      };
    });
  },
  async editItem(task: tasks) {
    const editedItem = await editItem(task);
    set((prev) => {
      const sortedTasks = sortTasks(
        [...prev.tasks.filter((i) => i.id !== task.id), editedItem],
        prev.sortDirection
      );

      return {
        ...prev,
        tasks: sortedTasks,
      };
    });
  },
  async deleteItem(taskId: string) {
    const deletedItem = await deleteItem(taskId);
    set((prev) => ({
      ...prev,
      tasks: [...prev.tasks.filter((task) => task.id !== deletedItem.id)],
    }));
  },
  sortTasks(direction) {
    set((state) => {
      const sortedTasks = sortTasks(state.tasks, direction);
      return { tasks: sortedTasks, sortDirection: direction };
    });
  },
  async triggerCompleteTask(task) {
    const completedTask = await triggerCompleteTask(task);

    set((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === completedTask.id ? completedTask : t
      ),
    }));
  },

  setLoading(isLoading) {
    set({ loading: isLoading });
  },
}));

export default useTaskStore;
