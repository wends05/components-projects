import Employee from "../../../interfaces/Employee";
import EmployeeTableRow from "./EmployeeTableRow";

interface TableProps {
  title: string;
  data: Employee[];
  rows?: Record<string, string>;
}

const Table = ({ title, data }: TableProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2>{title}</h2>
      <table className="bg-neutral-500 rounded-3xl w-full">
        <thead>
          <tr className="*:py-2 *:text-center">
            <td>Employee ID</td>
            <td>Name</td>
            <td>Role</td>
            <td>Salary</td>
            <td>Salary Level</td>
          </tr>
        </thead>
        <tbody className="border-t-2 ">
          {data.map((employee) => (
            <EmployeeTableRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
