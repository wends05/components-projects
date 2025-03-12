import { useForm } from "react-hook-form";
import Applicant from "../types/Applicant";
import usePostApplicant from "@/hooks/usePostApplicant";

const AddApplicant = () => {
  const { register, handleSubmit } = useForm<Applicant>({
    defaultValues: {
      firstName: "",
      lastName: "",
      groupName: "",
      role: "",
      expectedSalary: 0,
      expectedDateOfDefense: new Date(),
    },
  });

  const { mutate } = usePostApplicant();
  const submitForm = (data: Applicant) => {
    const ISODefenseDate = new Date(data.expectedDateOfDefense).toISOString();
    mutate({
      ...data,
      expectedSalary: Number(data.expectedSalary),
      expectedDateOfDefense: new Date(ISODefenseDate),
    });
  };

  return (
    <div className="min-h-screen max-w-md">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-2 rounded-md bg-slate-600 p-5"
      >
      <h1>Add Applicant</h1>

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
export default AddApplicant;
