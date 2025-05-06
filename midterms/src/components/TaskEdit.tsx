import React, { useEffect } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { tasks } from "@/generated/prisma";
import { useForm } from "@tanstack/react-form";
import { PopoverContent, PopoverTrigger, Popover } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import useTaskStore from "@/stores/TaskManager";

interface TaskEditProps {
  task: tasks | null;
  closeSheet: () => void;
}
const TaskEdit = ({ task, closeSheet }: TaskEditProps) => {
  const { editItem } = useTaskStore();

  const form = useForm({
    defaultValues: {
      createdAt: task?.createdAt || new Date(),
      description: task?.description || "",
      dueDate: task?.dueDate ? task.dueDate : null,
      id: task?.id || "",
      title: task?.title || "",
      completed: task?.completed || false,
    },
    onSubmit: async (values: { value: tasks }) => {
      await editItem(values.value);
      closeSheet();
    },
  });

  useEffect(() => {
    if (task) {
      form.setFieldValue("title", task.title);
      form.setFieldValue("description", task.description || "");
      form.setFieldValue("dueDate", task.dueDate);
      form.setFieldValue("id", task.id);
    }
  }, [task, form]);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editing Current Title:</SheetTitle>
      </SheetHeader>
      <div className="p-4 flex flex-col">
        {!task ? (
          <div>No tasks chuchuness</div>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="title">
              {(field) => (
                <>
                  <label htmlFor={field.name} className="text-sm text-gray-500">
                    Title
                  </label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>
            <form.Field name="description">
              {(field) => (
                <>
                  <label htmlFor={field.name} className="text-sm text-gray-500">
                    Description
                  </label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>
            <form.Field name="dueDate">
              {(field) => (
                <>
                  {" "}
                  <Popover>
                    <PopoverTrigger className="bg-neutral-500 w-max self-center px-2 py-1 rounded-md text-white">
                      {field.state.value?.toDateString() || "Select a Date"}
                    </PopoverTrigger>
                    <PopoverContent>
                      <p className="text-sm text-gray-500">
                        Select a date for the task
                      </p>
                      <Calendar
                        className="w-full "
                        mode="single"
                        selected={field.state.value ?? undefined}
                        onSelect={(date) => field.setValue(date ?? null)}
                      />
                      <button
                        type="button"
                        onClick={() => field.setValue(null)}
                      >
                        Remove Deadline
                      </button>
                    </PopoverContent>
                  </Popover>
                </>
              )}
            </form.Field>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-max px-2 py-1 rounded-md text-white bg-neutral-400 self-center"
                >
                  {canSubmit
                    ? "Edit"
                    : isSubmitting
                    ? "Editing..."
                    : "Unknown State"}
                </button>
              )}
            </form.Subscribe>
          </form>
        )}
      </div>
    </SheetContent>
  );
};

export default TaskEdit;
