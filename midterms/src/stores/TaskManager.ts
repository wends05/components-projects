import {
  deleteItem,
  editItem,
  insertItem,
  triggerCompleteTask,
} from "@/app/actions";
import { tasks } from "@/generated/prisma";
import { SortDirection } from "@/types/Sort";
import {
  TaskSortingStrategy,
  TaskSortProperty,
} from "@/utils/TaskSortStrategy";
import { create } from "zustand";

interface TaskStore {
  tasksAmount: number;
  tasks: tasks[];
  loading: boolean;
  sortDirection: SortDirection;
  sortProperty: TaskSortProperty;

  // initialize
  setTasks: (tasks: tasks[]) => void;

  // mutations
  insertItem: (task: Omit<tasks, "id">) => Promise<void>;
  editItem: (task: tasks) => Promise<void>;
  deleteItem: (taskId: string) => Promise<void>;
  triggerCompleteTask: (task: tasks) => Promise<void>;

  // sorting
  setSortCriteria: (
    property: TaskSortProperty,
    direction: SortDirection
  ) => void; // Updated sorting method

  setLoading: (isLoading: boolean) => void;
}

const applySortingStrategy = (
  tasksToSort: tasks[],
  property: TaskSortProperty,
  direction: SortDirection
): tasks[] => {
  if (property === "none" || direction === "none") {
    // If no specific property or direction, return a copy or apply a default (e.g., original order)
    // For now, if property is 'none', we don't sort, respecting the 'none' state.
    // If you want a default sort (e.g. by insertion order if available, or ID), implement here.
    // Or, ensure tasks are returned as-is if no active sorting.
    if (property === "none") return [...tasksToSort]; // Return copy if sort property is none
  }

  switch (property) {
    case "name":
      return TaskSortingStrategy.sortByName(tasksToSort, direction);
    case "dueDate":
      return TaskSortingStrategy.sortByDueDate(tasksToSort, direction);
    case "id":
      return TaskSortingStrategy.sortById(tasksToSort, direction);
    default:
      return [...tasksToSort]; // Return a copy if property is unknown or 'none'
  }
};

// Define the store using Zustand
const useTaskStore = create<TaskStore>()((set, get) => ({
  tasksAmount: 0,
  sortDirection: "none" as SortDirection,
  sortProperty: "none" as TaskSortProperty,
  tasks: [],
  setTasks(tasks) {
    const { sortProperty, sortDirection } = get();
    const newTasksAmount = tasks.length;
    const sortedTasks = applySortingStrategy(
      tasks,
      sortProperty,
      sortDirection
    );
    set({ tasks: sortedTasks, tasksAmount: newTasksAmount });
  },
  loading: false,
  async insertItem(task: Omit<tasks, "id">) {
    const insertedTask = await insertItem(task);
    set((prev) => {
      const updatedTasks = [...prev.tasks, insertedTask];
      const sortedTasks = applySortingStrategy(
        updatedTasks,
        prev.sortProperty,
        prev.sortDirection
      );
      return {
        tasks: sortedTasks,
        tasksAmount: sortedTasks.length,
      };
    });
  },
  async editItem(task: tasks) {
    const editedItem = await editItem(task);
    set((prev) => {
      const updatedTasks = prev.tasks.map((t) =>
        t.id === editedItem.id ? editedItem : t
      );
      const sortedTasks = applySortingStrategy(
        updatedTasks,
        prev.sortProperty,
        prev.sortDirection
      );
      return {
        tasks: sortedTasks,
      };
    });
  },
  async deleteItem(taskId: string) {
    const deletedItem = await deleteItem(taskId);
    set((prev) => {
      const updatedTasks = prev.tasks.filter(
        (task) => task.id !== deletedItem.id
      );
      // No re-sorting needed here unless specified, as item is removed.
      // If re-sorting is desired after deletion:
      const sortedTasks = applySortingStrategy(updatedTasks, prev.sortProperty, prev.sortDirection);
      return {
        tasks: sortedTasks,
        tasksAmount: updatedTasks.length,
      };
    });
  },
  setSortCriteria(property, direction) {
    set((state) => {
      const sortedTasks = applySortingStrategy(
        state.tasks,
        property,
        direction
      );
      return {
        tasks: sortedTasks,
        sortProperty: property,
        sortDirection: direction,
      };
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
