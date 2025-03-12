import { Banknote, Briefcase, Calendar, User, Users } from "lucide-react";
import Applicant from "../types/Applicant";

const ApplicantPopup = ({
  firstName,
  lastName,
  groupName,
  role,
  expectedDateOfDefense,
  expectedSalary,
}: Applicant) => {
  return (
    <div className="rounded-md bg-slate-800 p-5">
      <h2 className="flex items-center gap-2">
        <span>
          {" "}
          <User />{" "}
        </span>{" "}
        {firstName} {lastName}
      </h2>
      <p className="flex items-center gap-2">
        {" "}
        <span>
          <Users />
        </span>{" "}
        {groupName}
      </p>
      <p className="flex items-center gap-2">
        <span>
          <Briefcase />
        </span>
        {role}
      </p>
      <p className="flex items-center gap-2">
        <span>
          <Calendar />
        </span>
        Defense Date: {"  "}
        {new Date(expectedDateOfDefense).toLocaleDateString()}
      </p>
      <p className="flex items-center gap-2">
        <span>
          <Banknote />
        </span>
        ${expectedSalary}
      </p>
    </div>
  );
};

export default ApplicantPopup;
