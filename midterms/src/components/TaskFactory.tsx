import { tasks } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Bell, Check, Pencil, Trash } from "lucide-react";

type taskType = "basic" | "timed" | "no-description";

type TaskFactoryProps = {
  type: taskType;
  task: tasks;
  editTask: (task: tasks) => void;
  deleteTask: (task: tasks) => void;
  triggerCompleteTask: (task: tasks) => void;
};

const TaskFactory = ({
  type,
  task,
  editTask,
  deleteTask,
  triggerCompleteTask,
}: TaskFactoryProps) => {
  const isOverdue = task.dueDate && task.dueDate < new Date();

  return (
    <div
      className={cn(
        " relative flex flex-col lg:gap-2 p-4 w-40 lg:w-80 border gap-4 rounded-lg shadow-md",
        isOverdue && "bg-red-300/50",
        task.completed && "bg-green-300/50"
      )}
    >
      {type === "timed" && task.dueDate && (
        <div className="absolute top-4 right-4">
          <Bell size={15} color="grey" />
        </div>
      )}
      {/* Title */}
      <h2
        className={cn(
          !task.description && "h-full flex items-center justify-center"
        )}
      >
        {task.title}
      </h2>
      {/* Description */}
      {task.description && type !== "no-description" && (
        <div className="flex h-full">{task.description}</div>
      )}
      {/* Footer */}
      <div className="flex gap-8  justify-around items-end">
        <span className="w-full">
          {type === "timed" && task.dueDate && (
            <div>
              <span className="text-sm text-neutral-600">
                {formatDate(new Date(task.dueDate), "PP")}
              </span>
              <span>
                {isOverdue && !task.completed && (
                  <span className="text-red-500 text-sm"> - Overdue</span>
                )}
              </span>
            </div>
          )}
        </span>
        <div className="gap-2 items-end w-min flex flex-col lg:flex-row">
          <button onClick={() => editTask(task)}>
            <Pencil size={18} />
          </button>
          <button onClick={() => deleteTask(task)}>
            <Trash size={18} />
          </button>
          <button onClick={() => triggerCompleteTask(task)}>
            <Check size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFactory;
