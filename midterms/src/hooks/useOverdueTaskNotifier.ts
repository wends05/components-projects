import { useEffect, useRef } from "react";
import useTaskStore from "@/stores/TaskManager"; 
import { toast } from "sonner"; 

const useOverdueTaskNotifier = () => {
  const tasksFromStore = useTaskStore((state) => state.tasks);
  const toastedTasksRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkOverdueAndNotify = () => {
      const now = new Date();
      const currentOverdueTasks = tasksFromStore.filter(
        (task) => task.dueDate && new Date(task.dueDate) < now && !task.completed
      );

      currentOverdueTasks.forEach((task) => {
        if (!toastedTasksRef.current.has(task.id)) {
          toast.error(
            `Task "${task.title}" is overdue! Due: ${new Date(
              task.dueDate! // Non-null assertion as we've checked task.dueDate
            ).toLocaleDateString()}`,
            {
              id: `overdue-${task.id}`,
              duration: Infinity,
            }
          );
          toastedTasksRef.current.add(task.id);
        }
      });

      // Cleanup toastedTasksRef for tasks that are no longer overdue or are completed
      const activeOverdueIds = new Set(currentOverdueTasks.map(t => t.id));
      toastedTasksRef.current.forEach(toastedId => {
        const task = tasksFromStore.find(t => t.id === toastedId);
        // If task is completed, or no longer in the overdue list (e.g. date changed or task deleted),
        // remove it so it can be toasted again if it becomes overdue later.
        if (!task || task.completed || !activeOverdueIds.has(toastedId)) {
            toastedTasksRef.current.delete(toastedId);
        }
      });
    };

    // Initial check might be too early if tasksFromStore is not yet populated.
    // Consider if tasksFromStore has items before the first check, or rely on the interval.
    if (tasksFromStore.length > 0) {
        checkOverdueAndNotify();
    }


    const intervalId = setInterval(checkOverdueAndNotify, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [tasksFromStore]); // Re-run effect if tasksFromStore changes

  // The hook doesn't need to return anything if it's only for side effects
};

export default useOverdueTaskNotifier;
