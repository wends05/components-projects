import useEditApplicant from "@/hooks/useEditApplicant";
import useGetApplicant from "@/hooks/useGetApplicant";
import Applicant from "@/types/Applicant";
import { useForm } from "react-hook-form";

interface EditApplicantProps {
  setEditing: (id: string | null) => void;
  id: string;
}

const EditApplicant = ({ id, setEditing }: EditApplicantProps) => {
  const { data: applicant } = useGetApplicant(id);

  const { register, handleSubmit } = useForm<Applicant>({
    defaultValues: {
      ...applicant,
    },
  });

  const { mutate } = useEditApplicant();
  const submitForm = (data: Applicant) => {
    const ISODefenseDate = new Date(data.expectedDateOfDefense).toISOString();
    mutate({
      ...data,
      expectedSalary: Number(data.expectedSalary),
      expectedDateOfDefense: new Date(ISODefenseDate),
    });
  };
  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center">
      <div
        className="absolute z-0 h-full w-full bg-slate-500 opacity-55"
        onClick={() => setEditing(null)}
      ></div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="z-10 flex w-full max-w-md flex-col gap-2 rounded-md bg-slate-600 p-10"
      >
        <h1>Editing Applicant:</h1>
        <h3>
          {applicant?.firstName} {applicant?.lastName}
        </h3>
        <div className="form-field">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            {...register("firstName", { required: true })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...register("lastName", { required: true })} />
        </div>
        <div className="form-field">
          <label htmlFor="groupName">Group Name</label>
          <input
            id="groupName"
            {...register("groupName", { required: true })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="role">Role</label>
          <input id="role" {...register("role", { required: true })} />
        </div>
        <div className="form-field">
          <label htmlFor="expectedSalary">Expected Salary</label>
          <input
            className="appearance-textfield"
            id="expectedSalary"
            {...register("expectedSalary", {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="expectedDateOfDefense">
            Expected Date of Defense
          </label>
          <input
            id="expectedDateOfDefense"
            {...register("expectedDateOfDefense", { required: true })}
            type="date"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditApplicant;
