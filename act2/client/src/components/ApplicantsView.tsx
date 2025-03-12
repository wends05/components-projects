import { useState } from "react";
import useGetApplicants from "../hooks/useGetApplicants";
import ApplicantCard from "./ApplicantCard";
import { AnimatePresence, motion as m } from "motion/react";
import ApplicantPopup from "./ApplicantPopup";
import EditApplicant from "./EditApplicant";

const ApplicantsView = () => {
  const { data: applicants } = useGetApplicants();

  const [expandedID, setExpandedID] = useState<string | null>(null);

  const [editing, setEditing] = useState<string | null>(null);

  return (
    <m.div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {applicants && expandedID !== null && (
          <m.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setExpandedID(null)}
            className="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center"
          >
            <div className="z-0 h-screen w-full bg-slate-800 opacity-50"></div>
            <div className="fixed z-10 flex items-center justify-center">
              <ApplicantPopup
                {...applicants.find(
                  (applicant) => applicant.id === expandedID,
                )!}
              />
            </div>
          </m.div>
        )}

        {applicants && editing !== null && (
          <m.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setEditing(null)}
            className="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center"
          >
            <div className="z-0 h-screen w-full bg-slate-800 opacity-50"></div>
            <div className="fixed z-10 flex min-h-screen items-center justify-center">
              <EditApplicant id={editing} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {applicants?.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            {...applicant}
            editing={editing}
            expandedID={expandedID}
            setExpandedID={setExpandedID}
            setEditing={setEditing}
          />
        ))}
      </AnimatePresence>
    </m.div>
  );
};

export default ApplicantsView;
