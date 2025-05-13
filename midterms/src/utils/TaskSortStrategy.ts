import { tasks } from "@/generated/prisma";
import { SortDirection } from "@/types/Sort";

// Helper to ensure 'none' direction returns a copy without sorting
const applySort = (
  tasksToSort: tasks[],
  direction: SortDirection,
  compareFn: (a: tasks, b: tasks) => number
): tasks[] => {
  if (direction === "none") {
    return [...tasksToSort]; // Return a copy if no sorting is needed
  }
  const copyTasks = [...tasksToSort];
  copyTasks.sort((a, b) => {
    const comparisonResult = compareFn(a, b);
    return direction === "desc" ? -comparisonResult : comparisonResult;
  });
  return copyTasks;
};

const sortByName = (tasksToSort: tasks[], direction: SortDirection): tasks[] => {
  return applySort(tasksToSort, direction, (a, b) =>
    a.title.localeCompare(b.title)
  );
};

const sortByDueDate = (tasksToSort: tasks[], direction: SortDirection): tasks[] => {
  return applySort(tasksToSort, direction, (a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });
};

const sortById = (tasksToSort: tasks[], direction: SortDirection): tasks[] => {
  return applySort(tasksToSort, direction, (a, b) =>
    a.id.localeCompare(b.id)
  );
};

export const TaskSortingStrategy = {
  sortByName,
  sortByDueDate,
  sortById,
};

// You might also want to define a type for the sorting property
export type TaskSortProperty = "name" | "dueDate" | "id" | "none";
