"use server";

import { tasks } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export const insertItem = async (task: Omit<tasks, "id">) => {
  return await prisma.tasks.create({ data: task });
};
export const editItem = async (task: tasks) => {
  return await prisma.tasks.update({
    data: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    },
    where: { id: task.id },
  });
};
export const deleteItem = async (taskId: string) => {
  return await prisma.tasks.delete({ where: { id: taskId } });
};

export const triggerCompleteTask = async (task: tasks) => {
  return await prisma.tasks.update({
    data: { completed: !task.completed },
    where: { id: task.id },
  });
};
