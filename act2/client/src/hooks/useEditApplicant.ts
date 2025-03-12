import { useMutation, useQueryClient } from "@tanstack/react-query";
import Applicant from "../types/Applicant";
import fetchData from "../utils/fetchData";
import { toast } from "sonner";
import { URL } from "@/utils/constants";

const useEditApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Applicant) => {
      toast.message("Editing applicant...");
      return fetchData({
        url: `${URL}/applicant/${data.id}`,
        data: data,
        method: "PUT",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["applicants"],
      });

      toast.success(
        `Applicant edited successfully: ${data?.firstName} ${data?.lastName}`,
      );
    },
    onError: (error) => {
      toast.error("Error editing applicant:" + error.message);
    },
  });
};

export default useEditApplicant;
