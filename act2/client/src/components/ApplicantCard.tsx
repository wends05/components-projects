import { LogIn, Pencil } from "lucide-react";
import Applicant from "../types/Applicant";
import { AnimatePresence, motion as m } from "motion/react";
import { useEffect, useState } from "react";
import ApplicantDeleteButton from "./ApplicantDeleteButton";

interface ApplicantCardProps extends Applicant {
  expandedID: string | null;
  editing: string | null;
  setExpandedID: (id: string) => void;
  setEditing: (id: string) => void;
}
const ApplicantCard = ({
  id,
  firstName,
  lastName,
  expectedDateOfDefense,
  expectedSalary,
  expandedID,
  role,
  groupName,
  setExpandedID,
  setEditing,
  editing,
}: ApplicantCardProps) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const isHidden = expandedID === id || editing === id;

    console.log("expandedID", expandedID);
    console.log("id", id);
    console.log("isHidden", isHidden);

    setIsHidden(isHidden);
  }, [editing, expandedID, id]);

  return (
    <div className="relative flex flex-col gap-5 overflow-hidden rounded-md bg-slate-800 p-5">
      <AnimatePresence>
        {isHidden && (
          <m.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-xl"
          >
            <div className="bg-background z-0 h-full w-full"></div>
          </m.div>
        )}
      </AnimatePresence>
      <div>
        <h3>
          {firstName} {lastName}
        </h3>
        <p>Expected Salary: ₱{expectedSalary}</p>
        Expected Date of Defense:{" "}
        {new Date(expectedDateOfDefense).toLocaleDateString()}
      </div>
      <div className="flex w-full justify-center gap-4">
        <button className="flex gap-2" onClick={() => setExpandedID(id)}>
          <LogIn />
          <span>View Details</span>
        </button>
        <button className="flex gap-2" onClick={() => setEditing(id)}>
          <Pencil />
          <span>Edit</span>
        </button>
        <ApplicantDeleteButton
        {...{ id, firstName, lastName, expectedDateOfDefense, expectedSalary, role, groupName }}
        />
      </div>
    </div>
  );
};

export default ApplicantCard;
