import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useTaskStore from "@/stores/TaskManager";
import { SortDirection } from "@/types/Sort";

const TaskSort = () => {
  const { sortTasks } = useTaskStore();
 
  return (
    <Select onValueChange={(val) => sortTasks(val as SortDirection)}>
      <SelectTrigger className="min-w-32">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">None</SelectItem>
        <SelectItem value="asc">Ascending Name</SelectItem>
        <SelectItem value="desc">Descending Name</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TaskSort;
