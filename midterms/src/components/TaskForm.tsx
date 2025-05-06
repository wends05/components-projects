"use client";
import { tasks } from "@/generated/prisma";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useForm } from "@tanstack/react-form";
import { add } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import useTaskStore from "@/stores/TaskManager";
import TaskSort from "./TaskSort";
import { useState } from "react";

const defaultTask: Omit<tasks, "id"> = {
  createdAt: new Date(),
  description: "",
  dueDate: add(new Date(), { days: 2 }) as Date | null,
  title: "",
  completed: false,
};
const TaskForm = () => {
  const { insertItem } = useTaskStore();

  const form = useForm({
    defaultValues: defaultTask,
    onSubmit: async (values: { value: Omit<tasks, "id"> }) => {
      await insertItem(values.value);
      form.reset();
      setSheetOpen(false);
    },
  });

  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="w-full flex-col gap-2 items-center justify-center flex bg-slate-300 h-full">
      <h1>Add a New Task</h1>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <button className="flex px-2 py-1 rounded-md bg-neutral-200">
            Open Form
          </button>
        </SheetTrigger>
        <SheetContent aria-describedby="sheet-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <SheetHeader>
              <SheetTitle>
                <p className="text-sm text-gray-500">
                  Fill in the details below
                </p>
              </SheetTitle>
            </SheetHeader>
            <div className="p-4 flex flex-col gap-2 ">
              <form.Field name="title">
                {(field) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className="text-sm text-gray-500"
                    >
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
                    <label
                      htmlFor={field.name}
                      className="text-sm text-gray-500"
                    >
                      Description
                    </label>
                    <input
                      name={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              </form.Field>
              <form.Field name="dueDate">
                {(field) => (
                  <>
                    <label>
                      <p className="text-sm text-gray-500">Due Date</p>
                    </label>
                    <Popover>
                      <PopoverTrigger className="bg-neutral-500 w-max self-center px-2 py-1 rounded-md text-white">
                        {field.state.value?.toDateString() ?? "Select a Date"}
                      </PopoverTrigger>
                      <PopoverContent>
                        <p className="text-sm text-gray-500">
                          Select a date for the task
                        </p>

                        <Calendar
                          className="w-full"
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
                      ? "Submit"
                      : isSubmitting
                      ? "Submitting..."
                      : "Unknown State"}
                  </button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </SheetContent>
      </Sheet>
      <TaskSort />
    </div>
  );
};

export default TaskForm;
