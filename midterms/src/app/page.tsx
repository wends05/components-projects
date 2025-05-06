import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import prisma from "@/lib/prisma";

export default async function Home() {
  const allTasks = await prisma.tasks.findMany();

  console.log(allTasks);

  return (
    <div className="flex h-screen  w-full items-center justify-center">
      <TaskForm />
      <TaskList initialTasks={allTasks} />
    </div>
  );
}
