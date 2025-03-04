import { useQuery } from "@tanstack/react-query";
import EmployeeTable from "./components/tables/employees/EmployeeTable";
import Employee from "./interfaces/Employee";
import { useEffect, useState } from "react";

function App() {
  const { data, isLoading, error } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/employees");

      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message);
      }

      return data;
    },
  });

  const [sortedData, setSortedData] = useState<Employee[] | []>([]);
  const [reverseSortedData, setReverseSortedData] = useState<Employee[] | []>(
    []
  );
  const [entryLevels, setEntryLevels] = useState<Employee[] | []>([]);
  const [seniorLevels, setSeniorLevels] = useState<Employee[] | []>([]);

  useEffect(() => {
    if (data) {
      setSortedData(() => {
        return [...data].sort((a, b) => {
          return a.salary - b.salary;
        });
      });
      setReverseSortedData(() => {
        return [...data].sort((a, b) => {
          return b.salary - a.salary;
        });
      });
      setEntryLevels(() => [...data].filter((e) => e.salary < 50000));
      setSeniorLevels(() => [...data].filter((e) => e.salary >= 50000));
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen p-4 gap-10 items-center bg-gradient-to-br from-slate-600 to-slate-800">
     {/* main */}
      <h1>Employee List</h1>
      <div>
        {error && <p>error: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
        {data && <EmployeeTable data={data} title="Employee List" />}
      </div>
      {/* other tables */}
      <h1>Other Tables</h1>
      <div className="flex flex-col gap-10">
        {data && (
          <EmployeeTable
            title="Sorted by Salary (Lowest to Highest)"
            data={sortedData}
          />
        )}
        {data && (
          <EmployeeTable
            title="Sorted by Salary (Highest to Lowest)"
            data={reverseSortedData}
          />
        )}
        {data && (
          <EmployeeTable title="Entry Level Developers" data={entryLevels} />
        )}
        {data && (
          <EmployeeTable title="Senior Level Developers" data={seniorLevels} />
        )}
      </div>
    </div>
  );
}

export default App;
