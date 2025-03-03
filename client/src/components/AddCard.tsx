import { useMutation, useQueryClient } from "@tanstack/react-query";
import CardForm from "../types/CardForm";
import { useForm } from "react-hook-form";

const AddCard = () => {

  const queryClient = useQueryClient();
  const { register, handleSubmit, resetField } = useForm<CardForm>();

  const onSubmit = async (data: CardForm) => {
    mutate(data);
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: CardForm) => {
      console.log(data);
      const response = await fetch("http://localhost:4000/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      resetField("title");
      resetField("content");
      resetField("size");
      queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
      if (!response.ok) {
        const errorMessage = await response.json();

        throw new Error(errorMessage.message || "Something went wrong");
      }

      return await response.json();
    },
  });
  return (
    <div className="space-y-5">
      <h1>Additional Cards from the database</h1>
      <button>Add Card</button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-neutral-600 rounded-md p-5 space-y-5 max-w-sm"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input {...register("title", { required: true })} id="title" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <textarea
            {...register("content", { required: true })}
            id="content"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="size">Size</label>
          <select {...register("size", { required: true })} id="size">
            <option value={"SMALL"}>small</option>
            <option value={"MEDIUM"}>medium</option>
            <option value={"LARGE"}>large</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        <p>{isPending ? "Adding card..." : ""}</p>
        <p>{error ? error.message : ""}</p>
      </form>
    </div>
  );
};

export default AddCard;
