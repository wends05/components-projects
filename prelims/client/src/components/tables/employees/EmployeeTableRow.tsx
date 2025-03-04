import Employee from "../../../interfaces/Employee";

const EmployeeTableRow = ({ employee }: { employee: Employee }) => {
  const { id, name, role, salary } = employee;
  
  const salary_level = salary < 50000 ? "Entry Level" : "Senior"
  
  return (
    <tr className="border-t">
      <td className="text-center">{id}</td>
      <td className="max-w-60">{name}</td>
      <td>{role}</td>
      <td>{salary}</td>
      <td>{salary_level}</td>
    </tr>
  );
};

export default EmployeeTableRow;
