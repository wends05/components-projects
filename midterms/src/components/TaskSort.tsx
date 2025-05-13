import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useTaskStore from "@/stores/TaskManager";
import { SortDirection } from "@/types/Sort";
import { TaskSortProperty } from "@/utils/TaskSortStrategy";// Import TaskSortProperty

const TaskSort = () => {
  const { setSortCriteria, sortProperty, sortDirection } = useTaskStore();

  const handleSortChange = (value: string) => {
    if (value === "none") {
      setSortCriteria("none", "none");
    } else {
      const [property, direction] = value.split("-") as [
        TaskSortProperty,
        SortDirection
      ];
      setSortCriteria(property, direction);
    }
  };

  // Combine property and direction for the Select's value
  const currentValue =
    sortProperty === "none" ? "none" : `${sortProperty}-${sortDirection}`;

  return (
    <Select onValueChange={handleSortChange} value={currentValue}>
      <SelectTrigger className="min-w-48">
        {" "}
        {/* Increased width for longer text */}
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">None</SelectItem>
        <SelectItem value="name-asc">Name (Ascending)</SelectItem>
        <SelectItem value="name-desc">Name (Descending)</SelectItem>
        <SelectItem value="dueDate-asc">Due Date (Ascending)</SelectItem>
        <SelectItem value="dueDate-desc">Due Date (Descending)</SelectItem>
        <SelectItem value="id-asc">ID (Ascending)</SelectItem>
        <SelectItem value="id-desc">ID (Descending)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TaskSort;
