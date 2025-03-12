import { useMutation, useQueryClient } from "@tanstack/react-query";
import Applicant from "../types/Applicant";
import fetchData from "../utils/fetchData";
import { toast } from "sonner";
import { URL } from "@/utils/constants";

const usePostApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Applicant) => {
      toast.message("Adding applicant...");
      return fetchData({
        url: `${URL}/applicant`,
        data: data,
        method: "POST",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["applicants"],
      });

      toast.success(
        `Applicant added successfully: ${data?.firstName} ${data?.lastName}`,
      );
    },
    onError: (error) => {
      toast.error("Error adding applicant:" + error.message);
    },
  });
};

export default usePostApplicant;
