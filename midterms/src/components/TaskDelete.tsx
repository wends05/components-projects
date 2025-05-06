import { tasks } from "@/generated/prisma";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import useTaskStore from "@/stores/TaskManager";
import { useForm } from "@tanstack/react-form";

interface TaskDeleteProps {
  task: tasks | null;
  closeDialog: () => void;
}

const TaskDelete = ({ task, closeDialog }: TaskDeleteProps) => {
  const { deleteItem } = useTaskStore();

  const form = useForm({
    onSubmit: async () => {
      if (task) {
        await deleteItem(task?.id);
        closeDialog();
      }
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Task</DialogTitle>
      </DialogHeader>
      <div>
        {task ? (
          <p>Are you sure you want to delete the task: {task.title}?</p>
        ) : (
          <p>No task select ed for deletion.</p>
        )}
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={closeDialog}
          className="px-3 py-1 bg-neutral-400 rounded-md"
        >
          Cancel
        </button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md"
              onClick={() => {
                form.handleSubmit();
              }}
              disabled={!canSubmit || isSubmitting}
            >
              Delete
            </button>
          )}
        </form.Subscribe>
      </div>
    </DialogContent>
  );
};

export default TaskDelete;
