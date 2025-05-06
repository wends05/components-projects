"use client";
import { tasks } from "@/generated/prisma";
import TaskFactory from "./TaskFactory";
import useTaskStore from "@/stores/TaskManager";
import { useEffect, useState } from "react";
import { Sheet } from "./ui/sheet";
import TaskEdit from "./TaskEdit";
import { Dialog } from "./ui/dialog";
import TaskDelete from "./TaskDelete";
import { toast } from "sonner";

interface TaskListProps {
  initialTasks: tasks[];
}

const TaskList = ({ initialTasks }: TaskListProps) => {
  const { tasks, setTasks, triggerCompleteTask } = useTaskStore();
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks, setTasks]);

  // for editing
  const [currentEditingTask, setCurrentEditingTask] = useState<tasks | null>(
    null
  );
  const [openEditSheet, setOpenEditSheet] = useState(false);

  const editTask = (task: tasks) => {
    console.log("Editing task:", task);
    setCurrentEditingTask(task);
    setOpenEditSheet(true);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [currentDeletingTask, setCurrentDeletingTask] = useState<tasks | null>(
    null
  );

  const deleteTask = (task: tasks) => {
    console.log("Deleting task:", task);
    setCurrentDeletingTask(task);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    if (initialTasks.length > 0) {
      const overdueTasksNumber = initialTasks.reduce((acc, task) => {
        if (task.dueDate && task.dueDate < new Date() && !task.completed) {
          return acc + 1;
        }
        return acc;
      }, 0);
      if (overdueTasksNumber > 0) {
        toast.error(`You have ${overdueTasksNumber} overdue tasks!`);
      }
    }
  }, [initialTasks]);

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <Sheet open={openEditSheet} onOpenChange={setOpenEditSheet}>
        {/* <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}> */}
        <div className="w-full bg-slate-400 h-full justify-center flex">
          <div className="flex flex-col gap-2 max-w-1/2 self-center">
            {tasks?.map((task) => (
              <div key={task.id}>
                {!task.description ? (
                  <TaskFactory
                    task={task}
                    type="no-description"
                    editTask={editTask}
                    deleteTask={deleteTask}
                    triggerCompleteTask={triggerCompleteTask}
                  />
                ) : task.dueDate ? (
                  <TaskFactory
                    task={task}
                    type="timed"
                    editTask={editTask}
                    deleteTask={deleteTask}
                    triggerCompleteTask={triggerCompleteTask}
                  />
                ) : (
                  <TaskFactory
                    task={task}
                    type="basic"
                    editTask={editTask}
                    deleteTask={deleteTask}
                    triggerCompleteTask={triggerCompleteTask}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <TaskEdit
          task={currentEditingTask}
          closeSheet={() => {
            setOpenEditSheet(false);
            setCurrentEditingTask(null);
          }}
        />
      </Sheet>
      <TaskDelete
        closeDialog={() => {
          setOpenDeleteDialog(false);
          setCurrentDeletingTask(null);
        }}
        task={currentDeletingTask}
      />
    </Dialog>
  );
};

export default TaskList;
